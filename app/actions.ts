"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { z } from "zod";
import { profile } from "@/content/site";

type Field = "name" | "email" | "message";

export type ContactState = {
  status: "idle" | "sent" | "invalid" | "failed";
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  values?: Record<Field, string>;
};

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name.")
    .max(100, "Keep your name under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address so I can reply.")
    .max(254, "That email address is too long.")
    .pipe(z.email("Enter an email address like name@example.com.")),
  message: z
    .string()
    .trim()
    .min(10, "Write at least 10 characters.")
    .max(5000, "Keep your message under 5,000 characters."),
});

// Best-effort limit of 5 messages per 10 minutes per address. It lives in
// memory, so on serverless hosts each instance keeps its own count.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  recent.set(key, hits);
  return false;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Honeypot: people never see this field, bots tend to fill it in.
  if (String(formData.get("website") ?? "") !== "") {
    return { status: "sent", message: "Message sent." };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as Field;
      fieldErrors[field] ??= issue.message;
    }
    return { status: "invalid", fieldErrors, values };
  }

  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return {
      status: "failed",
      message: `Too many messages in a short time. Try again in a few minutes, or email ${profile.email}.`,
      values,
    };
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP_HOST, SMTP_USER and SMTP_PASS must be set.");
    return {
      status: "failed",
      message: `The contact form isn't connected yet. Email me directly at ${profile.email}.`,
      values,
    };
  }

  const port = Number(SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const { name, email, message } = parsed.data;
  try {
    await transporter.sendMail({
      from: { name: "Portfolio contact form", address: SMTP_USER },
      to: CONTACT_TO_EMAIL || profile.email,
      replyTo: { name, address: email },
      subject: `New message from ${name}`,
      text: `${message}\n\n${name} <${email}>`,
      html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p><p>${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>`,
    });
  } catch (error) {
    console.error("Contact form: sending failed", error);
    return {
      status: "failed",
      message: `The message didn't go through. Try again, or email me directly at ${profile.email}.`,
      values,
    };
  }

  return { status: "sent", message: `Message sent. I'll reply to ${email}.` };
}

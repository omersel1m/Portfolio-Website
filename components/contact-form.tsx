"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendMessage, type ContactState } from "@/app/actions";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (state.status === "sent") {
      formRef.current?.reset();
      statusRef.current?.focus();
    }
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    }
  }, [state]);

  const errors = state.fieldErrors ?? {};
  // After a successful send the fields start empty again.
  const values = state.status === "sent" ? undefined : state.values;

  return (
    <form id="contact-form" ref={formRef} action={formAction} noValidate>
      <div className="form-group">
        <label htmlFor="name" className="sr-only">
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          maxLength={100}
          autoComplete="name"
          placeholder="Your name"
          defaultValue={values?.name}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className="field-error">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="email" className="sr-only">
          Your email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Your email address"
          defaultValue={values?.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="field-error">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="form-group">
        <label htmlFor="message" className="sr-only">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={5000}
          placeholder="Your message"
          defaultValue={values?.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="field-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot for bots. Hidden from people and assistive tech. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions">
        <button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send"}
        </button>
        <p
          ref={statusRef}
          tabIndex={-1}
          role="status"
          className={`form-status${state.status === "sent" ? " is-sent" : state.status === "failed" ? " is-error" : ""}`}
        >
          {state.status === "sent" || state.status === "failed" ? state.message : null}
        </p>
      </div>
    </form>
  );
}

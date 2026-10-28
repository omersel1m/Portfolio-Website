import type { Metadata, Viewport } from "next";
import { Anton, Inter, Oswald, Press_Start_2P } from "next/font/google";
import { education, profile, siteUrl, socials } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin", "latin-ext"] });
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin", "latin-ext"] });
const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  weight: "400",
  subsets: ["latin", "latin-ext"],
});

const title = `${profile.name} | ${profile.role}`;
const description = profile.description;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a1929",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Bandırma", addressCountry: "TR" },
  alumniOf: education.map((e) => ({ "@type": "CollegeOrUniversity", name: e.organization })),
  sameAs: [socials.github.href, socials.linkedin.href],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${oswald.variable} ${anton.variable} ${pressStart.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}

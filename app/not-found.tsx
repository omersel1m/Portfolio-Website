import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="not-found">
      <div className="container">
        <div className="hero-greeting">
          <span>404</span>
        </div>
        <p>This page doesn&apos;t exist. The link may be old or mistyped.</p>
        <Link href="/" className="project-link">
          Go to the homepage
        </Link>
      </div>
    </main>
  );
}

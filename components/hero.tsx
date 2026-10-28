import Image from "next/image";
import { profile, socials } from "@/content/site";
import avatar from "@/public/images/avatar.png";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

// Shown twice: as the fixed column on the left on wide screens, and as a row
// under the tagline on narrower ones. CSS hides whichever doesn't apply.
function SocialLinks({ inline = false }: { inline?: boolean }) {
  return (
    <div className={`social-links${inline ? " social-links--inline" : ""}`}>
      <a href={socials.github.href} target="_blank" rel="noreferrer" aria-label="GitHub">
        <GitHubIcon />
      </a>
      <a href={socials.linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <LinkedInIcon />
      </a>
      <a href={`mailto:${profile.email}`} aria-label="Email">
        <MailIcon />
      </a>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="hero">
      <SocialLinks />

      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-greeting">
              {profile.greeting.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
            <h1 className="hero-name">I&apos;M {profile.name.toLocaleUpperCase("tr")}</h1>
            <h2>{profile.role}</h2>
            <p>{profile.tagline}</p>
            <SocialLinks inline />
          </div>
          <Image
            src={avatar}
            alt={profile.avatar.alt}
            className="profile-img"
            priority
            sizes="(max-width: 968px) 400px, 900px"
          />
        </div>
      </div>
    </section>
  );
}

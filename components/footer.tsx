import { profile } from "@/content/site";

async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer>
      <div className="container">
        <p>
          &copy; <CurrentYear /> {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

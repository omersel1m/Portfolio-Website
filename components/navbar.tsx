"use client";

import { useEffect, useState } from "react";
import { navigation, profile } from "@/content/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape, and when the screen grows past the
  // mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <nav className="navbar" aria-label="Main">
      <div className="container">
        <a href="#home" className="logo" onClick={() => setOpen(false)}>
          {profile.name.toLocaleUpperCase("tr")}
        </a>
        <ul id="nav-links" className={`nav-links${open ? " open" : ""}`}>
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={`hamburger${open ? " active" : ""}`}
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}

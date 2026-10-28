"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

// On wide screens the cards sit side by side and the dots stay hidden (CSS).
// On narrow screens the row scrolls sideways and the dots jump between cards.
export function AboutSlider({ labels, children }: { labels: string[]; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLElement));
        }
      },
      { root: el, threshold: 0.6 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const el = track.current;
    const item = el?.children[index] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.clientWidth) / 2, behavior: "smooth" });
  }

  return (
    <>
      <div ref={track} className="about-content slider-wrapper">
        {children}
      </div>
      <div className="slider-nav">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            className={`nav-btn${index === active ? " active" : ""}`}
            aria-label={`Show ${labels[index] ?? `card ${index + 1}`}`}
            aria-current={index === active ? "true" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </>
  );
}

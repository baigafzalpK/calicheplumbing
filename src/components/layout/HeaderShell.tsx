"use client";
import { useEffect, useState, type ReactNode } from "react";

export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      id="site-header"
      className={`sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}
    >
      <div className={`container-x flex items-center transition-[height] ${scrolled ? "h-16" : "h-20"}`}>{children}</div>
    </div>
  );
}

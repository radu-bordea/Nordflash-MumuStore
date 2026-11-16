"use client";

import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Til toppen"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-5 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-nav text-nav-foreground shadow-lg ring-2 ring-gold/70 transition-all duration-300 cursor-pointer sm:bottom-6 sm:right-6 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <LuArrowUp className="h-5 w-5" />
    </button>
  );
}
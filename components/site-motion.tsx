"use client";

import { useEffect } from "react";

export function SiteMotion() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let rafId = 0;
    let destroyed = false;

    const update = () => {
      document.body.dataset.scrolled = window.scrollY > 12 ? "true" : "false";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      void import("lenis").then(({ default: Lenis }) => {
        if (destroyed) return;

        lenis = new Lenis({
          duration: 1.15,
          easing: (t) => 1 - Math.pow(1 - t, 3),
          smoothWheel: true,
        });

        const raf = (time: number) => {
          lenis?.raf(time);
          rafId = window.requestAnimationFrame(raf);
        };

        rafId = window.requestAnimationFrame(raf);
      });
    }

    return () => {
      destroyed = true;
      window.removeEventListener("scroll", update);
      if (rafId) window.cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return null;
}

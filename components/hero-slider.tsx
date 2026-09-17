"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Slide = {
  title: string;
  subtitle: string;
  desktopImage: StaticImageData;
  mobileImage: StaticImageData | string;
  href: string;
  cta: string;
};

export function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, reduced ? 0 : 18]);

  useEffect(() => {
    if (!slides.length) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const current = slides[index];
  const nextIndex = useMemo(() => (index + 1) % slides.length, [index, slides.length]);

  return (
    <section className="hero-shell">
      <div className="hero-stage">
        {slides.map((slide, slideIndex) => {
          const active = slideIndex === index;
          const behind = slideIndex === nextIndex;
          return (
            <article
              key={slide.title}
              className={`hero-slide ${active ? "active" : ""} ${behind ? "behind" : ""}`}
              aria-hidden={!active}
            >
              <picture className="hero-media">
                <source media="(max-width: 767px)" srcSet={typeof slide.mobileImage === "string" ? slide.mobileImage : slide.mobileImage.src} />
                <motion.div className="hero-image-motion" animate={{ scale: active ? 1 : 1.025 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} style={{ y: heroY }}>
                  <Image src={slide.desktopImage} alt={slide.title} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
                </motion.div>
              </picture>
              <div className="hero-overlay" />
            </article>
          );
        })}

        <AnimatePresence mode="wait">
          <motion.div className="hero-content" key={current.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
            <h1 className="hero-title">
              <span className="hero-title-mask"><motion.span initial={{ y: reduced ? 0 : "100%" }} animate={{ y: 0 }} transition={{ duration: reduced ? 0.01 : 0.78, ease: [0.16, 1, 0.3, 1] }}>{current.title}</motion.span></span>
            </h1>
            <motion.p className="hero-copy" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>{current.subtitle}</motion.p>
            <motion.div className="hero-cta-row" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}>
              <Link href={current.href} className="btn">{current.cta} <span aria-hidden="true" className="motion-arrow">→</span></Link>
              <Link href="/shop" className="btn secondary">Browse collection <span aria-hidden="true" className="motion-arrow">→</span></Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="hero-controls" aria-label="Hero slide navigation">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.title}
              type="button"
              className={`hero-dot ${slideIndex === index ? "active" : ""}`}
              onClick={() => setIndex(slideIndex)}
              aria-label={`Show slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

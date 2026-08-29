"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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
                <Image src={slide.desktopImage} alt={slide.title} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
              </picture>
              <div className="hero-overlay" />
            </article>
          );
        })}

        <div className="hero-content">
          <h1 className="hero-title">{current.title}</h1>
          <p className="hero-copy">{current.subtitle}</p>
          <div className="hero-cta-row">
            <Link href={current.href} className="btn">{current.cta}</Link>
            <Link href="/shop" className="btn secondary">Browse collection</Link>
          </div>
        </div>

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

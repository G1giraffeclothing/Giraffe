"use client";

import Image from "next/image";
import Link from "next/link";
import type { TouchEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/lib/types";

type PremiumProductCardProps = {
  product: Product;
  index?: number;
  compact?: boolean;
};

const TRANSITION_MS = 620;
const INTERVAL_MS = 3000;
const STAGGER_MS = 300;

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

export function PremiumProductCard({ product, index = 0, compact = false }: PremiumProductCardProps) {
  const images = useMemo(
    () =>
      [product.image_url, product.hover_image_url, ...(product.gallery_image_urls ?? [])].filter(Boolean) as string[],
    [product.image_url, product.gallery_image_urls, product.hover_image_url],
  );
  const imageCount = Math.max(images.length, 1);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const hoverTimerRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const node = hostRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting || entry.intersectionRatio > 0.2),
      { rootMargin: "180px", threshold: [0, 0.2, 0.5] },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const shouldAnimate = mounted && !reduced.matches && visible && !hovered && imageCount > 1;
    if (!shouldAnimate) {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (hoverTimerRef.current) {
        window.clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = null;
      }
      return;
    }

    const startDelay = index * STAGGER_MS;
    hoverTimerRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % imageCount);
      }, INTERVAL_MS);
    }, startDelay);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (hoverTimerRef.current) window.clearTimeout(hoverTimerRef.current);
      intervalRef.current = null;
      hoverTimerRef.current = null;
    };
  }, [hovered, imageCount, index, mounted, visible]);

  function pause() {
    setHovered(true);
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function resume() {
    setHovered(false);
  }

  function goTo(nextIndex: number) {
    const normalized = ((nextIndex % imageCount) + imageCount) % imageCount;
    setActiveIndex(normalized);
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null);
    setTouchDeltaX(0);
    pause();
  }

  function handleTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX == null) return;
    setTouchDeltaX(event.touches[0]?.clientX - touchStartX);
  }

  function handleTouchEnd() {
    if (touchStartX != null && Math.abs(touchDeltaX) > 40) {
      if (touchDeltaX < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
    window.setTimeout(() => setHovered(false), 700);
  }

  return (
    <article
      ref={hostRef}
      className={`premium-product-card ${compact ? "compact" : ""}`}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
    >
      <div
        className="premium-product-card-media"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: hovered ? "translateY(-2px) scale(1.015)" : "translateY(0) scale(1)",
          boxShadow: hovered ? "0 24px 48px rgba(24, 20, 16, 0.15)" : "0 0 0 rgba(0,0,0,0)",
        }}
      >
        <Link href={`/products/${product.slug}`} aria-label={product.title ?? product.name} className="premium-product-card-link" />
        {images.map((image, i) => {
          const active = i === activeIndex;
          return (
            <div
              key={`${product.slug}-${image}-${i}`}
              className="premium-product-card-layer"
              aria-hidden="true"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "scale(1.015)" : "scale(1)",
                transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                className="premium-product-card-image"
                priority={index < 2}
                draggable={false}
              />
            </div>
          );
        })}

        <div className={`premium-product-card-progress ${hovered ? "show" : ""}`}>
          {images.map((_, i) => (
            <span key={`${product.slug}-progress-${i}`} className={i === activeIndex ? "active" : ""} />
          ))}
        </div>

        <div className={`premium-product-card-counter ${hovered ? "show" : ""}`}>
          {String(activeIndex + 1).padStart(1, "0")} / {String(imageCount).padStart(1, "0")}
        </div>

        <div className={`premium-product-card-overlay ${hovered ? "show" : ""}`}>
          <button type="button" className="premium-card-action" onClick={(e) => e.preventDefault()}>
            Quick view
          </button>
          <button type="button" className="premium-card-action premium-card-fav" onClick={(e) => e.preventDefault()} aria-label="Wishlist">
            ♡
          </button>
        </div>

        <button
          type="button"
          className={`premium-product-card-arrow left ${hovered && imageCount > 1 ? "show" : ""}`}
          aria-label="Previous image"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            pause();
            goTo(activeIndex - 1);
          }}
        >
          ‹
        </button>
        <button
          type="button"
          className={`premium-product-card-arrow right ${hovered && imageCount > 1 ? "show" : ""}`}
          aria-label="Next image"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            pause();
            goTo(activeIndex + 1);
          }}
        >
          ›
        </button>
      </div>

      <div className="premium-product-card-body">
        <p className="muted" style={{ margin: 0 }}>{product.category}</p>
        <h3>{product.title ?? product.name}</h3>
        <strong>₹{formatPrice(product.price_cents / 100)}</strong>
      </div>
    </article>
  );
}

"use client";

import Image from "next/image";
import type { TouchEvent } from "react";
import { useMemo, useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);

  function select(index: number) {
    const normalized = ((index % safeImages.length) + safeImages.length) % safeImages.length;
    setActiveIndex(normalized);
  }

  function onTouchStart(event: TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0]?.clientX ?? null);
    setTouchDeltaX(0);
  }

  function onTouchMove(event: TouchEvent<HTMLDivElement>) {
    if (touchStartX == null) return;
    setTouchDeltaX(event.touches[0]?.clientX - touchStartX);
  }

  function onTouchEnd() {
    if (touchStartX != null && Math.abs(touchDeltaX) > 40) {
      if (touchDeltaX < 0) select(activeIndex + 1);
      else select(activeIndex - 1);
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  }

  if (safeImages.length === 0) return null;

  return (
    <div className="product-gallery">
      <div className="product-gallery-main" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        {safeImages.map((image, index) => (
          <div
            key={`${title}-gallery-${index}`}
            className="product-gallery-layer"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transition: "opacity 520ms cubic-bezier(0.22, 1, 0.36, 1), transform 520ms cubic-bezier(0.22, 1, 0.36, 1)",
              transform: index === activeIndex ? "scale(1.01)" : "scale(1)",
            }}
            aria-hidden={index !== activeIndex}
          >
            <Image
              src={image}
              alt={`${title} image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 58vw"
              className="product-gallery-image"
              draggable={false}
            />
          </div>
        ))}

        <div className="product-gallery-counter">
          {activeIndex + 1} / {safeImages.length}
        </div>
        <div className="product-gallery-nav">
          <button type="button" onClick={() => select(activeIndex - 1)} aria-label="Previous image">
            ‹
          </button>
          <button type="button" onClick={() => select(activeIndex + 1)} aria-label="Next image">
            ›
          </button>
        </div>
      </div>

      <div className="product-gallery-thumbs">
        {safeImages.map((image, index) => (
          <button
            key={`${title}-thumb-${index}`}
            type="button"
            className={`product-gallery-thumb ${index === activeIndex ? "active" : ""}`}
            onClick={() => select(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image src={image} alt="" fill sizes="120px" className="product-gallery-thumb-image" draggable={false} />
          </button>
        ))}
      </div>
    </div>
  );
}

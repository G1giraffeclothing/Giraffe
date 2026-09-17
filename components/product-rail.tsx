"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Product } from "@/lib/types";
import { PremiumProductCard } from "@/components/premium-product-card";

export function ProductRail({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  function move(direction: "next" | "previous") {
    trackRef.current?.scrollBy({
      left: direction === "next" ? trackRef.current.clientWidth * 0.78 : -trackRef.current.clientWidth * 0.78,
      behavior: "smooth",
    });
  }

  return (
    <div className="product-rail product-rail--grid">
      <div className="product-rail-toolbar">
        <div className="product-rail-arrows" aria-label="Browse new arrivals">
          <button type="button" onClick={() => move("previous")} aria-label="Previous products">←</button>
          <button type="button" onClick={() => move("next")} aria-label="Next products">→</button>
        </div>
      </div>
      <div className="product-rail-track" ref={trackRef}>
        {products.map((product, index) => <PremiumProductCard key={product.id} product={product} index={index} />)}
      </div>
      <Link href="/shop?section=bestsellers" className="new-releases-cta">Shop best sellers <span aria-hidden="true">→</span></Link>
    </div>
  );
}

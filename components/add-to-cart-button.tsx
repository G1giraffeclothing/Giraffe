"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";

type AddToCartButtonProps = {
  productId: string;
  sizes?: string[];
};

export function AddToCartButton({ productId, sizes = [] }: AddToCartButtonProps) {
  const defaultSize = useMemo(() => sizes[0] ?? null, [sizes]);
  const [selectedSize, setSelectedSize] = useState<string | null>(defaultSize);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function addToCart() {
    setPending(true);
    setMessage(null);

    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, size: selectedSize, quantity: 1 }),
    });

    setPending(false);
    setMessage(response.ok ? "Added to cart" : "Sign in to save your cart");
  }

  return (
    <div style={{ display: "grid", gap: 14 }}>
      {sizes.length > 0 ? (
        <div style={{ display: "grid", gap: 8 }}>
          <span className="muted">Select size</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {sizes.map((size) => {
              const active = size === selectedSize;
              return (
                <motion.button
                  key={size}
                  type="button"
                  className={`pill ${active ? "active" : ""}`}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(27, 23, 20, 0.14)",
                    background: "rgba(255,255,255,0.72)",
                    color: active ? "#fff" : "inherit",
                  }}
                  onClick={() => setSelectedSize(size)}
                  whileTap={{ scale: 0.96 }}
                >
                  {active ? <motion.span className="size-selector-active" layoutId="selected-size" transition={{ type: "spring", stiffness: 460, damping: 34 }} /> : null}
                  {size}
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : null}
      <motion.button
        type="button"
        className="btn"
        style={{ width: "fit-content" }}
        onClick={addToCart}
        disabled={pending || (sizes.length > 0 && !selectedSize)}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -1, scale: 1.012 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {pending ? "Adding..." : "Add to cart"}
      </motion.button>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  );
}

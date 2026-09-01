"use client";

import { useMemo, useState } from "react";

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
                <button
                  key={size}
                  type="button"
                  className={`pill ${active ? "active" : ""}`}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: active ? "1px solid rgba(27, 23, 20, 0.85)" : "1px solid rgba(27, 23, 20, 0.14)",
                    background: active ? "rgba(27, 23, 20, 0.92)" : "rgba(255,255,255,0.72)",
                    color: active ? "#fff" : "inherit",
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
      <button
        type="button"
        className="btn"
        style={{ width: "fit-content" }}
        onClick={addToCart}
        disabled={pending || (sizes.length > 0 && !selectedSize)}
      >
        {pending ? "Adding..." : "Add to cart"}
      </button>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  );
}

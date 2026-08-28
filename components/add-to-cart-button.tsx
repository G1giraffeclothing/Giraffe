"use client";

import { useState } from "react";

export function AddToCartButton({ productId }: { productId: string }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function addToCart() {
    setPending(true);
    setMessage(null);
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });
    setPending(false);
    setMessage(response.ok ? "Added to cart" : "Sign in to save your cart");
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <button type="button" className="btn" style={{ width: "fit-content" }} onClick={addToCart} disabled={pending}>
        {pending ? "Adding..." : "Add to cart"}
      </button>
      {message ? <span className="muted">{message}</span> : null}
    </div>
  );
}

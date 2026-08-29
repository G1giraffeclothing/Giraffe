import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getCart, setCart } from "@/lib/cart";

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null) as { productId?: string; quantity?: number } | null;
  const productId = body?.productId;
  const quantity = Math.max(1, body?.quantity ?? 1);

  if (!productId) {
    return NextResponse.json({ error: "productId is required" }, { status: 400 });
  }

  const cart = await getCart(userId);
  const existing = cart.find((item) => item.productId === productId);
  const nextCart = existing
    ? cart.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item)
    : [...cart, { productId, quantity }];

  await setCart(userId, nextCart);
  return NextResponse.json({ ok: true, cart: nextCart });
}

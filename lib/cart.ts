import type { CartItem, Product } from "./types";
import { redis } from "./redis";

const cartKey = (userId: string) => `cart:${userId}`;

export async function getCart(userId: string): Promise<CartItem[]> {
  if (!redis) return [];
  return (await redis.get<CartItem[]>(cartKey(userId))) ?? [];
}

export async function setCart(userId: string, items: CartItem[]) {
  if (!redis) return;
  await redis.set(cartKey(userId), items);
}

export function hydrateCart(items: CartItem[], products: Product[]) {
  return items.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return product ? { ...item, product } : null;
  }).filter(Boolean) as Array<CartItem & { product: Product }>;
}

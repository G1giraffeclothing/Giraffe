import { supabaseAdmin } from "./supabase";
import type { Product } from "./types";

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Sandstone Overshirt",
    slug: "sandstone-overshirt",
    description: "A relaxed everyday overshirt with a structured fit and soft hand feel.",
    price_cents: 7900,
    image_url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
    category: "Outerwear",
    is_featured: true,
    stock: 18,
  },
  {
    id: "2",
    name: "Harbor Straight Jeans",
    slug: "harbor-straight-jeans",
    description: "Clean straight-leg denim with a comfortable mid-rise and all-day wearability.",
    price_cents: 6400,
    image_url: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1200&q=80",
    category: "Bottoms",
    is_featured: true,
    stock: 24,
  },
  {
    id: "3",
    name: "Studio Cotton Tee",
    slug: "studio-cotton-tee",
    description: "A heavyweight tee designed to keep its shape while staying soft.",
    price_cents: 3200,
    image_url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    category: "Basics",
    is_featured: false,
    stock: 40,
  },
];

export async function getProducts(): Promise<Product[]> {
  if (!supabaseAdmin) return fallbackProducts;
  const { data, error } = await supabaseAdmin.from("products").select("*").order("is_featured", { ascending: false });
  if (error || !data?.length) return fallbackProducts;
  return data as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

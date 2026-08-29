import { supabaseAdmin } from "./supabase";
import type { Product } from "./types";

const fallbackProducts: Product[] = [
  {
    id: "gfc-trs-002",
    name: "The Riviera Relaxed Trouser – Ivory",
    slug: "the-riviera-relaxed-trouser-ivory",
    description: "A refined take on relaxed tailoring. The Riviera Relaxed Trouser combines a clean, flowing silhouette with an easy waistband and understated detailing for effortless everyday sophistication.",
    price_cents: 82200,
    image_url: "/products/gfc-trs-002/1.png",
    hover_image_url: "/products/gfc-trs-002/2.png",
    gallery_image_urls: ["/products/gfc-trs-002/3.png", "/products/gfc-trs-002/4.png"],
    category: "Trousers",
    is_featured: true,
    stock: 12,
  },
  {
    id: "gfc-trs-003",
    name: "Noir Wide-Leg Trouser",
    slug: "noir-wide-leg-trouser",
    description: "A refined wide-leg trouser designed with a structured waistband, elegant front pleats and a clean flowing silhouette.",
    price_cents: 75000,
    image_url: "/products/gfc-trs-003/1.png",
    hover_image_url: "/products/gfc-trs-003/2.png",
    gallery_image_urls: ["/products/gfc-trs-003/3.png", "/products/gfc-trs-003/4.png"],
    category: "Trousers",
    is_featured: true,
    stock: 10,
  },
  {
    id: "gfc-trs-004",
    name: "Men's Premium Grey Textured Pleated Straight-Fit Trousers",
    slug: "premium-grey-textured-pleated-straight-fit-trousers",
    description: "A refined pair of grey tailored trousers designed with a subtle textured finish, structured front pleats and a clean straight-leg silhouette.",
    price_cents: 72200,
    image_url: "/products/gfc-trs-004/1.png",
    hover_image_url: "/products/gfc-trs-004/2.png",
    gallery_image_urls: ["/products/gfc-trs-004/3.png", "/products/gfc-trs-004/4.png"],
    category: "Trousers",
    is_featured: false,
    stock: 14,
  },
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

const seededProducts: Product[] = fallbackProducts.filter((product) => product.category === "Trousers");

export async function getProducts(): Promise<Product[]> {
  if (!supabaseAdmin) return fallbackProducts;
  const { data, error } = await supabaseAdmin.from("products").select("*").order("is_featured", { ascending: false });
  if (error || !data?.length) return fallbackProducts;
  const merged = [...(data as Product[])];
  for (const product of seededProducts) {
    if (!merged.some((item) => item.slug === product.slug)) {
      merged.unshift(product);
    }
  }
  return merged;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

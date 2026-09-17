import type { Product } from "./types";
import { supabaseAdmin } from "./supabase";

type CatalogRow = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  category: string;
  selling_price_cents: number;
  color: string | null;
  material: string | null;
  fit: string | null;
  gender: string | null;
  stock_status: string;
  published: boolean;
  featured: boolean;
  images?: Array<{ url: string; role: string; sort_order: number }>;
  variants?: Array<{ size: string; stock_quantity: number; enabled: boolean }>;
};

export async function getCatalogProducts(): Promise<Product[] | null> {
  if (!supabaseAdmin) return null;
  const { data, error } = await supabaseAdmin
    .from("catalog_products")
    .select("*, images:product_images(url, role, sort_order), variants:product_variants(size, stock_quantity, enabled)")
    .eq("status", "PUBLISHED")
    .eq("published", true)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });
  if (error || !data?.length) return null;

  return (data as CatalogRow[]).map((row) => {
    const images = [...(row.images ?? [])].sort((a, b) => a.sort_order - b.sort_order);
    const primary = images.find((image) => image.role === "primary") ?? images[0];
    const standing = images.find((image) => image.role === "standing");
    const gallery = images.filter((image) => image !== primary && image !== standing);
    const variants = (row.variants ?? []).filter((variant) => variant.enabled);
    const stock = variants.reduce((total, variant) => total + variant.stock_quantity, 0);
    return {
      id: row.sku,
      name: row.name,
      title: row.title,
      slug: row.slug,
      description: row.description,
      price_cents: row.selling_price_cents,
      image_url: primary?.url ?? "",
      hover_image_url: standing?.url,
      gallery_image_urls: gallery.map((image) => image.url),
      sizes: variants.map((variant) => variant.size),
      color: row.color ?? undefined,
      material: row.material ?? undefined,
      fit: row.fit ?? undefined,
      gender: row.gender ?? undefined,
      stock_status: row.stock_status,
      published: row.published,
      category: row.category,
      is_featured: row.featured,
      stock,
    } satisfies Product;
  });
}

export async function getAdminProducts() {
  if (!supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from("catalog_products")
    .select("*, images:product_images(id, url, alt, sort_order, role), variants:product_variants(id, size, sku, stock_quantity, enabled)")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

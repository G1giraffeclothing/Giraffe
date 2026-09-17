import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { getFallbackProducts } from "@/lib/data";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const products = getFallbackProducts();
  let migrated = 0;
  for (const product of products) {
    const record = {
      sku: product.id,
      slug: product.slug,
      name: product.name,
      title: product.title ?? product.name,
      description: product.description,
      collection: product.category,
      category: product.category,
      selling_price_cents: product.price_cents,
      color: product.color ?? null,
      material: product.material ?? null,
      fit: product.fit ?? null,
      gender: product.gender ?? "Men",
      stock_status: product.stock_status ?? "In Stock",
      published: product.published !== false,
      featured: product.is_featured,
      status: product.published === false ? "DRAFT" : "PUBLISHED",
    };
    const { data, error } = await supabaseAdmin.from("catalog_products").upsert(record, { onConflict: "sku" }).select("id").single();
    if (error) return NextResponse.json({ error: `${product.id}: ${error.message}` }, { status: 400 });
    const { count } = await supabaseAdmin.from("product_images").select("id", { count: "exact", head: true }).eq("product_id", data.id);
    if (!count) {
      const images = [product.image_url, product.hover_image_url, ...(product.gallery_image_urls ?? [])].filter(Boolean);
      await supabaseAdmin.from("product_images").insert(images.map((url, index) => ({ product_id: data.id, url, alt: product.title ?? product.name, sort_order: index, role: index === 0 ? "primary" : index === 1 ? "standing" : "gallery" })));
    }
    const { count: variantCount } = await supabaseAdmin.from("product_variants").select("id", { count: "exact", head: true }).eq("product_id", data.id);
    if (!variantCount && product.sizes?.length) {
      await supabaseAdmin.from("product_variants").insert(product.sizes.map((size) => ({ product_id: data.id, size, stock_quantity: Math.floor(product.stock / product.sizes!.length), enabled: true })));
    }
    migrated += 1;
  }
  await supabaseAdmin.from("admin_audit_logs").insert({ admin_user_id: admin.id, action: "Catalog migrated", entity: "catalog" });
  return NextResponse.json({ migrated });
}

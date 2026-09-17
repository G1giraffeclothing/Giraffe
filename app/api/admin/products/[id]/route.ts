import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { productInput, cleanSizes } from "@/lib/admin-validation";
import { supabaseAdmin } from "@/lib/supabase";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Context) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const { id } = await params;
  try {
    const body = await request.json() as Record<string, unknown>;
    const input = productInput(body);
    const { data: product, error } = await supabaseAdmin.from("catalog_products").update({ ...input, updated_at: new Date().toISOString() }).eq("id", id).select("id, sku, slug").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    if (body.sizes !== undefined) {
      const sizes = cleanSizes(body.sizes);
      const { data: existingVariants } = await supabaseAdmin.from("product_variants").select("size, stock_quantity, sku, enabled").eq("product_id", id);
      const existing = new Map((existingVariants ?? []).map((variant) => [variant.size, variant]));
      await supabaseAdmin.from("product_variants").delete().eq("product_id", id).not("size", "in", `(${sizes.map((size) => `"${size.replaceAll('"', '')}"`).join(",") || '"__none__"'})`);
      if (sizes.length) await supabaseAdmin.from("product_variants").upsert(sizes.map((size) => ({ product_id: id, size, stock_quantity: existing.get(size)?.stock_quantity ?? 0, sku: existing.get(size)?.sku ?? null, enabled: existing.get(size)?.enabled ?? true })), { onConflict: "product_id,size" });
    }
    await supabaseAdmin.from("admin_audit_logs").insert({ admin_user_id: admin.id, action: "Product updated", entity: "product", entity_id: id });
    return NextResponse.json({ product });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid product" }, { status: 400 }); }
}

export async function DELETE(_: Request, { params }: Context) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const { id } = await params;
  const { error } = await supabaseAdmin.from("catalog_products").update({ status: "ARCHIVED", published: false, updated_at: new Date().toISOString() }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await supabaseAdmin.from("admin_audit_logs").insert({ admin_user_id: admin.id, action: "Product archived", entity: "product", entity_id: id });
  return NextResponse.json({ ok: true });
}

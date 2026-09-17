import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { productInput, cleanSizes } from "@/lib/admin-validation";
import { getAdminProducts } from "@/lib/catalog-db";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  try { return NextResponse.json({ products: await getAdminProducts() }); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to load products" }, { status: 500 }); }
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const input = productInput(body);
    if (!input.name || !input.category) throw new Error("Name and category are required");
    const { data: product, error } = await supabaseAdmin.from("catalog_products").insert(input).select("id, sku, slug").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    const sizes = cleanSizes(body.sizes);
    if (sizes.length) await supabaseAdmin.from("product_variants").insert(sizes.map((size) => ({ product_id: product.id, size, stock_quantity: 0, enabled: true })));
    await supabaseAdmin.from("admin_audit_logs").insert({ admin_user_id: admin.id, action: "Product created", entity: "product", entity_id: product.id });
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid product" }, { status: 400 }); }
}

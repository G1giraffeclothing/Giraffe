import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  if (!await requireAdmin()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const [products, orders, lowStock] = await Promise.all([
    supabaseAdmin.from("catalog_products").select("id, status, published", { count: "exact", head: false }),
    supabaseAdmin.from("store_orders").select("id, total_cents, fulfillment_status, created_at"),
    supabaseAdmin.from("product_variants").select("id", { count: "exact", head: true }).lte("stock_quantity", 5),
  ]);
  const rows = orders.data ?? [];
  return NextResponse.json({
    products: products.data?.length ?? 0,
    published: products.data?.filter((p) => p.status === "PUBLISHED" && p.published).length ?? 0,
    orders: rows.length,
    pendingOrders: rows.filter((order) => order.fulfillment_status === "PENDING").length,
    lowStock: lowStock.count ?? 0,
    revenueCents: rows.reduce((sum, order) => sum + (order.total_cents ?? 0), 0),
  });
}

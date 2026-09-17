import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin-product-form";
import { supabaseAdmin } from "@/lib/supabase";
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; if (!supabaseAdmin) notFound(); const { data } = await supabaseAdmin.from("catalog_products").select("*, variants:product_variants(size, stock_quantity, enabled)").eq("id", id).single(); if (!data) notFound(); return <div className="admin-page"><div className="admin-page-heading"><div><p className="admin-eyebrow">Catalog / Edit</p><h1>{data.name}</h1></div></div><ProductForm product={data} /></div>; }

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase";

type Context = { params: Promise<{ id: string }> };

export async function POST(request: Request, { params }: Context) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const { id } = await params;
  const body = await request.json() as { url?: string; alt?: string; role?: string; sortOrder?: number };
  if (!body.url?.startsWith("/")) return NextResponse.json({ error: "Only local or storage-relative image URLs are accepted" }, { status: 400 });
  const { data, error } = await supabaseAdmin.from("product_images").insert({ product_id: id, url: body.url, alt: body.alt ?? "", role: body.role ?? "gallery", sort_order: body.sortOrder ?? 0 }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await supabaseAdmin.from("admin_audit_logs").insert({ admin_user_id: admin.id, action: "Image added", entity: "product_image", entity_id: data.id });
  return NextResponse.json({ image: data }, { status: 201 });
}

export async function DELETE(request: Request, { params }: Context) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!supabaseAdmin) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  const { id } = await params;
  const { imageId } = await request.json() as { imageId?: string };
  if (!imageId) return NextResponse.json({ error: "imageId is required" }, { status: 400 });
  const { error } = await supabaseAdmin.from("product_images").delete().eq("id", imageId).eq("product_id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

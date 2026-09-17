export const PRODUCT_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export function cleanSizes(value: unknown) {
  if (Array.isArray(value)) return value.map(String).map((size) => size.trim()).filter(Boolean);
  return String(value ?? "").split(",").map((size) => size.trim()).filter(Boolean);
}

export function productInput(body: Record<string, unknown>) {
  const sku = String(body.sku ?? "").trim().toUpperCase();
  const slug = String(body.slug ?? "").trim().toLowerCase();
  const sellingPrice = Number(body.sellingPrice);
  if (!sku || !/^[A-Z0-9][A-Z0-9-]{2,63}$/.test(sku)) throw new Error("SKU must contain only letters, numbers and hyphens");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Slug is invalid");
  if (!Number.isInteger(sellingPrice) || sellingPrice < 0) throw new Error("Selling price must be a non-negative whole number");
  const status = String(body.status ?? "DRAFT").toUpperCase() as ProductStatus;
  if (!PRODUCT_STATUSES.includes(status)) throw new Error("Invalid product status");
  return {
    sku,
    slug,
    name: String(body.name ?? "").trim(),
    title: String(body.title ?? body.name ?? "").trim(),
    description: String(body.description ?? "").trim(),
    collection: String(body.collection ?? "").trim(),
    category: String(body.category ?? "").trim(),
    keywords: String(body.keywords ?? "").split(",").map((item) => item.trim()).filter(Boolean),
    selling_price_cents: sellingPrice * 100,
    cost_price_cents: body.costPrice === "" || body.costPrice == null ? null : Number(body.costPrice) * 100,
    color: String(body.color ?? "").trim() || null,
    material: String(body.material ?? "").trim() || null,
    fit: String(body.fit ?? "").trim() || null,
    gender: String(body.gender ?? "Men").trim() || null,
    stock_status: String(body.stockStatus ?? "In Stock").trim() || "In Stock",
    published: status === "PUBLISHED",
    status,
    featured: Boolean(body.featured),
    new_release: Boolean(body.newRelease),
    best_seller: Boolean(body.bestSeller),
  };
}

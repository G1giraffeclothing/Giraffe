import { SiteHeader } from "@/components/site-header";
import { getProductBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductGallery } from "@/components/product-gallery";

const formatPrice = (value: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const gallery = [product.image_url, product.hover_image_url, ...(product.gallery_image_urls ?? [])].filter(Boolean) as string[];

  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <section className="card" style={{ padding: 24, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div style={{ display: "grid", gap: 14 }}>
            <ProductGallery images={gallery} title={product.title ?? product.name} />
          </div>
          <div style={{ display: "grid", alignContent: "start", gap: 14 }}>
            <p className="muted" style={{ margin: 0 }}>{product.category}</p>
            <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.05 }}>{product.title ?? product.name}</h1>
            <p className="muted" style={{ fontSize: 18, lineHeight: 1.7 }}>{product.description}</p>
            <strong style={{ fontSize: 28 }}>₹{formatPrice(product.price_cents / 100)}</strong>
            <p className="muted">{product.stock_status ?? `Stock: ${product.stock}`}</p>
            {product.sizes?.length ? (
              <div style={{ display: "grid", gap: 8 }}>
                <span className="muted">Sizes</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {product.sizes.map((size) => (
                    <span key={size} className="soft-card" style={{ padding: "8px 12px", borderRadius: 999 }}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <div style={{ display: "grid", gap: 8 }}>
              <span><strong>Color:</strong> {product.color ?? "—"}</span>
              <span><strong>Material:</strong> {product.material ?? "—"}</span>
              <span><strong>Fit:</strong> {product.fit ?? "—"}</span>
            </div>
            <AddToCartButton productId={product.id} sizes={product.sizes} />
            <a href="/checkout" className="btn secondary" style={{ width: "fit-content" }}>Go to checkout</a>
          </div>
        </section>
      </main>
    </>
  );
}

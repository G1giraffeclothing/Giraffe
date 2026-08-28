import { SiteHeader } from "@/components/site-header";
import { getProductBySlug } from "@/lib/data";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <section className="card" style={{ padding: 24, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <img src={product.image_url} alt={product.name} style={{ width: "100%", borderRadius: 22, minHeight: 420, objectFit: "cover" }} />
          <div style={{ display: "grid", alignContent: "start", gap: 14 }}>
            <p className="muted" style={{ margin: 0 }}>{product.category}</p>
            <h1 style={{ margin: 0, fontSize: 44, lineHeight: 1.05 }}>{product.name}</h1>
            <p className="muted" style={{ fontSize: 18, lineHeight: 1.7 }}>{product.description}</p>
            <strong style={{ fontSize: 28 }}>${(product.price_cents / 100).toFixed(2)}</strong>
            <p className="muted">Stock: {product.stock}</p>
            <AddToCartButton productId={product.id} />
            <a href="/checkout" className="btn secondary" style={{ width: "fit-content" }}>Go to checkout</a>
          </div>
        </section>
      </main>
    </>
  );
}

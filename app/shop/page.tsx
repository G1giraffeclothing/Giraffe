import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/data";

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <div className="soft-card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Shop All</h1>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {products.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="soft-card" style={{ padding: 14 }}>
                <img src={product.image_url} alt={product.name} style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 18 }} />
                <h3 style={{ marginBottom: 8 }}>{product.name}</h3>
                <p className="muted" style={{ minHeight: 44 }}>{product.description}</p>
                <strong>${(product.price_cents / 100).toFixed(2)}</strong>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

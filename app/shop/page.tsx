import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/data";
import { PremiumProductCard } from "@/components/premium-product-card";

export default async function ShopPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const category = (await searchParams)?.category?.toLowerCase();
  const products = await getProducts();
  const visibleProducts = category === "trousers" ? products.filter((product) => product.category.toLowerCase() === "trousers") : products;
  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <div className="soft-card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Shop All</h1>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {visibleProducts.map((product, index) => (
              <PremiumProductCard key={product.id} product={product} index={index} compact />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

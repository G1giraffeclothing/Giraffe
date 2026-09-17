import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";

const formatPrice = (cents: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(cents / 100);

export function StyleGuideProductRail({ products, title = "Shop the silhouette" }: { products: Product[]; title?: string }) {
  if (!products.length) return null;
  return (
    <section className="style-guide-products" aria-labelledby="style-guide-products-title">
      <div className="style-guide-products-heading">
        <div><p className="journal-kicker">A considered edit</p><h2 id="style-guide-products-title">{title}</h2></div>
        <Link href="/shop" className="journal-text-link">View the collection <span aria-hidden="true">→</span></Link>
      </div>
      <div className="style-guide-products-grid">
        {products.slice(0, 4).map((product) => (
          <article key={product.slug} className="style-guide-product">
            <Link href={`/products/${product.slug}`} className="style-guide-product-media" aria-label={`View ${product.title ?? product.name}`}>
              <Image src={product.image_url} alt={product.title ?? product.name} fill sizes="(max-width: 768px) 48vw, 22vw" />
            </Link>
            <div className="style-guide-product-copy"><h3>{product.title ?? product.name}</h3><p>₹{formatPrice(product.price_cents)}</p><Link href={`/products/${product.slug}`} className="journal-read-more">View product <span aria-hidden="true">→</span></Link></div>
          </article>
        ))}
      </div>
    </section>
  );
}

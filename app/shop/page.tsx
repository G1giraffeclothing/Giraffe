import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/data";
import { PremiumProductCard } from "@/components/premium-product-card";

type ShopSearchParams = {
  category?: string;
  section?: string;
  collection?: string;
};

const categoryLabels: Record<string, string> = {
  polos: "Polos",
  shirts: "Shirts",
  tees: "Tees & Henleys",
  basics: "Tees & Henleys",
  trousers: "Trousers",
  joggers: "Joggers",
  layers: "Sweatshirts & Layers",
  outerwear: "Jackets & Outerwear",
};

const categoryMatches: Record<string, string[]> = {
  polos: ["polo"],
  shirts: ["shirt"],
  tees: ["basic", "tee", "henley"],
  basics: ["basic", "tee", "henley"],
  trousers: ["trouser"],
  joggers: ["jogger", "track", "bottom"],
  layers: ["layer", "sweatshirt", "outerwear"],
  outerwear: ["outerwear", "jacket", "overshirt", "layer"],
};

const readable = (value: string) => value.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export default async function ShopPage({ searchParams }: { searchParams?: Promise<ShopSearchParams> }) {
  const params = await searchParams;
  const category = params?.category?.toLowerCase();
  const section = params?.section?.toLowerCase();
  const collection = params?.collection?.toLowerCase();
  const products = await getProducts();
  let visibleProducts = products;

  if (category) {
    const terms = categoryMatches[category] ?? [category];
    visibleProducts = products.filter((product) => {
      if (category === "shirts" || category === "polos" || category === "trousers") {
        return product.category.toLowerCase() === category;
      }
      const haystack = `${product.category} ${product.name} ${product.title ?? ""}`.toLowerCase();
      return terms.some((term) => haystack.includes(term));
    });
  } else if (section === "new") {
    visibleProducts = products.filter((product) => product.is_featured);
  } else if (section === "bestsellers" || section === "trending" || section === "essentials") {
    visibleProducts = products.filter((product) => product.is_featured || product.stock > 0);
  } else if (collection) {
    const collectionMatches = products.filter((product) =>
      `${product.category} ${product.name} ${product.title ?? ""} ${product.description}`.toLowerCase().includes(collection.replace(/-/g, " ")),
    );
    if (collectionMatches.length) visibleProducts = collectionMatches;
  }

  const title = category ? categoryLabels[category] ?? readable(category) : section ? readable(section) : collection ? readable(collection) : "Shop All";
  const description = category
    ? `Explore our ${title.toLowerCase()} collection.`
    : section
      ? `Discover the pieces selected for ${title.toLowerCase()}.`
      : collection
        ? `A considered edit from Giraffe Clothing.`
        : "Modern menswear with a considered point of view.";

  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <div className="soft-card" style={{ padding: 24 }}>
          <p className="editorial-kicker">Giraffe Clothing</p>
          <h1 style={{ marginTop: 0 }}>{title}</h1>
          <p className="section-copy">{description} {visibleProducts.length} {visibleProducts.length === 1 ? "piece" : "pieces"} available.</p>
          {visibleProducts.length ? (
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {visibleProducts.map((product, index) => (
              <PremiumProductCard key={product.id} product={product} index={index} compact />
            ))}
            </div>
          ) : (
            <div className="soft-card" style={{ padding: 32, marginTop: 24 }}>
              <h2 style={{ marginTop: 0 }}>This edit is coming soon</h2>
              <p className="section-copy">We&apos;re preparing the latest {title.toLowerCase()} pieces. Browse the full collection while we get it ready.</p>
              <a href="/shop" className="btn">Shop all products</a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

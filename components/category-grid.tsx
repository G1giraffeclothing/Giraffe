import Link from "next/link";

const categories = [
  { title: "Polos", href: "/shop?category=polos" },
  { title: "Shirts", href: "/shop?category=shirts" },
  { title: "Trousers", href: "/shop?category=trousers" },
  { title: "Combos", href: "/shop?category=combos" },
  { title: "Oversized", href: "/shop?category=oversized" },
  { title: "Accessories", href: "/shop?category=accessories" },
];

export function CategoryGrid() {
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
      {categories.map((category) => (
        <Link key={category.title} href={category.href} className="soft-card" style={{ padding: 18, minHeight: 120, display: "grid", alignContent: "end" }}>
          <span className="muted" style={{ fontSize: 13 }}>Shop</span>
          <strong style={{ fontSize: 22, letterSpacing: "-0.04em" }}>{category.title}</strong>
        </Link>
      ))}
    </div>
  );
}

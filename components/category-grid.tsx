import Link from "next/link";

const categories = [
  {
    title: "Polos",
    href: "/shop?category=polos",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Shirts",
    href: "/shop?category=shirts",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Trousers",
    href: "/shop?category=trousers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Tees & Henleys",
    href: "/shop?category=basics",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sweatshirts & Layers",
    href: "/shop?category=outerwear",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
  },
];

export function CategoryGrid() {
  return (
    <div className="category-tiles">
      {categories.map((category) => (
        <Link key={category.title} href={category.href} className="soft-card category-tile">
          <img src={category.image} alt={category.title} className="category-tile-image" />
          <div className="category-tile-overlay" />
          <div className="category-tile-body">
            <span className="editorial-kicker">Shop</span>
            <strong>{category.title}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

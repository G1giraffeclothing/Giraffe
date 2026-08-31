import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Polos",
    href: "/shop?category=polos",
    image: "/products/trousers/GFC-TRS-001/01-hanging.png",
    large: true,
  },
  {
    title: "Trousers",
    href: "/shop?category=trousers",
    image: "/products/trousers/GFC-TRS-002/01-hanging.png",
    large: true,
  },
  {
    title: "Shirts",
    href: "/shop?category=shirts",
    image: "/products/trousers/GFC-TRS-003/01-hanging.png",
    wide: true,
  },
  {
    title: "Sweatshirts & Layers",
    href: "/shop?category=outerwear",
    image: "/products/trousers/GFC-TRS-004/01-hanging.png",
  },
  {
    title: "Tees & Henleys",
    href: "/shop?category=basics",
    image: "/products/trousers/GFC-TRS-005/01-hanging.png",
  },
];

export function CategoryGrid() {
  return (
    <div className="category-tiles">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className={`category-tile ${category.large ? "large" : ""} ${category.wide ? "wide" : ""}`}
        >
          <Image src={category.image} alt={category.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="category-tile-image" />
          <div className="category-tile-overlay" />
          <div className="category-tile-body">
            <span className="editorial-kicker">Shop now</span>
            <strong>{category.title}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

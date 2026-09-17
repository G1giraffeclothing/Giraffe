"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { categoryImages } from "@/lib/assets";

const categories = [
  {
    title: "Tees & Henleys",
    href: "/shop?category=tees",
    image: categoryImages.tees,
  },
  {
    title: "Polos & Shirts",
    href: "/shop?category=polos",
    image: categoryImages.polos,
  },
  {
    title: "Trousers & Joggers",
    href: "/shop?category=trousers",
    image: categoryImages.trousers,
  },
  {
    title: "Sweatshirts & Layers",
    href: "/shop?category=layers",
    image: categoryImages.layers,
  },
];

export function CategoryGrid() {
  return (
    <div className="category-tiles">
      {categories.map((category) => (
        <motion.div
          key={category.title}
          className="category-tile"
          whileHover={{ y: -3 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={category.href} className="category-tile-link">
            <motion.div className="category-tile-media" whileHover={{ scale: 1.04, y: -3 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <Image src={category.image} alt={category.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="category-tile-image" />
            </motion.div>
            <div className="category-tile-overlay" />
            <motion.div className="category-tile-body" whileHover={{ y: -2 }}>
              <span className="editorial-kicker">Shop now</span>
              <strong>{category.title}</strong>
              <span className="category-tile-arrow" aria-hidden="true">→</span>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

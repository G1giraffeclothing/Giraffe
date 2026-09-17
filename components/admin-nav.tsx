"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { label: "Overview", items: [{ href: "/admin", label: "Home", icon: "▦" }] },
  { label: "Manage", items: [
    { href: "/admin/orders", label: "Orders", icon: "⌁" },
    { href: "/admin/products", label: "Products", icon: "□" },
    { href: "/admin/customers", label: "Customers", icon: "♙" },
  ] },
  { label: "Content", items: [
    { href: "/admin/collections", label: "Collections", icon: "◇" },
    { href: "/admin/settings", label: "Settings", icon: "⚙" },
  ] },
];

export function AdminNav() {
  const pathname = usePathname();
  return <nav className="admin-nav" aria-label="Admin navigation">
    {sections.map((section) => <div className="admin-nav-section" key={section.label}>
      <p>{section.label}</p>
      {section.items.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href)) ? "active" : ""}><span className="admin-nav-icon">{item.icon}</span>{item.label}</Link>)}
    </div>)}
  </nav>;
}

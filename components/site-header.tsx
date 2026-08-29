"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { brandLogo } from "@/lib/assets";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="container" style={{ paddingTop: 18 }}>
      <div className="soft-card header-shell">
        <nav className="header-side left header-desktop-nav">
          <Link href="/shop" className="pill header-pill">Men</Link>
          <Link href="/shop?section=new" className="pill header-pill">New</Link>
          <Link href="/shop?section=bestsellers" className="pill header-pill">Best Sellers</Link>
        </nav>

        <div className="header-mobile-left">
          <button
            type="button"
            className="pill icon-pill header-menu-button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            Menu
          </button>
        </div>

        <Link href="/" className="header-brand">
          <span className="header-brand-mark">
            <Image src={brandLogo} alt="Giraffe Clothing logo" priority style={{ width: "auto", height: 52, objectFit: "contain" }} />
          </span>
          <span className="header-brand-sub">clothing.in</span>
        </Link>

        <nav className="header-side right header-desktop-actions">
          <span className="pill icon-pill header-action">Search</span>
          <span className="pill icon-pill header-action">Wishlist</span>
          <Link href="/checkout" className="pill icon-pill header-action">Bag</Link>
        </nav>

        <nav className="header-mobile-actions">
          <span className="pill icon-pill header-action">Search</span>
          <Link href="/checkout" className="pill icon-pill header-action">Bag</Link>
        </nav>

        <div className={`header-mobile-panel ${open ? "open" : ""}`}>
          <Link href="/shop" onClick={() => setOpen(false)}>Men</Link>
          <Link href="/shop?section=new" onClick={() => setOpen(false)}>New</Link>
          <Link href="/shop?section=bestsellers" onClick={() => setOpen(false)}>Best Sellers</Link>
          <Link href="/shop" onClick={() => setOpen(false)}>Shop all</Link>
          <Link href="/checkout" onClick={() => setOpen(false)}>Bag</Link>
        </div>
      </div>
    </header>
  );
}

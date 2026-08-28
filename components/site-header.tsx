import Link from "next/link";
import Image from "next/image";
import { brandLogo } from "@/lib/assets";

export function SiteHeader() {
  return (
    <header className="container" style={{ paddingTop: 18 }}>
      <div className="soft-card header-shell">
        <nav className="header-side left">
          <Link href="/shop" className="muted">Men</Link>
          <Link href="/shop?section=new" className="muted">New</Link>
          <Link href="/shop?section=bestsellers" className="muted">Best Sellers</Link>
        </nav>

        <Link href="/" className="header-brand">
          <span className="header-brand-mark">
            <Image src={brandLogo} alt="Giraffe Clothing logo" priority style={{ width: "auto", height: 52, objectFit: "contain" }} />
          </span>
          <span className="header-brand-sub">clothing.in</span>
        </Link>

        <nav className="header-side right">
          <span className="pill icon-pill">Search</span>
          <span className="pill icon-pill">Wishlist</span>
          <Link href="/checkout" className="pill icon-pill">Bag</Link>
        </nav>
      </div>
    </header>
  );
}

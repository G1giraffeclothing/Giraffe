"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { brandLogo } from "@/lib/assets";
import desktopSlide1 from "../Website Stuffs/Desktop Slide 1.png";
import desktopSlide2 from "../Website Stuffs/Desktop Slide 2.png";
import desktopSlide3 from "../Website Stuffs/Desktop Slide 3.png";

type DesktopMenuKey = "shop-men" | "collections" | "journal" | "world";

type MenuCard = {
  label: string;
  title: string;
  copy: string;
  href: string;
  image: StaticImageData;
};

const announcementMessages = [
  "Complimentary shipping on orders above ₹1,999",
  "The art of timeless style",
  "Easy returns & exchanges",
];

const shopMenLinks = [
  { label: "Polos", href: "/shop?category=polos" },
  { label: "Shirts", href: "/shop?category=shirts" },
  { label: "T-Shirts & Henleys", href: "/shop?category=tees" },
  { label: "Trousers", href: "/shop?category=trousers" },
  { label: "Joggers", href: "/shop?category=joggers" },
  { label: "Sweatshirts & Layers", href: "/shop?category=layers" },
  { label: "Jackets & Outerwear", href: "/shop?category=outerwear" },
];

const discoverLinks = [
  { label: "New Arrivals", href: "/shop?section=new" },
  { label: "Best Sellers", href: "/shop?section=bestsellers" },
  { label: "Trending Now", href: "/shop?section=trending" },
  { label: "Giraffe Essentials", href: "/shop?section=essentials" },
];

const collectionLinks = [
  { label: "The Old Money Edit", href: "/shop?collection=old-money" },
  { label: "Quiet Luxury", href: "/shop?collection=quiet-luxury" },
  { label: "The Linen Edit", href: "/shop?collection=linen" },
  { label: "After Hours", href: "/shop?collection=after-hours" },
  { label: "Monochrome", href: "/shop?collection=monochrome" },
  { label: "The Essentials", href: "/shop?collection=essentials" },
];

const journalLinks = [
  { label: "Style Guides", href: "/about" },
  { label: "How to Wear", href: "/about" },
  { label: "The Giraffe Edit", href: "/about" },
  { label: "Stories", href: "/about" },
];

const worldLinks = [
  { label: "Our Story", href: "/about" },
  { label: "The Giraffe Philosophy", href: "/about" },
  { label: "Craft & Quality", href: "/about" },
  { label: "Contact Us", href: "/about" },
];

const desktopMenuCards: Record<DesktopMenuKey, MenuCard[]> = {
  "shop-men": [
    {
      label: "Featured",
      title: "Everyday, Elevated.",
      copy: "Modern essentials made for effortless dressing.",
      href: "/shop",
      image: desktopSlide1,
    },
  ],
  collections: [
    {
      label: "Old Money",
      title: "Refined classics",
      copy: "Clean cuts, soft tailoring and quiet confidence.",
      href: "/shop?collection=old-money",
      image: desktopSlide2,
    },
    {
      label: "After Hours",
      title: "Evening dressing",
      copy: "Subtle contrasts and sharper silhouettes.",
      href: "/shop?collection=after-hours",
      image: desktopSlide3,
    },
  ],
  journal: [
    {
      label: "Featured Story",
      title: "How to master quiet luxury",
      copy: "Thoughtful styling notes and elevated wardrobe ideas.",
      href: "/about",
      image: desktopSlide2,
    },
  ],
  world: [
    {
      label: "Giraffe Clothing",
      title: "Stand above the ordinary.",
      copy: "A premium menswear label built on restraint, structure and polish.",
      href: "/about",
      image: desktopSlide3,
    },
  ],
};

const searchTrending = ["Polos", "Linen Shirts", "Trousers", "New Arrivals"];

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-icon">
      <path d="M4 7.5h16M4 12h16M4 16.5h16" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-icon">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.25 16.25 4 4" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-icon">
      <path d="M12 20.25S4.5 15.75 4.5 9.75A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 7.5 3.75c0 6-7.5 10.5-7.5 10.5Z" />
    </svg>
  );
}

function IconBag() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-icon">
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-icon site-icon--chevron">
      <path d="m7.5 9 4.5 4.5 4.5-4.5" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="site-icon">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function SiteHeader() {
  const [activeMenu, setActiveMenu] = useState<DesktopMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>("shop-men");
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const mobileAnnouncement = useMemo(() => announcementMessages[announcementIndex % announcementMessages.length], [announcementIndex]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const interval = window.setInterval(() => {
      setAnnouncementIndex((current) => (current + 1) % announcementMessages.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const open = mobileOpen || searchOpen || cartOpen;
    document.body.classList.toggle("header-overlay-open", open);
    return () => {
      document.body.classList.remove("header-overlay-open");
    };
  }, [cartOpen, mobileOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setActiveMenu(null);
      setMobileOpen(false);
      setSearchOpen(false);
      setCartOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function clearCloseTimer() {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function scheduleClose() {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 120);
  }

  function openMenu(menu: DesktopMenuKey) {
    setActiveMenu(menu);
    setSearchOpen(false);
    setCartOpen(false);
  }

  function toggleMobileSection(section: string) {
    setMobileSection((current) => (current === section ? null : section));
  }

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  function closeDesktopOverlays() {
    setActiveMenu(null);
    setSearchOpen(false);
    setCartOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={scheduleClose}
      onFocusCapture={clearCloseTimer}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActiveMenu(null);
        }
      }}
    >
      <div className="site-announcement" aria-label="Store announcements">
        <div className="site-announcement-desktop">
          <span>Complimentary shipping on orders above ₹1,999</span>
          <span>The art of timeless style</span>
          <span>Easy returns &amp; exchanges</span>
        </div>
        <div className="site-announcement-mobile" aria-live="polite">
          <span>{mobileAnnouncement}</span>
        </div>
      </div>

      <div className="site-header-main">
        <div className="site-header-inner">
          <nav className="site-header-nav site-header-nav--left" aria-label="Primary navigation">
            <Link href="/shop?section=new" className="site-nav-link site-nav-link--new" onClick={closeDesktopOverlays}>
              <span>New In</span>
              <span className="site-nav-badge">New</span>
            </Link>

            <button
              type="button"
              className="site-nav-button"
              aria-expanded={activeMenu === "shop-men"}
              aria-haspopup="menu"
              onMouseEnter={() => openMenu("shop-men")}
              onFocus={() => openMenu("shop-men")}
              onClick={() => setActiveMenu((current) => (current === "shop-men" ? null : "shop-men"))}
            >
              <span>Shop Men</span>
              <IconChevron />
            </button>

            <button
              type="button"
              className="site-nav-button"
              aria-expanded={activeMenu === "collections"}
              aria-haspopup="menu"
              onMouseEnter={() => openMenu("collections")}
              onFocus={() => openMenu("collections")}
              onClick={() => setActiveMenu((current) => (current === "collections" ? null : "collections"))}
            >
              <span>Explore Collections</span>
              <IconChevron />
            </button>
          </nav>

          <Link href="/" className="site-brand" aria-label="Giraffe Clothing home" onClick={closeDesktopOverlays}>
            <span className="site-brand-mark">
              <Image src={brandLogo} alt="Giraffe Clothing" priority fill sizes="(max-width: 768px) 160px, 170px" />
            </span>
          </Link>

          <nav className="site-header-nav site-header-nav--right" aria-label="Secondary navigation">
            <button
              type="button"
              className="site-nav-button"
              aria-expanded={activeMenu === "journal"}
              aria-haspopup="menu"
              onMouseEnter={() => openMenu("journal")}
              onFocus={() => openMenu("journal")}
              onClick={() => setActiveMenu((current) => (current === "journal" ? null : "journal"))}
            >
              <span>The Journal</span>
              <IconChevron />
            </button>

            <button
              type="button"
              className="site-nav-button"
              aria-expanded={activeMenu === "world"}
              aria-haspopup="menu"
              onMouseEnter={() => openMenu("world")}
              onFocus={() => openMenu("world")}
              onClick={() => setActiveMenu((current) => (current === "world" ? null : "world"))}
            >
              <span>Our World</span>
              <IconChevron />
            </button>

            <button
              type="button"
              className="site-action-link site-action-link--search"
              aria-expanded={searchOpen}
              aria-controls="site-search-overlay"
              onClick={() => {
                setSearchOpen((current) => !current);
                setActiveMenu(null);
                setCartOpen(false);
              }}
            >
              <IconSearch />
              <span>Search</span>
            </button>

            <button type="button" className="site-action-link" aria-label="Wishlist">
              <IconHeart />
              <span>Wishlist</span>
            </button>

            <button
              type="button"
              className="site-action-link"
              aria-expanded={cartOpen}
              aria-controls="site-cart-drawer"
              onClick={() => {
                setCartOpen((current) => !current);
                setActiveMenu(null);
                setSearchOpen(false);
              }}
            >
              <IconBag />
              <span>Bag (0)</span>
            </button>
          </nav>

          <div className="site-mobile-controls">
            <button
              type="button"
              className="site-icon-button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((current) => !current);
                setSearchOpen(false);
                setCartOpen(false);
                setActiveMenu(null);
              }}
            >
              <IconMenu />
            </button>

            <div className="site-mobile-brand">
              <Image src={brandLogo} alt="Giraffe Clothing" priority fill sizes="160px" />
            </div>

            <div className="site-mobile-actions">
              <button
                type="button"
                className="site-icon-button"
                aria-label="Search"
                aria-expanded={searchOpen}
                onClick={() => {
                  setSearchOpen((current) => !current);
                  setMobileOpen(false);
                  setCartOpen(false);
                  setActiveMenu(null);
                }}
              >
                <IconSearch />
              </button>
              <button type="button" className="site-icon-button" aria-label="Wishlist">
                <IconHeart />
              </button>
              <button
                type="button"
                className="site-icon-button"
                aria-label="Open bag"
                aria-expanded={cartOpen}
                onClick={() => {
                  setCartOpen((current) => !current);
                  setMobileOpen(false);
                  setSearchOpen(false);
                  setActiveMenu(null);
                }}
              >
                <IconBag />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`site-mega-panel ${activeMenu ? "is-open" : ""}`} aria-hidden={!activeMenu}>
        <div className="site-mega-panel-inner">
          {activeMenu === "shop-men" ? (
            <div className="site-mega-layout">
              <div className="site-mega-columns">
                <div className="site-mega-column">
                  <p className="site-mega-label">Shop Clothing</p>
                  {shopMenLinks.map((item) => (
                    <Link key={item.label} href={item.href} className="site-mega-link" onClick={closeDesktopOverlays}>
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/shop" className="site-mega-all" onClick={closeDesktopOverlays}>
                    Shop All →
                  </Link>
                </div>

                <div className="site-mega-column">
                  <p className="site-mega-label">Discover</p>
                  {discoverLinks.map((item) => (
                    <Link key={item.label} href={item.href} className="site-mega-link" onClick={closeDesktopOverlays}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="site-mega-cards">
                {desktopMenuCards["shop-men"].map((card) => (
                  <Link key={card.title} href={card.href} className="site-mega-card" onClick={closeDesktopOverlays}>
                    <Image src={card.image} alt={card.title} fill sizes="(max-width: 1200px) 35vw, 420px" className="site-mega-card-image" />
                    <div className="site-mega-card-overlay" />
                    <div className="site-mega-card-content">
                      <span className="site-mega-card-label">{card.label}</span>
                      <strong>{card.title}</strong>
                      <p>{card.copy}</p>
                      <span className="site-mega-card-link">Discover →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {activeMenu === "collections" ? (
            <div className="site-mega-layout site-mega-layout--collections">
              <div className="site-mega-columns">
                <div className="site-mega-column">
                  <p className="site-mega-label">Signature Edits</p>
                  {collectionLinks.map((item) => (
                    <Link key={item.label} href={item.href} className="site-mega-link" onClick={closeDesktopOverlays}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="site-mega-cards site-mega-cards--stack">
                {desktopMenuCards.collections.map((card) => (
                  <Link key={card.title} href={card.href} className="site-mega-card site-mega-card--small" onClick={closeDesktopOverlays}>
                    <Image src={card.image} alt={card.title} fill sizes="(max-width: 1200px) 32vw, 320px" className="site-mega-card-image" />
                    <div className="site-mega-card-overlay" />
                    <div className="site-mega-card-content">
                      <span className="site-mega-card-label">{card.label}</span>
                      <strong>{card.title}</strong>
                      <p>{card.copy}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {activeMenu === "journal" ? (
            <div className="site-mega-layout site-mega-layout--compact">
              <div className="site-mega-columns">
                <div className="site-mega-column">
                  <p className="site-mega-label">Editorial</p>
                  {journalLinks.map((item) => (
                    <Link key={item.label} href={item.href} className="site-mega-link" onClick={closeDesktopOverlays}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/about" className="site-mega-quote" onClick={closeDesktopOverlays}>
                <Image src={desktopMenuCards.journal[0].image} alt="How to master quiet luxury" fill sizes="360px" className="site-mega-quote-image" />
                <div className="site-mega-card-overlay" />
                <div className="site-mega-quote-content">
                  <span className="site-mega-card-label">How to Master Quiet Luxury</span>
                  <strong>Read story →</strong>
                </div>
              </Link>
            </div>
          ) : null}

          {activeMenu === "world" ? (
            <div className="site-mega-layout site-mega-layout--compact">
              <div className="site-mega-columns">
                <div className="site-mega-column">
                  <p className="site-mega-label">Brand</p>
                  {worldLinks.map((item) => (
                    <Link key={item.label} href={item.href} className="site-mega-link" onClick={closeDesktopOverlays}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/about" className="site-mega-quote" onClick={closeDesktopOverlays}>
                <Image src={desktopMenuCards.world[0].image} alt="Stand above the ordinary" fill sizes="360px" className="site-mega-quote-image" />
                <div className="site-mega-card-overlay" />
                <div className="site-mega-quote-content">
                  <span className="site-mega-card-label">Stand above the ordinary.</span>
                  <strong>Discover Giraffe →</strong>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>

      <div className={`site-search-overlay ${searchOpen ? "is-open" : ""}`} id="site-search-overlay" aria-hidden={!searchOpen}>
        <div className="site-overlay-backdrop" onClick={() => setSearchOpen(false)} />
        <section className="site-overlay-panel" aria-label="Search products">
          <button type="button" className="site-overlay-close" onClick={() => setSearchOpen(false)} aria-label="Close search">
            <IconClose />
          </button>
          <p className="site-overlay-kicker">What are you looking for?</p>
          <h2>Search polos, shirts, trousers...</h2>
          <label className="site-overlay-field">
            <span className="sr-only">Search products</span>
            <input type="search" placeholder="Search polos, shirts, trousers..." autoFocus />
          </label>
          <div className="site-overlay-grid">
            <div>
              <p className="site-overlay-label">Trending searches</p>
              <div className="site-overlay-tags">
                {searchTrending.map((item) => (
                  <Link key={item} href="/shop" className="site-overlay-tag" onClick={() => setSearchOpen(false)}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="site-overlay-label">Quick links</p>
              <div className="site-overlay-links">
                <Link href="/shop?category=trousers" onClick={() => setSearchOpen(false)}>
                  Trousers
                </Link>
                <Link href="/shop?category=shirts" onClick={() => setSearchOpen(false)}>
                  Shirts
                </Link>
                <Link href="/shop?section=new" onClick={() => setSearchOpen(false)}>
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className={`site-cart-drawer ${cartOpen ? "is-open" : ""}`} id="site-cart-drawer" aria-hidden={!cartOpen}>
        <div className="site-overlay-backdrop" onClick={() => setCartOpen(false)} />
        <aside className="site-cart-panel" aria-label="Shopping bag">
          <button type="button" className="site-overlay-close" onClick={() => setCartOpen(false)} aria-label="Close bag">
            <IconClose />
          </button>
          <p className="site-overlay-kicker">Your bag</p>
          <h2>Bag (0)</h2>
          <p className="site-cart-empty">
            Your bag is ready for premium tailoring. Add a product to see it appear here.
          </p>
          <div className="site-cart-actions">
            <Link href="/checkout" className="btn" onClick={() => setCartOpen(false)}>
              Checkout
            </Link>
            <Link href="/shop" className="btn secondary" onClick={() => setCartOpen(false)}>
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>

      <div className={`site-mobile-drawer ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="site-overlay-backdrop" onClick={closeMobileMenu} />
        <aside className="site-mobile-panel" aria-label="Mobile navigation">
          <div className="site-mobile-panel-top">
            <p>Menu</p>
            <button type="button" className="site-overlay-close" onClick={closeMobileMenu} aria-label="Close menu">
              <IconClose />
            </button>
          </div>

          <nav className="site-mobile-nav">
            <Link href="/shop?section=new" className="site-mobile-direct" onClick={closeMobileMenu}>
              New In
            </Link>

            <div className="site-mobile-accordion">
              <button type="button" onClick={() => toggleMobileSection("shop-men")} aria-expanded={mobileSection === "shop-men"}>
                Shop Men
                <IconChevron />
              </button>
              {mobileSection === "shop-men" ? (
                <div className="site-mobile-accordion-panel">
                  {shopMenLinks.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/shop" onClick={closeMobileMenu}>
                    Shop All
                  </Link>
                </div>
              ) : null}
            </div>

            <div className="site-mobile-accordion">
              <button type="button" onClick={() => toggleMobileSection("collections")} aria-expanded={mobileSection === "collections"}>
                Explore Collections
                <IconChevron />
              </button>
              {mobileSection === "collections" ? (
                <div className="site-mobile-accordion-panel">
                  {collectionLinks.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="site-mobile-accordion">
              <button type="button" onClick={() => toggleMobileSection("journal")} aria-expanded={mobileSection === "journal"}>
                The Journal
                <IconChevron />
              </button>
              {mobileSection === "journal" ? (
                <div className="site-mobile-accordion-panel">
                  {journalLinks.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="site-mobile-accordion">
              <button type="button" onClick={() => toggleMobileSection("world")} aria-expanded={mobileSection === "world"}>
                Our World
                <IconChevron />
              </button>
              {mobileSection === "world" ? (
                <div className="site-mobile-accordion-panel">
                  {worldLinks.map((item) => (
                    <Link key={item.label} href={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}

import { SiteHeader } from "@/components/site-header";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <section className="soft-card" style={{ padding: 28, display: "grid", gap: 18 }}>
          <span className="pill" style={{ width: "fit-content" }}>About Giraffe Clothing</span>
          <h1 style={{ margin: 0, fontSize: "clamp(40px, 7vw, 72px)", lineHeight: 0.96, letterSpacing: "-0.07em" }}>
            We build clean, premium everyday clothing.
          </h1>
          <p className="section-copy" style={{ maxWidth: 850 }}>
            Giraffe Clothing is a modern fashion label focused on strong fits, elevated basics, and a storefront experience that feels polished on mobile and desktop. Our goal is simple: make clothing that looks sharp, feels comfortable, and fits into real everyday life.
          </p>
          <p className="section-copy" style={{ maxWidth: 850 }}>
            We care about fabric quality, reliable sizing, clean styling, and a brand identity that feels recognizable at a glance. Every collection should feel intentional, whether it is a polo, trouser, shirt, or layered edit.
          </p>
          <p className="section-copy" style={{ maxWidth: 850 }}>
            This site is designed to evolve with your product catalog, campaign photography, Instagram content, and future drops.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/shop" className="btn">Shop collections</Link>
            <Link href="/" className="btn secondary">Back home</Link>
          </div>
        </section>
      </main>
    </>
  );
}

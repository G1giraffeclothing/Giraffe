import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { getProducts } from "@/lib/data";
import { TrustStrip } from "@/components/trust-strip";
import { SectionHeading } from "@/components/section-heading";
import { HeroSlider } from "@/components/hero-slider";
import { TestimonialStrip } from "@/components/testimonial-strip";
import { heroSlides } from "@/lib/assets";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((p) => p.is_featured).slice(0, 3);
  const bestSellers = products.slice(0, 4);

  return (
    <>
      <div className="sale-bar">ANNIVERSARY SALE - NEW RELEASES LIVE NOW - FREE SHIPPING ABOVE RS. 999</div>
      <SiteHeader />
      <main style={{ paddingBottom: 56 }}>
        <HeroSlider slides={heroSlides as unknown as Parameters<typeof HeroSlider>[0]["slides"]} />
        <div className="container shell grid" style={{ gap: 18 }}>
        <div className="soft-card" style={{ overflow: "hidden", padding: "14px 0", borderRadius: 999 }}>
          <div style={{ display: "flex", gap: 28, whiteSpace: "nowrap", width: "max-content", animation: "marquee 16s linear infinite", paddingInline: 18 }}>
            {["ANNIVERSARY SALE", "NEW RELEASES", "SIGNATURE SHIRTS", "SEASONAL EDIT", "SHOP THE DROP", "TAILORED TROUSERS", "BREATHABLE FABRICS"].map((item) => (
              <span key={item} style={{ fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase" }}>• {item}</span>
            ))}
          </div>
        </div>

        <TrustStrip />

        <section className="soft-card feature-split">
          <div className="feature-copy">
            <span className="pill" style={{ width: "fit-content" }}>Shop polos</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Polos made to look sharp from every angle.</h2>
            <p className="section-copy">Cuts-style category block with a strong product image, concise copy, and one clear shopping action. This is the exact rhythm your homepage needs.</p>
            <Link href="/shop?category=polos" className="btn" style={{ width: "fit-content" }}>Shop now</Link>
          </div>
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80" alt="Shop polos" />
          </div>
        </section>

        <section className="soft-card feature-split reverse">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80" alt="Premium collection" />
          </div>
          <div className="feature-copy">
            <span className="pill" style={{ width: "fit-content" }}>Giraffe premium collection</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Premium cuts, refined fabrics, and clean structure.</h2>
            <p className="section-copy">Use this as a full-width editorial block. The goal is to feel premium and minimal, just like the reference rhythm.</p>
            <Link href="/shop" className="btn" style={{ width: "fit-content" }}>View collection</Link>
          </div>
        </section>

        <section className="soft-card feature-split">
          <div className="feature-copy">
            <span className="pill" style={{ width: "fit-content" }}>Shop by category</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Tees, henleys, joggers, shirts, and layers.</h2>
            <p className="section-copy">Keep the category list clean and high intent. Each row should feel like a direct route to shopping, not a menu.</p>
            <Link href="/shop" className="btn" style={{ width: "fit-content" }}>Explore categories</Link>
          </div>
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1600&q=80" alt="Shop categories" />
          </div>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <SectionHeading
            eyebrow="New releases"
            title="Shop new releases before they sell through."
            copy="Keep the latest arrivals near the top so returning customers can immediately see what's fresh."
          />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {featured.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="soft-card" style={{ padding: 16, transform: "perspective(1000px) translateZ(0)", transition: "transform 240ms ease, box-shadow 240ms ease" }}>
                <img src={product.image_url} alt={product.name} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 18 }} />
                <div style={{ padding: "14px 4px 4px" }}>
                  <p className="muted" style={{ margin: 0 }}>{product.category}</p>
                  <h2 style={{ margin: "6px 0" }}>{product.name}</h2>
                  <strong>${(product.price_cents / 100).toFixed(2)}</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="soft-card feature-split reverse">
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80" alt="Textured polo collection" />
          </div>
          <div className="feature-copy">
            <span className="pill" style={{ width: "fit-content" }}>Trend collections</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Textured polos, trousers, and seasonal edits.</h2>
            <p className="section-copy">This block should feel like a premium side-scroll on the Cuts site, but translated to your brand voice.</p>
            <Link href="/shop?category=polos" className="btn" style={{ width: "fit-content" }}>Shop trend collections</Link>
          </div>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <SectionHeading
            eyebrow="Best sellers"
            title="Products that deserve the spotlight."
            copy="Show the strongest products here. This is one of the most important conversion zones on the homepage."
          />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {bestSellers.map((product) => (
              <Link key={product.id} href={`/products/${product.slug}`} className="soft-card" style={{ padding: 14 }}>
                <img src={product.image_url} alt={product.name} style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 18 }} />
                <h3 style={{ marginBottom: 8 }}>{product.name}</h3>
                <p className="muted" style={{ minHeight: 44 }}>{product.description}</p>
                <strong>${(product.price_cents / 100).toFixed(2)}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="soft-card feature-split">
          <div className="feature-copy">
            <span className="pill" style={{ width: "fit-content" }}>Fabric story</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Breathable fabrics built for every day.</h2>
            <p className="section-copy">A final editorial feature block for material, fit, and custom stitch storytelling. This is where your brand credibility builds trust.</p>
            <Link href="/shop" className="btn" style={{ width: "fit-content" }}>Explore fabrics</Link>
          </div>
          <div className="feature-image">
            <img src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1600&q=80" alt="Fabric story" />
          </div>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <SectionHeading
            eyebrow="Brand story"
            title="About Giraffe Clothing."
            copy="Keep the copy short on the homepage and let the Learn More button lead to a fuller about page."
          />
          <div className="soft-card" style={{ padding: 20 }}>
            <p style={{ marginTop: 0, lineHeight: 1.8, maxWidth: 720 }}>
              Giraffe Clothing creates polished everyday wear with a modern fit, premium fabric choices, and a clean visual identity. We design pieces that feel sharp, wearable, and built for real life.
            </p>
            <Link href="/about" className="btn secondary" style={{ width: "fit-content" }}>Learn more</Link>
          </div>
        </section>

        <section className="card" style={{ padding: 24 }}>
          <SectionHeading
            eyebrow="Testimonials"
            title="Social proof should feel clean, not noisy."
            copy="Short quotes work better than long blocks of text. Use 3 to 4 real customer reactions if possible."
          />
          <TestimonialStrip />
        </section>

        <section className="card" style={{ padding: 24, display: "grid", gap: 16 }}>
          <SectionHeading
            eyebrow="Instagram"
            title="A community feed that extends the brand beyond the store."
            copy="This is where your lifestyle images, reels, and community tags can live."
          />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
            {["1", "2", "3", "4"].map((item) => (
              <div key={item} className="soft-card" style={{ minHeight: 180, overflow: "hidden" }}>
                <img
                  src={`https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80&sig=${item}`}
                  alt="Instagram preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn" href="https://instagram.com" target="_blank">Follow Instagram</Link>
            <Link className="btn secondary" href="/shop">Shop now</Link>
          </div>
        </section>

        <footer className="soft-card" style={{ padding: 24, display: "grid", gap: 20 }}>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            <div>
              <strong>Giraffe Clothing</strong>
              <p className="muted">Premium everyday essentials with a clean modern identity.</p>
            </div>
            <div>
              <strong>Shop</strong>
              <p className="muted">New releases<br />Bestsellers<br />Collections<br />Gift cards</p>
            </div>
            <div>
              <strong>Connected</strong>
              <p className="muted">Instagram<br />Email updates<br />WhatsApp<br />Community</p>
            </div>
            <div>
              <strong>Policies</strong>
              <p className="muted">Privacy<br />Terms<br />Returns<br />Shipping</p>
            </div>
          </div>
          <p className="muted" style={{ margin: 0 }}>© 2026 Giraffe Clothing. Built for a polished mobile and desktop shopping experience.</p>
        </footer>
        </div>
      </main>
    </>
  );
}

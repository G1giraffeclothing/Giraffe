import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { PremiumProductCard } from "@/components/premium-product-card";
import { CategoryGrid } from "@/components/category-grid";
import { SiteHeader } from "@/components/site-header";
import { TestimonialStrip } from "@/components/testimonial-strip";
import { TrustStrip } from "@/components/trust-strip";
import { getProducts } from "@/lib/data";
import { heroSlides } from "@/lib/assets";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((product) => product.is_featured).slice(0, 4);
  const bestSellers = products.slice(0, 4);
  const campaignImage = heroSlides[2]?.desktopImage ?? heroSlides[0].desktopImage;
  const signatureImage = heroSlides[1]?.desktopImage ?? heroSlides[0].desktopImage;

  return (
    <>
      <div className="sale-bar">
        <div className="sale-track">
          <span className="sale-item">ANNIVERSARY SALE - NEW RELEASES LIVE NOW - FREE SHIPPING ABOVE RS. 999</span>
          <span className="sale-item" aria-hidden="true">ANNIVERSARY SALE - NEW RELEASES LIVE NOW - FREE SHIPPING ABOVE RS. 999</span>
        </div>
      </div>
      <SiteHeader />
      <main className="homepage">
        <HeroSlider slides={heroSlides as unknown as Parameters<typeof HeroSlider>[0]["slides"]} />

        <section className="home-section home-section--warm">
          <div className="home-section-inner">
            <div className="section-headline-row">
              <div>
                <span className="editorial-kicker">01 / New releases</span>
                <h2 className="section-title section-title-large">Shop new releases before they sell through.</h2>
              </div>
              <Link href="/shop?category=trousers" className="section-link">Shop all</Link>
            </div>
            <div className="product-rail">
              <div className="product-rail-track">
                {featured.map((product, index) => (
                  <PremiumProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-section--bleed home-section--neutral">
          <div className="home-section-inner home-section-inner--wide">
            <div className="section-headline-row section-headline-row--stack-mobile">
              <div>
                <span className="editorial-kicker">02 / Shop by category</span>
                <h2 className="section-title section-title-large">Large visual category tiles, arranged like campaign frames.</h2>
              </div>
              <Link href="/shop" className="section-link">Explore all</Link>
            </div>
            <CategoryGrid />
          </div>
        </section>

        <section className="home-campaign">
          <Image src={campaignImage} alt="Giraffe campaign" fill sizes="100vw" className="home-campaign-image" priority={false} />
          <div className="home-campaign-overlay" />
          <div className="home-campaign-copy">
            <span className="editorial-kicker">03 / Editorial break</span>
            <h2>Stand above the ordinary.</h2>
            <p>Sharp silhouettes, refined fabrics, and modern menswear designed to feel confident in every frame.</p>
            <Link href="/shop" className="btn">Shop the edit</Link>
          </div>
        </section>

        <section className="home-section home-section--warm">
          <div className="home-section-inner">
            <div className="section-headline-row">
              <div>
                <span className="editorial-kicker">04 / Best sellers</span>
                <h2 className="section-title section-title-large">Products that deserve the spotlight.</h2>
              </div>
            </div>
            <div className="product-rail">
              <div className="product-rail-track">
                {bestSellers.map((product, index) => (
                  <PremiumProductCard key={product.id} product={product} index={index} compact />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-section--split">
          <div className="home-section-inner home-section-inner--wide">
            <div className="signature-story">
              <div className="signature-story-media">
                <Image src={signatureImage} alt="Giraffe signature collection" fill sizes="(max-width: 768px) 100vw, 50vw" className="signature-story-image" />
              </div>
              <div className="signature-story-copy">
                <span className="editorial-kicker">05 / Signature collection</span>
                <h2 className="section-title section-title-large">Quiet luxury for the modern menswear wardrobe.</h2>
                <p className="section-copy">Tailored forms, clean silhouettes, and a restrained palette that feels confident in every frame. Designed to look sharp without trying too hard.</p>
                <Link href="/shop" className="btn" style={{ width: "fit-content" }}>Shop signature</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-section--neutral">
          <div className="home-section-inner home-section-inner--narrow">
            <div className="section-headline-row">
              <div>
                <span className="editorial-kicker">06 / Brand statement</span>
                <h2 className="section-title section-title-large">Made for those who stand above the ordinary.</h2>
              </div>
            </div>
            <TrustStrip />
            <div className="testimonial-band">
              <TestimonialStrip />
            </div>
          </div>
        </section>

        <section className="home-section home-section--warm">
          <div className="home-section-inner home-section-inner--wide">
            <div className="section-headline-row">
              <div>
                <span className="editorial-kicker">07 / Instagram</span>
                <h2 className="section-title section-title-large">A social layer for the brand story.</h2>
              </div>
              <Link href="https://instagram.com" target="_blank" className="section-link">Follow Instagram</Link>
            </div>
            <div className="social-strip">
              {["1", "2", "3", "4"].map((item) => (
                <div key={item} className="social-strip-item">
                  <Image
                    src={`/products/trousers/GFC-TRS-00${item === "4" ? "4" : item}/01-hanging.png`}
                    alt="Instagram preview"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="social-strip-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section home-section--neutral">
          <div className="home-section-inner home-section-inner--wide">
            <div className="about-split">
              <div className="about-split-copy">
                <span className="editorial-kicker">08 / About Giraffe</span>
                <h2 className="section-title section-title-large">Premium everyday wear with a clean modern identity.</h2>
                <p className="section-copy">We design pieces that feel sharp, wearable, and built for real life. Modern fits, thoughtful fabric choices, and a strong menswear point of view.</p>
                <Link href="/about" className="btn secondary" style={{ width: "fit-content" }}>Learn more</Link>
              </div>
              <div className="about-split-media">
                <Image src={heroSlides[0].desktopImage} alt="About Giraffe Clothing" fill sizes="(max-width: 768px) 100vw, 50vw" className="about-split-image" />
              </div>
            </div>
          </div>
        </section>

        <section className="home-section home-section--newsletter">
          <div className="home-section-inner home-section-inner--narrow">
            <div className="newsletter-band">
              <div>
                <span className="editorial-kicker">09 / Newsletter</span>
                <h2 className="section-title section-title-large">Get first access to new drops, campaign stories, and limited releases.</h2>
              </div>
              <form className="newsletter-form">
                <input className="input" type="email" placeholder="Enter your email" aria-label="Email address" />
                <button className="btn" type="button">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

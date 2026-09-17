import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { ProductRail } from "@/components/product-rail";
import { CategoryGrid } from "@/components/category-grid";
import { SiteHeader } from "@/components/site-header";
import { PromiseSection } from "@/components/promise-section";
import { getProducts } from "@/lib/data";
import { heroSlides, loyalCollection, luxeEdit, materialCards, trendingCollections } from "@/lib/assets";
import { RevealText } from "@/components/motion-system";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.filter((product) => product.is_featured).slice(0, 6);
  const bestSellers = products.slice(2, 8);

  return (
    <>
      <SiteHeader />
      <main className="homepage">
        <HeroSlider slides={heroSlides as unknown as Parameters<typeof HeroSlider>[0]["slides"]} />

        <section className="home-section home-section--light home-section--arrivals">
          <div className="home-section-inner">
            <div className="section-headline-row arrivals-heading">
              <div><h2 className="section-title section-title-large home-section-heading"><RevealText>New Arrivals</RevealText></h2></div>
              <Link href="/shop?section=new" className="section-link">Shop new</Link>
            </div>
            <ProductRail products={featured} />
          </div>
        </section>

        <section className="home-section home-section--sand home-section--categories">
          <div className="home-section-inner home-section-inner--wide">
            <div className="section-headline-row categories-heading">
              <div><h2 className="section-title section-title-large home-section-heading"><RevealText>Shop by Category</RevealText></h2></div>
              <Link href="/shop" className="section-link">View all</Link>
            </div>
            <CategoryGrid />
          </div>
        </section>

        <section className="home-feature home-feature--luxe">
          <div className="home-feature-media"><Image src={luxeEdit} alt="Giraffe Premium Luxe Collection" fill sizes="55vw" /></div>
          <div className="home-feature-copy"><h2 className="section-title"><RevealText>Giraffe Luxe Collection</RevealText></h2><Link href="/shop?collection=luxe" className="btn">Explore the Luxe Edit <span aria-hidden="true">→</span></Link></div>
        </section>

        <section className="home-section home-section--light home-section--latest">
          <div className="home-section-inner home-section-inner--wide">
            <div className="section-headline-row"><div><h2 className="section-title section-title-large"><RevealText>Trending Collections</RevealText></h2></div><Link href="/shop?section=new" className="section-link">Discover trending</Link></div>
            <div className="latest-collection-grid">
              <Link href="/shop?collection=linen" className="latest-collection-card"><Image src={trendingCollections[0]} alt="Trending linen collection" fill sizes="33vw" /></Link>
              <Link href="/shop?collection=after-hours" className="latest-collection-card"><Image src={trendingCollections[1]} alt="Trending after-hours collection" fill sizes="33vw" /></Link>
              <Link href="/shop?collection=signature" className="latest-collection-card"><Image src={trendingCollections[2]} alt="Trending signature collection" fill sizes="33vw" /></Link>
            </div>
          </div>
        </section>

        <section className="home-section home-section--materials">
          <div className="home-section-inner home-section-inner--wide">
            <div className="section-headline-row materials-heading"><div><h2 className="section-title section-title-large home-section-heading"><RevealText>The Giraffe Fabric Edit</RevealText></h2></div></div>
            <div className="materials-grid">
              <Link href="/shop?collection=tailoring" className="material-card"><Image src={materialCards[0]} alt="Modern Monochrome" fill sizes="(max-width: 768px) 100vw, 33vw" /><span>Modern Monochrome</span></Link>
              <Link href="/shop?collection=linen" className="material-card"><Image src={materialCards[1]} alt="The Linen Edit" fill sizes="(max-width: 768px) 100vw, 33vw" /><span>The Linen Edit</span></Link>
              <Link href="/shop?collection=layers" className="material-card"><Image src={materialCards[2]} alt="Weekend Tailoring" fill sizes="(max-width: 768px) 100vw, 33vw" /><span>Weekend Tailoring</span></Link>
            </div>
            <Link href="/shop?collection=essentials" className="btn materials-cta">Explore essentials <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="home-section home-section--light home-section--best-sellers">
          <div className="home-section-inner"><div className="section-headline-row"><div><h2 className="section-title section-title-large"><RevealText>Shop Best Sellers</RevealText></h2></div><Link href="/shop?section=bestsellers" className="section-link">Shop best sellers</Link></div><ProductRail products={bestSellers} /></div>
        </section>

        <section className="home-section home-section--dark home-loyalty">
          <Image className="home-loyalty-image" src={loyalCollection} alt="Giraffe Loyal Collection" fill sizes="100vw" />
          <div className="home-loyalty-overlay" aria-hidden="true" />
          <div className="home-section-inner home-section-inner--narrow"><div className="loyalty-lockup"><h2 className="section-title section-title-large"><RevealText>The Giraffe Loyal Collection</RevealText></h2><Link href="/shop?collection=loyal" className="btn">Join the circle</Link></div></div>
        </section>

        <section className="home-section home-section--about"><div className="home-section-inner home-section-inner--narrow about-lockup"><h2 className="section-title section-title-large"><RevealText>About Giraffe</RevealText></h2><Link href="/about" className="btn secondary">Our story</Link></div></section>

        <section className="home-section home-section--light home-instagram">
          <div className="home-section-inner home-section-inner--wide">
            <div className="section-headline-row"><div><h2 className="section-title section-title-large"><RevealText>Instagram</RevealText></h2></div><Link href="https://www.instagram.com/giraffeclothing.in/" target="_blank" rel="noreferrer" className="section-link">@giraffeclothing.in</Link></div>
            <div className="instagram-grid">{[...Array(12)].map((_, index) => { const slide = heroSlides[index % heroSlides.length]; return <Link href="https://www.instagram.com/giraffeclothing.in/" target="_blank" rel="noreferrer" className="instagram-tile" key={`${slide.title}-${index}`} aria-label={`Open Giraffe Clothing Instagram post ${index + 1}`}><Image src={slide.desktopImage} alt="Giraffe Clothing on Instagram" fill sizes="(max-width: 768px) 50vw, 16.66vw" /><span className="instagram-tile-overlay" aria-hidden="true">↗</span></Link>; })}</div>
          </div>
        </section>

        <PromiseSection />

        <footer className="footer-end">
          <div className="footer-end-inner footer-end-grid">
            <div><strong>Giraffe Clothing</strong><p>Modern menswear with a considered point of view.</p></div>
            <div><strong>Shop</strong><p><Link href="/shop">All products</Link><br /><Link href="/shop?section=new">New arrivals</Link><br /><Link href="/shop?section=bestsellers">Best sellers</Link></p></div>
            <div><strong>About</strong><p><Link href="/about">Our story</Link><br /><Link href="/about">Contact</Link><br /><Link href="/about">Shipping &amp; returns</Link></p></div>
            <div><strong>Stay connected</strong><p>New drops and considered essentials, delivered occasionally.</p><form className="footer-newsletter"><input type="email" placeholder="Your email address" aria-label="Email address" /><button type="button" aria-label="Subscribe">→</button></form></div>
          </div>
          <div className="footer-legal"><span>© 2026 Giraffe Clothing. All rights reserved.</span><span><Link href="/about">Privacy policy</Link> · <Link href="/about">Terms &amp; conditions</Link></span></div>
        </footer>
      </main>
    </>
  );
}

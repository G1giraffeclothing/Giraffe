import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { JournalCategoryNav } from "@/components/journal/journal-category-nav";
import { JournalCard } from "@/components/journal/journal-card";
import { StyleGuideProductRail } from "@/components/journal/style-guide-product-rail";
import { getJournalArticlesByCategory } from "@/lib/journal";
import { getProducts } from "@/lib/data";
import { materialCards } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Style Guides | The Journal | Giraffe Clothing",
  description: "Considered guides to menswear, fit, fabric and styling from Giraffe Clothing.",
  alternates: { canonical: "/journal/style-guides" },
};

export default async function StyleGuidesPage() {
  const articles = getJournalArticlesByCategory("style-guides");
  const [featured, ...library] = articles;
  const products = (await getProducts()).filter((product) => product.category.toLowerCase().includes("trouser") || product.category.toLowerCase().includes("bottom")).slice(0, 4);

  return (
    <>
      <SiteHeader />
      <main className="style-guides-page">
        <div className="style-guides-inner">
          <header className="style-guides-intro">
            <div><p className="journal-kicker">The Giraffe Journal</p><h1>Style Guides</h1></div>
            <p>A considered approach to dressing well—proportions, fabrics, colour, fit and the details that make everyday menswear feel effortless.</p>
          </header>

          <JournalCategoryNav active="style-guides" />

          {featured && <section className="style-guide-feature" aria-labelledby="style-guide-feature-title">
            <Link href={`/journal/${featured.category}/${featured.slug}`} className="style-guide-feature-media"><Image src={featured.heroImage} alt={featured.title} fill priority sizes="(max-width: 768px) 100vw, 63vw" /></Link>
            <div className="style-guide-feature-copy"><p className="journal-kicker">Style Guide · Featured</p><h2 id="style-guide-feature-title">{featured.title}</h2><p>{featured.excerpt}</p><Link href={`/journal/${featured.category}/${featured.slug}`} className="journal-text-link">Read guide <span aria-hidden="true">→</span></Link></div>
          </section>}

          <section className="style-principles" aria-labelledby="principles-title">
            <div className="style-principles-heading"><p className="journal-kicker">A point of view</p><h2 id="principles-title">The Giraffe Principles</h2></div>
            <div className="style-principles-list">
              <article><span>01</span><div><h3>Fit Before Everything</h3><p>Good clothing begins with proportion.</p></div></article>
              <article><span>02</span><div><h3>Fabric Matters</h3><p>Texture, weight and breathability determine how a garment feels and falls.</p></div></article>
              <article><span>03</span><div><h3>Buy With Intention</h3><p>Build around versatile pieces rather than temporary trends.</p></div></article>
              <article><span>04</span><div><h3>Details Create Character</h3><p>Collars, pleats, buttons and finishes elevate essentials.</p></div></article>
            </div>
          </section>

          <section className="style-guide-library" aria-labelledby="style-guide-library-title">
            <div className="style-guide-section-heading"><div><p className="journal-kicker">The dressing library</p><h2 id="style-guide-library-title">Essential Guides</h2></div><p>Practical notes for making better decisions about the clothes you wear most.</p></div>
            <div className="style-guide-grid">{library.map((article) => <JournalCard key={article.slug} article={article} size="standard" />)}</div>
          </section>

          <section className="style-guide-texture-break" aria-label="Style guide introduction">
            <div><p className="journal-kicker">The considered wardrobe</p><h2>Clarity in the details.</h2><p>Start with what you need to know, then let the right pieces do the work.</p></div>
            <Image src={materialCards[2]} alt="Warm neutral fabric texture" width={900} height={1100} sizes="(max-width: 768px) 100vw, 38vw" />
          </section>

          <StyleGuideProductRail products={products} />
        </div>
      </main>
    </>
  );
}

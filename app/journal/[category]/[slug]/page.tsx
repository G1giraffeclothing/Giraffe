import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ArticleBody } from "@/components/journal/article-body";
import { RelatedArticles } from "@/components/journal/related-articles";
import { StyleGuideProductRail } from "@/components/journal/style-guide-product-rail";
import { getJournalArticle, getRelatedJournalArticles, journalArticles, journalCategoryLabels } from "@/lib/journal";
import { getProducts } from "@/lib/data";

type ArticleRouteProps = { params: Promise<{ category: string; slug: string }> };

export function generateStaticParams() {
  return journalArticles.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | The Journal | Giraffe Clothing`,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.category}/${article.slug}` },
    openGraph: { title: article.title, description: article.excerpt, type: "article", images: [{ url: typeof article.heroImage === "string" ? article.heroImage : article.heroImage.src }] },
  };
}

export default async function JournalArticlePage({ params }: ArticleRouteProps) {
  const { category, slug } = await params;
  const article = getJournalArticle(slug);
  if (!article || article.category !== category) notFound();
  const related = getRelatedJournalArticles(article);
  const products = article.category === "style-guides" ? (await getProducts()).filter((product) => product.category.toLowerCase().includes("trouser") || product.category.toLowerCase().includes("bottom")).slice(0, 3) : [];

  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <article>
          <header className="article-hero">
            <div className="article-hero-copy">
              <Link href={`/journal/${article.category}`} className="article-back">← {journalCategoryLabels[article.category]}</Link>
              <p className="journal-kicker">{journalCategoryLabels[article.category]}</p>
              <h1>{article.title}</h1>
              <p className="article-hero-excerpt">{article.excerpt}</p>
              <div className="article-meta"><span>{article.date}</span><span>{article.readTime}</span></div>
            </div>
            <figure className="article-hero-media"><Image src={article.heroImage} alt={article.title} fill priority sizes="(max-width: 768px) 100vw, 78vw" /></figure>
          </header>
          <ArticleBody article={article} />
        </article>
        <RelatedArticles articles={related.length >= 3 ? related : journalArticles.filter((candidate) => candidate.slug !== article.slug)} />
        {article.category === "style-guides" ? <StyleGuideProductRail products={products} title="Shop the edit" /> : <section className="article-collection-cta"><p className="journal-kicker">The Giraffe wardrobe</p><h2>Considered pieces for everyday distinction.</h2><Link href="/shop" className="journal-text-link">Explore the collection <span aria-hidden="true">→</span></Link></section>}
      </main>
    </>
  );
}

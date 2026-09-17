import { JournalCategoryNav } from "@/components/journal/journal-category-nav";
import { FeaturedJournalCard } from "@/components/journal/journal-card";
import { JournalGrid } from "@/components/journal/journal-grid";
import { getJournalArticlesByCategory, getJournalArticle, journalCategoryLabels, type JournalCategory } from "@/lib/journal";

export function JournalLanding({ category = "all" }: { category?: JournalCategory | "all" }) {
  const articles = getJournalArticlesByCategory(category);
  const hero = articles.find((article) => article.featured) ?? articles[0] ?? getJournalArticle("the-quiet-art-of-dressing-well")!;
  const gridArticles = articles.filter((article) => article.slug !== hero.slug);
  const isCategory = category !== "all";

  return (
    <main className="journal-page">
      <div className="journal-page-inner">
        <div className="journal-page-intro">
          <p className="journal-kicker">A considered point of view</p>
          <h1>{isCategory ? journalCategoryLabels[category] : "The Journal"}</h1>
          <p>{isCategory ? `A quieter edit of ${journalCategoryLabels[category].toLowerCase()}—made for dressing with more ease, intention and confidence.` : "Notes on modern menswear, fabric, fit and the quiet details that make a wardrobe feel like your own."}</p>
        </div>
        <FeaturedJournalCard article={hero} />
        <JournalCategoryNav active={category} />
        <section className="journal-library" aria-labelledby="journal-library-title">
          <div className="journal-library-heading"><p className="journal-kicker">From the journal</p><h2 id="journal-library-title">{isCategory ? "Stories worth returning to" : "Stories worth returning to"}</h2></div>
          {gridArticles.length ? <JournalGrid articles={gridArticles} /> : <p className="journal-empty">More stories from this edit are coming soon.</p>}
        </section>
      </div>
    </main>
  );
}

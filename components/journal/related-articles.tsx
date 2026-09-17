import Link from "next/link";
import { JournalCard } from "@/components/journal/journal-card";
import type { JournalArticle } from "@/lib/journal";

export function RelatedArticles({ articles }: { articles: JournalArticle[] }) {
  return (
    <section className="related-journal" aria-labelledby="related-journal-title">
      <div className="related-journal-heading"><p className="journal-kicker">Keep reading</p><h2 id="related-journal-title">Continue Reading</h2><Link href="/journal" className="journal-text-link">View all journal <span aria-hidden="true">→</span></Link></div>
      <div className="related-journal-grid">{articles.slice(0, 3).map((article) => <JournalCard key={article.slug} article={article} size="standard" />)}</div>
    </section>
  );
}

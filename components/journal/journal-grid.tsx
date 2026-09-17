import type { JournalArticle } from "@/lib/journal";
import { JournalCard } from "@/components/journal/journal-card";

export function JournalGrid({ articles }: { articles: JournalArticle[] }) {
  return (
    <div className="journal-grid">
      {articles.map((article, index) => (
        <JournalCard key={article.slug} article={article} size={index === 0 ? "feature" : index === 3 ? "landscape" : "standard"} />
      ))}
    </div>
  );
}

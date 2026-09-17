import Image from "next/image";
import Link from "next/link";
import type { JournalArticle } from "@/lib/journal";

export function JournalHero({ article }: { article: JournalArticle }) {
  return (
    <section className="journal-hero" aria-labelledby="journal-hero-title">
      <div className="journal-hero-media">
        <Image src={article.heroImage} alt={article.title} fill priority sizes="(max-width: 768px) 100vw, 68vw" />
      </div>
      <div className="journal-hero-copy">
        <p className="journal-kicker">The Giraffe Journal</p>
        <p className="journal-category-label">{article.category.replaceAll("-", " ")}</p>
        <h1 id="journal-hero-title">{article.title}</h1>
        <p className="journal-hero-excerpt">{article.excerpt}</p>
        <Link href={`/journal/${article.category}/${article.slug}`} className="journal-text-link">Read story <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}

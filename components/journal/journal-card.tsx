import Image from "next/image";
import Link from "next/link";
import type { JournalArticle } from "@/lib/journal";

export function JournalCard({ article, size = "standard" }: { article: JournalArticle; size?: "feature" | "standard" | "landscape" }) {
  return (
    <article className={`journal-card journal-card--${size}`}>
      <Link href={`/journal/${article.category}/${article.slug}`} className="journal-card-link">
        <figure className="journal-card-media">
          <Image src={article.cardImage} alt={article.title} fill sizes={size === "feature" ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 31vw"} />
        </figure>
        <div className="journal-card-copy">
          <div className="journal-card-meta"><span>{article.category.replaceAll("-", " ")}</span><span>{article.readTime}</span></div>
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <span className="journal-read-more">Read more <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedJournalCard({ article }: { article: JournalArticle }) {
  return (
    <article className="journal-feature-card">
      <Link href={`/journal/${article.category}/${article.slug}`} className="journal-feature-card-link">
        <figure className="journal-feature-card-media">
          <Image src={article.heroImage} alt={article.title} fill sizes="(max-width: 768px) 100vw, 68vw" />
        </figure>
        <div className="journal-feature-card-copy">
          <div className="journal-card-meta"><span>{article.category.replaceAll("-", " ")}</span><span>{article.date}</span></div>
          <h2>{article.title}</h2>
          <p>{article.excerpt}</p>
          <span className="journal-read-more">Read story <span aria-hidden="true">→</span></span>
        </div>
      </Link>
    </article>
  );
}

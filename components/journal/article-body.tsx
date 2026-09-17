import Image from "next/image";
import type { JournalArticle, JournalSection } from "@/lib/journal";

export function ArticleBody({ article }: { article: JournalArticle }) {
  return (
    <div className="article-body">
      {article.content.map((section, index) => <ArticleSection key={`${section.type}-${index}`} section={section} />)}
    </div>
  );
}

function ArticleSection({ section }: { section: JournalSection }) {
  if (section.type === "paragraph") return <p>{section.text}</p>;
  if (section.type === "heading") return <h2>{section.text}</h2>;
  if (section.type === "quote") return <blockquote>“{section.text}”</blockquote>;
  if (section.type === "image") {
    return <figure className="article-body-image"><Image src={section.src} alt={section.alt} sizes="(max-width: 768px) 100vw, 860px" /><figcaption>{section.caption}</figcaption></figure>;
  }
  return (
    <div className="article-body-split">
      <div><h2>{section.title}</h2><p>{section.text}</p></div>
      <figure><Image src={section.src} alt={section.alt} sizes="(max-width: 768px) 100vw, 420px" /></figure>
    </div>
  );
}

import Link from "next/link";
import type { JournalCategory } from "@/lib/journal";
import { journalCategories } from "@/lib/journal";

export function JournalCategoryNav({ active }: { active?: JournalCategory | "all" }) {
  return (
    <nav className="journal-category-nav" aria-label="Journal categories">
      <Link href="/journal" aria-current={!active || active === "all" ? "page" : undefined} className={!active || active === "all" ? "is-active" : ""}>All Journal</Link>
      {journalCategories.map((category) => (
        <Link key={category.slug} href={`/journal/${category.slug}`} aria-current={active === category.slug ? "page" : undefined} className={active === category.slug ? "is-active" : ""}>
          {category.label}
        </Link>
      ))}
    </nav>
  );
}

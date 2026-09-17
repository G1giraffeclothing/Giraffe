import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { JournalLanding } from "@/components/journal/journal-landing";
import { journalCategoryLabels, type JournalCategory } from "@/lib/journal";

type CategoryRouteProps = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: CategoryRouteProps): Promise<Metadata> {
  const { category } = await params;
  if (!(category in journalCategoryLabels)) return {};
  const label = journalCategoryLabels[category as JournalCategory];
  return { title: `${label} | The Journal | Giraffe Clothing`, description: `Considered ${label.toLowerCase()} from Giraffe Clothing.` };
}

export default async function JournalCategoryPage({ params }: CategoryRouteProps) {
  const { category } = await params;
  if (!(category in journalCategoryLabels)) notFound();
  return <><SiteHeader /><JournalLanding category={category as JournalCategory} /></>;
}

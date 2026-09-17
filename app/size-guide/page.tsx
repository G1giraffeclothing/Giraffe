import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SizeGuideExplorer } from "@/components/size-guide/size-guide-explorer";

export const metadata: Metadata = {
  title: "Size Guide | Giraffe Clothing",
  description: "Find your ideal Giraffe Clothing fit with our measurement, fit and size guide.",
  alternates: { canonical: "/size-guide" },
  openGraph: { title: "Size Guide | Giraffe Clothing", description: "Find your ideal Giraffe Clothing fit with our measurement, fit and size guide." },
};

export default function SizeGuidePage() {
  return <><SiteHeader /><main><SizeGuideExplorer /></main></>;
}

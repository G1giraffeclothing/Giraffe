import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { JournalLanding } from "@/components/journal/journal-landing";

export const metadata: Metadata = {
  title: "The Journal | Giraffe Clothing",
  description: "A considered journal of menswear, fabric, fit and the art of dressing well from Giraffe Clothing.",
};

export default function JournalPage() {
  return (
    <>
      <SiteHeader />
      <JournalLanding />
    </>
  );
}

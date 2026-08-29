import type { Metadata } from "next";
import "./globals.css";
import { SiteMotion } from "@/components/site-motion";

export const metadata: Metadata = {
  title: "Giraffe Clothing",
  description: "MVP e-commerce store built with Next.js, Supabase, Clerk, and Upstash Redis.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteMotion />
        {children}
      </body>
    </html>
  );
}

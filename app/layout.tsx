import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SiteMotion } from "@/components/site-motion";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Giraffe Clothing",
  description: "MVP e-commerce store built with Next.js, Supabase, Clerk, and Upstash Redis.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <SiteMotion />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Giraffe Clothing",
  description: "MVP e-commerce store built with Next.js, Supabase, Clerk, and Upstash Redis.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import { SiteHeader } from "@/components/site-header";

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container shell">
        <section className="soft-card" style={{ padding: 24 }}>
          <h1 style={{ marginTop: 0 }}>Checkout</h1>
          <p className="muted">Guest checkout placeholder. Next step is to connect a payment provider and write orders to Supabase.</p>
        </section>
      </main>
    </>
  );
}

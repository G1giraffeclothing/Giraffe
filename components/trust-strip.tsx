const items = [
  "Free shipping over Rs. 999",
  "Easy returns",
  "Premium fabrics",
  "Secure checkout",
];

export function TrustStrip() {
  return (
    <div className="soft-card" style={{ padding: 18 }}>
      <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        {items.map((item) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--accent)" }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

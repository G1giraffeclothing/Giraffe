const items = [
  "Free shipping over Rs. 999",
  "Easy returns",
  "Premium fabrics",
  "Secure checkout",
];

export function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-strip-grid">
        {items.map((item) => (
          <div key={item} className="trust-strip-item">
            <span style={{ width: 10, height: 10, borderRadius: 999, background: "var(--accent)" }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "The fit feels premium and the styling is effortless.",
    name: "Aarav",
  },
  {
    quote: "Clean fabric, clean cuts, and the site feels polished.",
    name: "Nitika",
  },
  {
    quote: "Perfect for everyday wear without looking basic.",
    name: "Rohan",
  },
];

export function TestimonialStrip() {
  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {testimonials.map((item) => (
        <div key={item.name} className="soft-card" style={{ padding: 20 }}>
          <p style={{ marginTop: 0, lineHeight: 1.7 }}>"{item.quote}"</p>
          <strong>{item.name}</strong>
        </div>
      ))}
    </div>
  );
}

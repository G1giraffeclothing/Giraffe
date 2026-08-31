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
    <div className="testimonial-strip">
      {testimonials.map((item) => (
        <div key={item.name} className="testimonial-strip-item">
          <p style={{ marginTop: 0, lineHeight: 1.7 }}>"{item.quote}"</p>
          <strong>{item.name}</strong>
        </div>
      ))}
    </div>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy: string;
};

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
  return (
    <div style={{ display: "grid", gap: 10, marginBottom: 22 }}>
      <span className="pill" style={{ width: "fit-content" }}>{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

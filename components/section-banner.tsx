import Link from "next/link";
import Image from "next/image";

export function SectionBanner({
  title,
  copy,
  href,
  cta,
  image,
  reverse = false,
}: {
  title: string;
  copy: string;
  href: string;
  cta: string;
  image: string;
  reverse?: boolean;
}) {
  return (
    <section className="soft-card banner-card" style={{ padding: 18 }}>
      <div className={`banner-grid ${reverse ? "reverse" : ""}`}>
        <div className="banner-copy">
          <span className="pill" style={{ width: "fit-content" }}>Curated edit</span>
          <h3 className="banner-title">{title}</h3>
          <p className="section-copy">{copy}</p>
          <Link href={href} className="btn" style={{ width: "fit-content" }}>{cta}</Link>
        </div>
        <div className="banner-image-wrap">
          <Image src={image} alt={title} className="banner-image" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}

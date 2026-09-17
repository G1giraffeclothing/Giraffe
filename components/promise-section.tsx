"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { brandLogo, easyReturn, madeWithCare, panIndiaDelivery, premiumFabrics } from "@/lib/assets";

type PromiseItem = {
  number: string;
  title: string;
  description: string[];
  image: StaticImageData | string;
  alt: string;
};

const promiseItems: PromiseItem[] = [
  {
    number: "01",
    title: "Premium Fabrics",
    description: ["Selected for exceptional", "feel, comfort and finish."],
    image: premiumFabrics,
    alt: "Close detail of premium linen and wool fabrics",
  },
  {
    number: "02",
    title: "Made With Care",
    description: ["Attention to fabric,", "fit and finishing."],
    image: madeWithCare,
    alt: "A finely finished Giraffe garment",
  },
  {
    number: "03",
    title: "Easy Returns",
    description: ["Simple and", "straightforward returns."],
    image: easyReturn,
    alt: "Giraffe easy returns packaging detail",
  },
  {
    number: "04",
    title: "Pan-India Delivery",
    description: ["Carefully packed and", "delivered across India."],
    image: panIndiaDelivery,
    alt: "Giraffe package ready for Pan-India delivery",
  },
];

export function PromiseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`promise-section ${visible ? "is-visible" : ""}`.trim()}
      aria-labelledby="promise-title"
    >
      <span className="promise-corner promise-corner--left" aria-hidden="true" />
      <span className="promise-corner promise-corner--right" aria-hidden="true" />
      <div className="promise-section-inner">
        <div className="promise-intro">
          <div className="promise-eyebrow"><span /> <span>Why Giraffe</span> <span /></div>
          <h2 id="promise-title">The Giraffe Promise</h2>
          <p>Clothing made to feel exceptional.<br />Quality you can see, comfort you can live in.</p>
        </div>

        <div className="promise-grid">
          {promiseItems.map((item, index) => (
            <article className={`promise-item ${index === 0 ? "promise-item--featured" : ""}`.trim()} style={{ "--promise-delay": `${index * 120 + 180}ms` } as CSSProperties} key={item.number}>
              <span className="promise-number">{item.number}</span>
              <div className="promise-arch">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 700px) 42vw, (max-width: 1024px) 35vw, 220px" />
                {index === 0 && <span className="promise-image-label">Selected materials</span>}
              </div>
              <h3>{item.title}</h3>
              <span className="promise-accent" aria-hidden="true" />
              <p>{item.description.map((line) => <span key={line}>{line}</span>)}</p>
            </article>
          ))}
        </div>

        <div className="promise-signature">
          <div className="promise-rule"><span /><Image src={brandLogo} alt="Giraffe" /><span /></div>
          <p>Considered clothing. Made for everyday distinction.</p>
          <Link className="promise-story-button" href="/about">Our story <span aria-hidden="true">→</span></Link>
        </div>

        <div className="promise-micro promise-micro--left" aria-hidden="true">Clothing<br />with purpose</div>
        <div className="promise-micro promise-micro--right" aria-hidden="true">A better<br />everyday</div>
      </div>
    </section>
  );
}

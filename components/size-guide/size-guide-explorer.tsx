"use client";

import Image from "next/image";
import { useState } from "react";
import { fitTypes, measurementGuides, sizeGuideCategoryLabels, sizeGuideTables, type SizeGuideCategory } from "@/lib/size-guide";
import { SizeGuideTable } from "@/components/size-guide/size-guide-table";

const categories = Object.keys(sizeGuideCategoryLabels) as SizeGuideCategory[];

export function SizeGuideExplorer() {
  const [category, setCategory] = useState<SizeGuideCategory>("shirts-polos");
  const table = sizeGuideTables[category];

  return (
    <div className="size-guide-page">
      <section className="size-guide-hero">
        <div className="size-guide-hero-copy"><p className="size-guide-eyebrow">Giraffe fit guide</p><h1>Find Your Ideal Fit</h1><p>Use the measurements below to choose the size that feels right for you. Our fits are designed to feel refined, comfortable and easy to wear.</p></div>
        <figure className="size-guide-hero-image"><Image src={fitTypes[1].image} alt="South Indian male model in a refined neutral Giraffe outfit" fill priority sizes="(max-width: 768px) 100vw, 48vw" /></figure>
      </section>

      <section className="size-guide-section size-guide-tables" aria-labelledby="size-guide-table-title">
        <div className="size-guide-section-heading"><p className="size-guide-eyebrow">Choose your category</p><h2 id="size-guide-table-title">Your measurements</h2></div>
        <div className="size-guide-tabs" role="tablist" aria-label="Size categories">{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} className={category === item ? "is-active" : ""} onClick={() => setCategory(item)}>{sizeGuideCategoryLabels[item]}</button>)}</div>
        <SizeGuideTable table={table} />
      </section>

      <section className="size-guide-section measurement-section" aria-labelledby="measure-title">
        <div className="size-guide-section-heading"><p className="size-guide-eyebrow">A simple starting point</p><h2 id="measure-title">How to Measure</h2><p>Take your measurements over light clothing, keeping the tape close to the body without pulling it tight.</p></div>
        <div className="measurement-layout"><div className="measurement-figure" aria-label="Placeholder for a premium garment measurement illustration"><span className="measurement-figure-label">Illustration placeholder</span><div className="measurement-silhouette" /><i className="measurement-line measurement-line--chest" /><i className="measurement-line measurement-line--waist" /><i className="measurement-line measurement-line--inseam" /></div><div className="measurement-list">{measurementGuides.map((item) => <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div>
      </section>

      <section className="size-guide-section fit-section" aria-labelledby="fit-title"><div className="size-guide-section-heading"><p className="size-guide-eyebrow">Know the silhouette</p><h2 id="fit-title">Understanding the Fit</h2></div><div className="fit-grid">{fitTypes.map((fit) => <article className="fit-card" key={fit.title}><div className="fit-card-image"><Image src={fit.image} alt={`${fit.title} silhouette reference`} fill sizes="(max-width: 768px) 90vw, 30vw" /></div><div><h3>{fit.title}</h3><p>{fit.text}</p></div></article>)}</div></section>

      <section className="size-guide-between"><div><p className="size-guide-eyebrow">A considered choice</p><h2>Between Two Sizes?</h2><p>Choose the smaller size for a sharper fit, or size up for a more relaxed silhouette.</p></div><a href="/about" className="size-guide-contact">Need help choosing? Contact us <span aria-hidden="true">→</span></a></section>
    </div>
  );
}

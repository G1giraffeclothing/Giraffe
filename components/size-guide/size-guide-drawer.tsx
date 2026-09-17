"use client";

import { useState } from "react";
import { getSizeGuideCategory, sizeGuideCategoryLabels, sizeGuideTables, type SizeGuideCategory } from "@/lib/size-guide";
import { SizeGuideTable } from "@/components/size-guide/size-guide-table";

export function SizeGuideDrawer({ category = "shirts-polos" }: { category?: SizeGuideCategory | string }) {
  const [open, setOpen] = useState(false);
  const resolvedCategory = getSizeGuideCategory(category);
  const table = sizeGuideTables[resolvedCategory];

  return (
    <>
      <button type="button" className="size-guide-trigger" onClick={() => setOpen(true)}>Size guide <span aria-hidden="true">↗</span></button>
      {open ? <div className="size-guide-drawer-layer" role="presentation" onClick={() => setOpen(false)}>
        <aside className="size-guide-drawer" role="dialog" aria-modal="true" aria-labelledby="size-guide-drawer-title" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="size-guide-drawer-close" aria-label="Close size guide" onClick={() => setOpen(false)}>×</button>
          <p className="size-guide-eyebrow">Giraffe fit guide</p>
          <h2 id="size-guide-drawer-title">{sizeGuideCategoryLabels[resolvedCategory]}</h2>
          <p className="size-guide-drawer-copy">Use the measurements below to choose the size that feels right for you.</p>
          <SizeGuideTable table={table} />
          <a href="/size-guide" className="size-guide-drawer-link" onClick={() => setOpen(false)}>Full size guide <span aria-hidden="true">→</span></a>
        </aside>
      </div> : null}
    </>
  );
}

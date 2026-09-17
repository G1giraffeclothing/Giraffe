"use client";

import { useMemo, useState } from "react";
import type { SizeGuideTable as SizeGuideTableData, SizeGuideUnit } from "@/lib/size-guide";

const cmToInches = (value: string) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? (numeric / 2.54).toFixed(1) : value;
};

export function SizeGuideTable({ table, showToggle = true }: { table: SizeGuideTableData; showToggle?: boolean }) {
  const [unit, setUnit] = useState<SizeGuideUnit>("cm");
  const displayedColumns = useMemo(() => table.columns.map((column) => ({ ...column, unit: column.unit && unit })), [table.columns, unit]);

  return (
    <div className="size-guide-table-wrap">
      {showToggle ? <div className="size-guide-unit-toggle" aria-label="Measurement unit"><span>Measurements</span><div role="group"><button type="button" className={unit === "cm" ? "is-active" : ""} onClick={() => setUnit("cm")}>CM</button><button type="button" className={unit === "in" ? "is-active" : ""} onClick={() => setUnit("in")}>INCHES</button></div></div> : null}
      <div className="size-guide-scroll">
        <table className="size-guide-table">
          <thead><tr>{displayedColumns.map((column) => <th key={column.key} scope="col">{column.label}{column.unit ? <small>({column.unit})</small> : null}</th>)}</tr></thead>
          <tbody>{table.rows.map((row) => <tr key={row.size}>{displayedColumns.map((column) => <td key={column.key}>{column.unit === "in" ? cmToInches(row[column.key]) : row[column.key]}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <p className="size-guide-table-note">{table.note}</p>
    </div>
  );
}

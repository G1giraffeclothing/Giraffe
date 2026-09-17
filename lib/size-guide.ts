import type { JournalImage } from "@/lib/journal";
import { heroSlides } from "@/lib/assets";

export type SizeGuideCategory = "shirts-polos" | "trousers" | "joggers" | "outerwear";
export type SizeGuideUnit = "cm" | "in";

export type SizeGuideColumn = { key: string; label: string; unit?: string };
export type SizeGuideRow = Record<string, string>;

export type SizeGuideTable = {
  category: SizeGuideCategory;
  label: string;
  columns: SizeGuideColumn[];
  rows: SizeGuideRow[];
  note: string;
};

const placeholder = "—";

export const sizeGuideCategoryLabels: Record<SizeGuideCategory, string> = {
  "shirts-polos": "Shirts & Polos",
  trousers: "Trousers",
  joggers: "Joggers",
  outerwear: "Outerwear",
};

export const sizeGuideTables: Record<SizeGuideCategory, SizeGuideTable> = {
  "shirts-polos": {
    category: "shirts-polos",
    label: "Shirts & Polos",
    columns: [
      { key: "size", label: "Size" },
      { key: "chest", label: "Chest", unit: "cm" },
      { key: "shoulder", label: "Shoulder", unit: "cm" },
      { key: "length", label: "Length", unit: "cm" },
      { key: "sleeve", label: "Sleeve", unit: "cm" },
    ],
    rows: ["XS", "S", "M", "L", "XL", "XXL"].map((size) => ({ size, chest: placeholder, shoulder: placeholder, length: placeholder, sleeve: placeholder })),
    note: "Shirt and polo measurements will be added from the final garment spec. Dashes are placeholders for now.",
  },
  trousers: {
    category: "trousers",
    label: "Trousers",
    columns: [
      { key: "size", label: "Waist size" },
      { key: "waist", label: "Waist", unit: "cm" },
      { key: "hip", label: "Hip", unit: "cm" },
      { key: "thigh", label: "Thigh", unit: "cm" },
      { key: "frontRise", label: "Front rise", unit: "cm" },
      { key: "inseam", label: "Inseam", unit: "cm" },
      { key: "outseam", label: "Outseam", unit: "cm" },
    ],
    rows: ["28", "30", "32", "34", "36", "38", "40"].map((size) => ({ size, waist: placeholder, hip: placeholder, thigh: placeholder, frontRise: placeholder, inseam: placeholder, outseam: placeholder })),
    note: "Trouser measurements will be added from the final garment spec. Waist sizes shown are the available size references.",
  },
  joggers: {
    category: "joggers",
    label: "Joggers",
    columns: [
      { key: "size", label: "Size" },
      { key: "waist", label: "Waist", unit: "cm" },
      { key: "hip", label: "Hip", unit: "cm" },
      { key: "thigh", label: "Thigh", unit: "cm" },
      { key: "inseam", label: "Inseam", unit: "cm" },
      { key: "outseam", label: "Outseam", unit: "cm" },
    ],
    rows: ["XS", "S", "M", "L", "XL", "XXL"].map((size) => ({ size, waist: placeholder, hip: placeholder, thigh: placeholder, inseam: placeholder, outseam: placeholder })),
    note: "Jogger measurements will be added from the final garment spec. Dashes are placeholders for now.",
  },
  outerwear: {
    category: "outerwear",
    label: "Outerwear",
    columns: [
      { key: "size", label: "Size" },
      { key: "chest", label: "Chest", unit: "cm" },
      { key: "shoulder", label: "Shoulder", unit: "cm" },
      { key: "length", label: "Length", unit: "cm" },
      { key: "sleeve", label: "Sleeve", unit: "cm" },
    ],
    rows: ["S", "M", "L", "XL", "XXL"].map((size) => ({ size, chest: placeholder, shoulder: placeholder, length: placeholder, sleeve: placeholder })),
    note: "Outerwear measurements will be added from the final garment spec. Dashes are placeholders for now.",
  },
};

export const measurementGuides = [
  { number: "01", title: "Chest", text: "Measure around the fullest part of your chest, keeping the tape level." },
  { number: "02", title: "Shoulder", text: "Measure from shoulder point to shoulder point across the back." },
  { number: "03", title: "Waist", text: "Measure around the natural waist without pulling the tape too tightly." },
  { number: "04", title: "Hip", text: "Measure around the fullest part of the hip." },
  { number: "05", title: "Inseam", text: "Measure from the crotch seam to the bottom hem." },
];

export const fitTypes = [
  { title: "Slim Fit", text: "Close to the body with a clean, sharper silhouette.", image: heroSlides[2].desktopImage },
  { title: "Regular Fit", text: "Balanced proportions with comfortable everyday room.", image: heroSlides[0].desktopImage },
  { title: "Relaxed Fit", text: "More ease through the body for a softer, contemporary silhouette.", image: heroSlides[1].desktopImage },
] as { title: string; text: string; image: JournalImage }[];

export function getSizeGuideCategory(value?: string | null): SizeGuideCategory {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("trouser") || normalized.includes("pant")) return "trousers";
  if (normalized.includes("jogger")) return "joggers";
  if (normalized.includes("outer") || normalized.includes("jacket") || normalized.includes("layer")) return "outerwear";
  return "shirts-polos";
}

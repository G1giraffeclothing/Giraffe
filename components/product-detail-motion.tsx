"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const parent = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } } };
const child = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.44, ease } } };

export function ProductDetailMotion({ gallery, info }: { gallery: ReactNode; info: ReactNode }) {
  return (
    <motion.section className="card product-detail-motion" style={{ padding: 24, display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }} variants={parent} initial="hidden" animate="visible">
      <motion.div variants={child} style={{ display: "grid", gap: 14 }}>{gallery}</motion.div>
      <motion.div variants={parent} style={{ display: "grid", alignContent: "start", gap: 14 }}>{info}</motion.div>
    </motion.section>
  );
}

export function ProductDetailItem({ children }: { children: ReactNode }) {
  return <motion.div variants={child}>{children}</motion.div>;
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const luxuryEase = [0.16, 1, 0.3, 1] as const;
export const motionTiming = {
  micro: 0.2,
  standard: 0.38,
  editorial: 0.78,
};

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: motionTiming.standard, ease: luxuryEase } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

export function MotionSection({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className={`motion-reveal-text ${className}`.trim()}>
      <motion.span
        className="motion-reveal-text__inner"
        initial={{ y: reduced ? 0 : "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reduced ? 0.01 : motionTiming.editorial, delay, ease: luxuryEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function MotionButton({ children, className = "btn", ...props }: React.ComponentProps<typeof motion.button>) {
  return (
    <motion.button
      className={className}
      whileHover={{ y: -1, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: motionTiming.micro, ease: luxuryEase }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function MotionLink({ children, className = "btn", ...props }: React.ComponentProps<typeof motion.a>) {
  return (
    <motion.a
      className={className}
      whileHover={{ y: -1, scale: 1.012 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: motionTiming.micro, ease: luxuryEase }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

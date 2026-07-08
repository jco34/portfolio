"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, fadeIn } from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "section";
};

export function Reveal({ children, variants, className, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = as === "section" ? motion.section : motion.div;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={shouldReduceMotion ? fadeIn : (variants ?? fadeUp)}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

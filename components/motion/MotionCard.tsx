"use client";

import { motion, useReducedMotion } from "motion/react";
import { scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function MotionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : scaleIn}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type GlassButtonProps = {
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Render a plain anchor (with the download attribute) instead of a
   * prefetching next/link. Use for static file downloads like the resume. */
  download?: boolean;
  children: React.ReactNode;
};

const glassClasses = cn(
  "inline-flex items-center justify-center gap-2 rounded-pill px-4 py-3",
  "bg-white/10 text-fg text-sm outline outline-1 -outline-offset-1 outline-white/20",
  "shadow-[0_3px_4px_rgba(255,255,255,0.15)_inset,0_-3px_4px_rgba(255,255,255,0.15)_inset]",
  "backdrop-blur-[10px]",
  "disabled:opacity-50 disabled:pointer-events-none",
);

const MotionLink = motion.create(Link);

export function GlassButton({
  href,
  onClick,
  icon,
  className,
  type = "button",
  disabled,
  download,
  children,
}: GlassButtonProps) {
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href && download) {
    return (
      <motion.a
        href={href}
        download
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(glassClasses, className)}
      >
        {content}
      </motion.a>
    );
  }

  if (href) {
    return (
      <MotionLink
        href={href}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={cn(glassClasses, className)}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(glassClasses, className)}
    >
      {content}
    </motion.button>
  );
}

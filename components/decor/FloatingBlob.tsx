"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { Blob } from "@/components/decor/Blob";
import type { ComponentProps } from "react";

type FloatingBlobProps = ComponentProps<typeof Blob> & {
  duration?: number;
  drift?: number;
  opacity?: number;
  /** How close (px) the cursor must get before this blob starts fleeing. */
  repelRadius?: number;
  /** Multiplier on the push distance; 1 shoves the blob most of a radius away. */
  repelStrength?: number;
};

export function FloatingBlob({
  duration = 8,
  drift = 14,
  opacity,
  repelRadius = 240,
  repelStrength = 1,
  ...blobProps
}: FloatingBlobProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Raw cursor-repel offset. A spring smooths it so the blob glides away and
  // eases back to rest (0,0) instead of snapping to the pointer.
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 140, damping: 14, mass: 0.7 });
  const springY = useSpring(y, { stiffness: 140, damping: 14, mass: 0.7 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // The rect already includes the current repel transform, so back it out
      // to recover the blob's resting center — otherwise the push feeds on
      // itself as the blob moves.
      const baseCx = rect.left + rect.width / 2 - springX.get();
      const baseCy = rect.top + rect.height / 2 - springY.get();

      const dx = baseCx - e.clientX;
      const dy = baseCy - e.clientY;
      const dist = Math.hypot(dx, dy);

      if (dist > 0 && dist < repelRadius) {
        // Falloff: full shove when the cursor is on the blob, fading to nothing
        // at the edge of the radius.
        const force = (1 - dist / repelRadius) * repelRadius * 0.6 * repelStrength;
        x.set((dx / dist) * force);
        y.set((dy / dist) * force);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [repelRadius, repelStrength, shouldReduceMotion, springX, springY, x, y]);

  return (
    <motion.div
      ref={ref}
      className="pointer-events-none absolute"
      style={{
        top: blobProps.position?.top,
        left: blobProps.position?.left,
        right: blobProps.position?.right,
        bottom: blobProps.position?.bottom,
        opacity,
        x: springX,
        y: springY,
      }}
    >
      {/* Inner layer keeps the idle bob/rotate so it composes with — rather than
          fights — the repel transform on the outer layer. */}
      <motion.div
        animate={
          shouldReduceMotion ? undefined : { y: [0, -drift, 0], rotate: [0, 4, 0] }
        }
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      >
        <Blob {...blobProps} position={undefined} className="pointer-events-none static" />
      </motion.div>
    </motion.div>
  );
}

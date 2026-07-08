"use client";

import { FloatingBlob } from "@/components/decor/FloatingBlob";

/**
 * Decorative field of gray spheres that lives in the gap *between* two
 * sections. Sits behind all section content (each section is z-10, this is
 * z-0), so the orbs bleed across the seam and lead the eye down the page.
 *
 * Depth-of-field is derived from size: big orbs sit soft and faint in the
 * back, small ones crisp and brighter up front. Each arrangement leans the
 * composition to a different side so the descent reads as a gentle zig-zag.
 */

type Orb = {
  size: number;
  /** Vertical offset from the seam. Negative bleeds up, positive bleeds down. */
  top: number;
  left?: string;
  right?: string;
  rotate?: number;
  duration?: number;
};

const arrangements: Orb[][] = [
  // 0 · Hero → Profile — echoes the hero cluster, drifts left
  [
    { size: 210, top: -70, left: "3%", rotate: 12, duration: 11 },
    { size: 128, top: 30, right: "7%", rotate: 16, duration: 9.5 },
    { size: 52, top: -34, left: "27%", duration: 6.5 },
  ],
  // 1 · Profile → Experience — weighted right
  [
    { size: 196, top: -66, right: "2%", rotate: -14, duration: 11.5 },
    { size: 118, top: 36, left: "6%", rotate: 10, duration: 9 },
    { size: 50, top: -28, right: "29%", duration: 7 },
  ],
  // 2 · Experience → Projects — spread across the center
  [
    { size: 158, top: -58, left: "9%", rotate: 8, duration: 10 },
    { size: 112, top: 32, right: "15%", rotate: -12, duration: 9 },
    { size: 44, top: -26, left: "47%", duration: 6.5 },
  ],
  // 3 · Projects → Contact — big anchor on the left
  [
    { size: 224, top: -80, left: "2%", rotate: 16, duration: 12 },
    { size: 120, top: 34, right: "9%", rotate: -10, duration: 9.5 },
    { size: 48, top: -22, left: "30%", duration: 6.5 },
  ],
  // 4 · Contact → Footer — bleeds upward so the opaque footer doesn't clip it
  [
    { size: 150, top: -66, right: "6%", rotate: -12, duration: 10.5 },
    { size: 104, top: -44, left: "8%", rotate: 10, duration: 9 },
    { size: 44, top: -20, left: "33%", duration: 6.5 },
  ],
];

function depth(size: number) {
  if (size >= 170) return { opacity: 0.5, blur: 14, drift: 18 };
  if (size >= 90) return { opacity: 0.68, blur: 8, drift: 13 };
  return { opacity: 0.85, blur: 3, drift: 9 };
}

export function SectionDivider({ variant = 0 }: { variant?: number }) {
  const orbs = arrangements[variant % arrangements.length];

  return (
    <div
      aria-hidden
      className="pointer-events-none relative z-0 hidden h-0 w-full sm:block"
    >
      {orbs.map((orb, i) => {
        const { opacity, blur, drift } = depth(orb.size);
        return (
          <FloatingBlob
            key={i}
            preset="sphere"
            size={orb.size}
            rotate={orb.rotate}
            blur={blur}
            opacity={opacity}
            drift={drift}
            duration={orb.duration}
            position={{ top: orb.top, left: orb.left, right: orb.right }}
          />
        );
      })}
    </div>
  );
}

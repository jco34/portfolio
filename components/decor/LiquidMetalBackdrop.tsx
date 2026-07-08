"use client";

import { LiquidMetal, liquidMetalPresets } from "@paper-design/shaders-react";
import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * A cluster of differently-sized circles that swirl around a shared center.
 * Each disc follows its own closed 2D loop (an ellipse plus a smaller epicycle),
 * so it traces a wandering, looping path in BOTH axes rather than a straight
 * line. Because the loops differ in size, direction, speed and phase, the discs
 * continuously wind around one another near the middle — merging into one blob
 * and peeling apart again, the way real fluid rolls around itself.
 *
 * Why parametric loops instead of a spinning radius: the discs used to sit on a
 * group that rotated around the center while their distance from it "breathed"
 * in and out. With the spin far slower than the breathing, the eye mostly saw
 * the radius pumping along a near-fixed line — a horizontal sway — with almost
 * no vertical travel (the discs rode the x-axis, cy≈0). Driving cx AND cy along
 * an epicyclic loop gives genuine circular, y-rich motion that reads as fluid.
 *
 * Why a single metal field instead of one shader per disc: the discs used to
 * each render their OWN LiquidMetal shader, then a goo filter merged their
 * silhouettes. But the goo can only merge alpha, not the reflections — where
 * two discs overlapped, their two independent reflection fields clashed and
 * left a warped, rainbow-streaked seam through the merge. The fix is to paint
 * ONE continuous liquid-metal surface across the whole stage and use the
 * swirling cluster purely as a mask (goo-thresholded into metaballs). Every
 * blob is now a window onto the same surface, so when two merge there is only
 * ever one reflection — the join is seamless, like a single body of mercury.
 *
 * Stage is a fixed 920x400 userspace so the px orbit math below stays exact;
 * it is centered in whatever box the parent gives and clipped by the parent's
 * overflow, matching the previous center-anchored layout.
 *
 * Perf notes:
 * - Only one shader runs (down from three), so far fewer shaded pixels.
 * - `minPixelRatio={1}` + `maxPixelCount` cap the pixels shaded per frame.
 * - Motion pauses (and the shader RAF loop stops) for reduced-motion users.
 */

// Fixed userspace the SVG viewBox maps 1:1 to px. The metal FIELD is padded
// out beyond the visible stage so that when a blob swings wide it always has
// metal underneath to reveal — otherwise it would get sliced flat at the
// foreignObject edge. The extra field is invisible (masked away) except where a
// blob currently sits.
const STAGE_W = 920;
const STAGE_H = 400;
const CX = STAGE_W / 2;
const CY = STAGE_H / 2;
const PAD = 210;
const FIELD_X = -PAD;
const FIELD_Y = -PAD;
const FIELD_W = STAGE_W + PAD * 2;
const FIELD_H = STAGE_H + PAD * 2;

// Each blob rides a closed epicyclic loop centered on the stage:
//   x(t) = ax·cos(a) + ex·cos(e)      a = phase + dir·t        (primary loop)
//   y(t) = ay·sin(a) + ey·sin(e)      e = phase + edir·k·t     (epicycle)
// The primary ellipse (ax,ay) is the main swirl; the epicycle (ex,ey) at an
// integer frequency k rides on top so the path wobbles and folds instead of
// tracing a plain oval — that's what makes discs curl around one another. All
// frequencies are integers, so at t=2π the path lands exactly where it began
// and loops seamlessly. Durations are unequal and non-harmonic so the cluster
// never visibly repeats. `dir`/`edir` set spin direction (opposite directions
// make the loops weave). The big disc keeps a tighter loop as the anchor mass
// while the smaller two roam wider.
type Orbit = {
  size: number;
  ax: number; // primary ellipse radius, x
  ay: number; // primary ellipse radius, y — deliberately large now for y-travel
  ex: number; // epicycle radius, x
  ey: number; // epicycle radius, y
  k: number; // epicycle frequency (loops per primary loop), integer
  dir: 1 | -1; // primary direction
  edir: 1 | -1; // epicycle direction
  phase: number; // starting angle (radians)
  duration: number; // seconds per full primary loop
};

const BLOBS: Orbit[] = [
  { size: 168, ax: 120, ay: 104, ex: 34, ey: 40, k: 3, dir: 1, edir: -1, phase: 0, duration: 16 },
  { size: 140, ax: 156, ay: 126, ex: 46, ey: 38, k: 2, dir: -1, edir: 1, phase: 2.1, duration: 13 },
  { size: 250, ax: 80, ay: 72, ex: 26, ey: 30, k: 2, dir: 1, edir: 1, phase: 1.05, duration: 20 },
];

// Sample each loop into keyframes once at module load. Uniform steps in t map
// to uniform keyframe times, so motion can tween them linearly with no `times`
// array. The final sample (i === STEPS) repeats the first point, closing the
// loop so the Infinity repeat has no seam.
const STEPS = 64;

function buildLoop(o: Orbit) {
  const cx: number[] = [];
  const cy: number[] = [];
  for (let i = 0; i <= STEPS; i++) {
    const t = (i / STEPS) * Math.PI * 2;
    const a = o.phase + o.dir * t;
    const e = o.phase + o.edir * o.k * t;
    cx.push(CX + o.ax * Math.cos(a) + o.ex * Math.cos(e));
    cy.push(CY + o.ay * Math.sin(a) + o.ey * Math.sin(e));
  }
  return { cx, cy };
}

const LOOPS = BLOBS.map(buildLoop);

export function LiquidMetalBackdrop({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const gooId = `goo-${uid}`;
  const maskId = `mask-${uid}`;

  const animate = !shouldReduceMotion;

  return (
    <div className={`relative ${className ?? ""}`}>
      {/* Fixed-size stage centered in the parent box. The SVG viewBox maps 1:1
          to these px so the orbit radii/sizes above are literal pixels. */}
      <svg
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        width={STAGE_W}
        height={STAGE_H}
        viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
        style={{ pointerEvents: "none", overflow: "visible" }}
      >
        <defs>
          {/* Goo: blur the orbiting circles so their alphas overlap, then a
              high-slope alpha ramp re-hardens the union into a single crisp
              metaball silhouette. This shapes the MASK only — never the metal —
              so merges cost nothing in reflection continuity. */}
          <filter id={gooId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
          </filter>

          {/* The mask: white metaballs reveal the metal, everything else hides
              it. maskContentUnits default to userSpaceOnUse, so the circle
              coords are in the same px space as the viewBox. */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x={FIELD_X} y={FIELD_Y} width={FIELD_W} height={FIELD_H}>
            <g filter={`url(#${gooId})`}>
              {BLOBS.map((b, i) => {
                const loop = LOOPS[i];
                // Drive cx AND cy along the sampled epicyclic loop so the blob
                // swirls through both axes. Linear tween between the uniform
                // samples; the closed loop makes the Infinity repeat seamless.
                return (
                  <motion.circle
                    key={i}
                    r={b.size / 2}
                    fill="#fff"
                    initial={{ cx: loop.cx[0], cy: loop.cy[0] }}
                    animate={
                      animate
                        ? { cx: loop.cx, cy: loop.cy }
                        : { cx: loop.cx[0], cy: loop.cy[0] }
                    }
                    transition={
                      animate
                        ? { duration: b.duration, repeat: Infinity, ease: "linear" }
                        : undefined
                    }
                  />
                );
              })}
            </g>
          </mask>
        </defs>

        {/* One continuous liquid-metal surface, masked into the metaballs.
            Because it is a single shader, the reflection flows unbroken across
            every merge. foreignObject lets the WebGL canvas live inside the
            masked SVG. */}
        <foreignObject x={FIELD_X} y={FIELD_Y} width={FIELD_W} height={FIELD_H} mask={`url(#${maskId})`}>
          <div style={{ width: "100%", height: "100%" }}>
            <LiquidMetal
              {...liquidMetalPresets[2]}
              shape="none"
              fit="cover"
              // Brighter, harder-edged surface reads as polished chrome: a bright
              // silver base, pure-white specular tint, tighter softness for
              // sharper highlights, and more repetition/dispersion for the oily
              // sheen. Because there is now one field, the dispersion looks like
              // a coherent sheen instead of the old clashing rainbow seam.
              colorBack="#cdd2db"
              colorTint="#ffffff"
              softness={0.04}
              repetition={4.4}
              shiftRed={0.4}
              shiftBlue={0.4}
              contour={0.36}
              distortion={0.14}
              scale={0.78}
              angle={70}
              // Slow flow: the surface glides like molten metal instead of
              // shimmering or twitching.
              speed={shouldReduceMotion ? 0 : 0.3}
              minPixelRatio={1}
              maxPixelCount={900 * 560}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}

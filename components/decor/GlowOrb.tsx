import type { CSSProperties } from "react";

type GlowOrbProps = {
  position?: { top?: number | string; left?: number | string; right?: number | string };
  className?: string;
};

export function GlowOrb({ position, className }: GlowOrbProps) {
  const style: CSSProperties = {
    width: 91,
    height: 91,
    ...position,
    filter: "blur(169px)",
  };

  return (
    <div
      aria-hidden
      className={className ?? "pointer-events-none absolute rounded-full bg-white"}
      style={style}
    />
  );
}

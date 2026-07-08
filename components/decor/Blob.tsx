import type { CSSProperties } from "react";

type BlobPosition = {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
};

type BlobProps = {
  preset?: "sphere" | "slab" | "ring";
  size?: number;
  width?: number;
  height?: number;
  position?: BlobPosition;
  rotate?: number;
  blur?: number;
  className?: string;
};

const presetShadow: Record<NonNullable<BlobProps["preset"]>, string> = {
  sphere:
    "-18px 32px 78px rgba(255,255,255,0.87) inset, 26px 15px 31px rgba(43,46,61,0.9) inset, 0 36px 8px rgba(0,0,0,0.16)",
  slab: "-18px 32px 78px rgba(255,255,255,0.87) inset, 26px 15px 31px rgba(43,46,61,0.9) inset",
  ring: "0 48px 78px rgba(255,255,255,0.8) inset, 4px 4px 4px rgba(0,0,0,0.2)",
};

export function Blob({
  preset = "sphere",
  size = 200,
  width,
  height,
  position,
  rotate = 0,
  blur = 6,
  className,
}: BlobProps) {
  const style: CSSProperties = {
    width: width ?? size,
    height: height ?? size,
    ...position,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
    background:
      "linear-gradient(0deg, rgba(31,46,126,0.2), rgba(31,46,126,0.2)), radial-gradient(ellipse 36% 112% at 34% -8%, #949494 0%, #181818 64%, #1D1D1D 100%)",
    boxShadow: presetShadow[preset],
    borderRadius: preset === "ring" ? "9999px" : "50%",
    filter: `blur(${blur}px)`,
  };

  return (
    <div
      aria-hidden
      className={className ?? "absolute pointer-events-none"}
      style={style}
    />
  );
}

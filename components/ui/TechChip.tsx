import Image from "next/image";
import type { Tech } from "@/types/content";

export function TechChip({ tech }: { tech: Tech }) {
  return (
    <span className="bg-chip rounded-panel inline-flex items-center gap-2 px-3.5 py-3">
      <Image src={tech.icon} alt="" aria-hidden width={24} height={24} />
      <span className="sr-only">{tech.label}</span>
    </span>
  );
}

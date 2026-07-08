import { cn } from "@/lib/utils";

type LogoProps = { showText?: boolean; className?: string };

export function Logo({ showText = false, className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="#FAFAFA" fillOpacity="0.9" />
        <circle cx="20" cy="20" r="9" fill="#FAFAFA" fillOpacity="0.5" />
      </svg>
      {showText ? (
        <span className="font-body text-fg text-2xl font-semibold">JC</span>
      ) : null}
    </span>
  );
}

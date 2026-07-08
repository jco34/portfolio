import Link from "next/link";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
};

const baseClasses = cn(
  "bg-chip outline-edge-2 text-fg inline-flex h-[52px] w-[52px] items-center justify-center",
  "rounded-pill outline outline-1 transition-opacity hover:opacity-80 disabled:opacity-30",
);

export function IconButton({
  icon,
  label,
  onClick,
  href,
  disabled,
  className,
}: IconButtonProps) {
  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        aria-label={label}
        className={cn(baseClasses, className)}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {icon}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, className)}
    >
      {icon}
    </button>
  );
}

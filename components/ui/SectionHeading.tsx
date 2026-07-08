import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  className?: string;
};

export function SectionHeading({ id, eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {eyebrow ? (
        <span className="text-muted font-body text-sm uppercase tracking-wide">
          {eyebrow}
        </span>
      ) : null}
      <h2 id={id} className="font-display text-fg text-[28px] font-medium">
        {title}
      </h2>
    </div>
  );
}

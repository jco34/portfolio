import type { SocialLink } from "@/types/content";
import { IconButton } from "@/components/ui/IconButton";
import { iconMap } from "@/components/ui/icon-map";

export function SocialLinks({ items }: { items: SocialLink[] }) {
  return (
    <div className="bg-surface-2 outline-edge inline-flex items-center gap-4 rounded-pill p-2.5 outline outline-1 -outline-offset-1">
      {items.map((item) => {
        const Icon = iconMap[item.icon];
        return (
          <IconButton
            key={item.label}
            href={item.href}
            label={item.label}
            icon={<Icon size={20} strokeWidth={1.5} />}
          />
        );
      })}
    </div>
  );
}

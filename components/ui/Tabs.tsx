"use client";

import { cn } from "@/lib/utils";

type TabItem = { id: string; label: string };

type TabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Experience sections"
      className="bg-white/[0.03] outline-edge-2 flex w-full items-center gap-1 rounded-lg p-1 outline outline-1 -outline-offset-1"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event) => {
              const index = items.findIndex((i) => i.id === item.id);
              if (event.key === "ArrowRight") {
                onChange(items[(index + 1) % items.length].id);
              } else if (event.key === "ArrowLeft") {
                onChange(items[(index - 1 + items.length) % items.length].id);
              }
            }}
            className={cn(
              "font-body min-w-0 flex-1 truncate rounded-md px-2 py-2 text-sm transition-colors xl:px-4 xl:text-lg",
              isActive
                ? "bg-chip-active text-fg"
                : "text-muted hover:text-fg",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

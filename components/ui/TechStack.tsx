import { techstack } from "@/content/techstack";
import { TechChip } from "@/components/ui/TechChip";

export function TechStack({ ids }: { ids: string[] }) {
  const items = ids
    .map((id) => techstack.find((tech) => tech.id === id))
    .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech));

  return (
    <ul className="flex flex-wrap items-center gap-1" aria-label="Tech stack used">
      {items.map((tech) => (
        <li key={tech.id}>
          <TechChip tech={tech} />
        </li>
      ))}
    </ul>
  );
}

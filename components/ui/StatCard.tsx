import type { Stat } from "@/types/content";
import { Card } from "@/components/ui/Card";

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <Card className="flex flex-1 flex-col justify-between p-8">
      <span className="text-muted font-display text-[45px] leading-[54px] font-medium">
        {stat.value}
      </span>
      <span className="text-muted font-display text-lg leading-[21.6px] font-medium">
        {stat.label}
      </span>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  title: string;
  value: string | number;
  icon?: string;
  delta?: string;
}

export default function StatCard({ title, value, icon, delta }: Props) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between mb-4">
          <p className="text-sm text-muted-foreground">{title}</p>
          {delta && <Badge variant="secondary">{delta}</Badge>}
        </div>
        <div className="flex justify-between items-end">
          <p className="text-3xl font-bold">{value}</p>
          <span className="material-symbols-outlined text-primary text-4xl">
            {icon}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

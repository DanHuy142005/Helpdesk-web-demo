import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "violet" | "cyan" | "rose";
const toneMap: Record<Tone, string> = {
  blue: "bg-gradient-blue",
  violet: "bg-gradient-violet",
  cyan: "bg-gradient-cyan",
  rose: "bg-gradient-rose",
};

export function KpiCard({ label, value, delta, up = true, icon: Icon, tone = "blue", hint = "So với tuần trước" }: { label: string; value: string; delta?: string; up?: boolean; icon: LucideIcon; tone?: Tone; hint?: string }) {
  return (
    <div className="card-soft card-hover group relative overflow-hidden p-5">
      <div className={cn("pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-15 blur-xl transition-opacity group-hover:opacity-30", toneMap[tone])} />
      <div className="flex items-start justify-between gap-3">
        <div className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-2xl text-primary-foreground shadow-glow", toneMap[tone])}>
          <Icon className="h-5 w-5" />
        </div>
        {delta && (
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", up ? "bg-success/12 text-success" : "bg-destructive/10 text-destructive")}>
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-[28px] font-bold leading-none tracking-tight">{value}</p>
      <p className="mt-1.5 text-sm font-medium text-foreground/80">{label}</p>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{hint}</span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-success/12 text-success"><ArrowUpRight className="h-3.5 w-3.5" /></span>
      </div>
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { navGroups } from "./nav";

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="flex h-full flex-col">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-2.5 px-3 pb-6 pt-2">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow"><Sparkles className="h-5 w-5" /></span>
        <span className="leading-tight"><span className="block text-xl font-extrabold text-gradient">nova</span><span className="block text-[11px] font-medium text-muted-foreground">IT Helpdesk</span></span>
      </Link>
      <nav className="flex-1 space-y-6 overflow-y-auto pr-1">
        {navGroups.map((g) => (
          <div key={g.label}>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{g.label}</p>
            <ul className="space-y-1">
              {g.items.map((it) => {
                const active = it.to === "/" ? path === "/" : path === it.to || (it.to === "/tickets" && /^\/tickets\/TK/.test(path));
                return (
                  <li key={it.to}>
                    <Link to={it.to} onClick={onNavigate} className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all", active ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm ring-1 ring-primary/10" : "text-sidebar-foreground hover:translate-x-0.5 hover:bg-muted hover:text-foreground")}>
                      <it.icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")} />
                      <span className="truncate">{it.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-brand p-4 text-primary-foreground">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary-foreground/15" />
        <p className="text-sm font-semibold">Cần hỗ trợ gấp?</p>
        <p className="mt-1 text-xs opacity-85">Hotline IT: 1900 6868 (nội bộ 101)</p>
      </div>
    </div>
  );
}

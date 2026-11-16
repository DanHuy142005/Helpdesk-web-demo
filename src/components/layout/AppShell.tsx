import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen p-3 sm:p-5">
      <div className="mx-auto flex max-w-[1600px] gap-5 rounded-[28px] bg-background/80 p-3 shadow-lift backdrop-blur-xl sm:p-5">
        <aside className="card-soft sticky top-5 hidden h-[calc(100vh-5.5rem)] w-64 shrink-0 p-4 lg:block"><AppSidebar /></aside>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 bg-card p-4 shadow-lift animate-in slide-in-from-left">
              <button onClick={() => setOpen(false)} className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg hover:bg-muted" aria-label="Đóng"><X className="h-4 w-4" /></button>
              <AppSidebar onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <Topbar onMenu={() => setOpen(true)} />
          <main className="min-w-0 animate-in fade-in duration-300">{children}</main>
        </div>
      </div>
    </div>
  );
}

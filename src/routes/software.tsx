import { createFileRoute } from "@tanstack/react-router";
import { AppWindow, CalendarClock, PlusCircle } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/Panel";
import { Btn } from "@/components/shared/Btn";
import { software } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/software")({
  head: () => seo("Phần mềm & bản quyền", "Quản lý giấy phép phần mềm, số lượng sử dụng và ngày hết hạn."),
  component: Software,
});

function Software() {
  return (
    <div>
      <PageHeader title="Phần mềm & bản quyền" subtitle="Theo dõi giấy phép đang sử dụng" actions={<Btn><PlusCircle className="h-4 w-4" />Thêm giấy phép</Btn>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {software.map((s) => { const pct = Math.round((s.used / s.total) * 100); return (
          <div key={s.name} className="card-soft card-hover p-5">
            <div className="flex items-center gap-3"><span className={cn("grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground shadow-glow", s.color)}><AppWindow className="h-5 w-5" /></span><div className="min-w-0"><p className="truncate font-semibold">{s.name}</p><p className="text-sm text-muted-foreground">{s.vendor}</p></div></div>
            <div className="mt-5 flex justify-between text-sm"><span className="text-muted-foreground">Đã dùng</span><span className="font-semibold">{s.used}/{s.total} ({pct}%)</span></div>
            <div className="mt-2 h-2 rounded-full bg-muted"><div className={cn("h-2 rounded-full", pct > 90 ? "bg-gradient-rose" : "bg-gradient-brand")} style={{ width: `${pct}%` }} /></div>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><CalendarClock className="h-4 w-4" />Hết hạn: {s.expiry}</p>
          </div>); })}
      </div>
    </div>
  );
}

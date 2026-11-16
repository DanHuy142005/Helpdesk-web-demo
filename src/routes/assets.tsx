import { createFileRoute } from "@tanstack/react-router";
import { Boxes, Laptop, Monitor, PlusCircle, Printer, Router, Wrench } from "lucide-react";
import { seo } from "@/lib/seo";
import { KpiCard } from "@/components/shared/KpiCard";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { Btn } from "@/components/shared/Btn";
import { assets } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assets")({
  head: () => seo("Quản lý tài sản", "Theo dõi thiết bị IT, người sử dụng và tình trạng tài sản."),
  component: Assets,
});
const icons: Record<string, typeof Laptop> = { Laptop, "Máy in": Printer, "Màn hình": Monitor, Switch: Router };
const st: Record<string, string> = { "Đang dùng": "bg-success/12 text-success", "Bảo trì": "bg-warning/15 text-warning", "Trong kho": "bg-info/10 text-info" };

function Assets() {
  return (
    <div className="space-y-5">
      <PageHeader title="Quản lý tài sản" subtitle="612 thiết bị đang được theo dõi" actions={<Btn><PlusCircle className="h-4 w-4" />Thêm tài sản</Btn>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Tổng tài sản" value="612" icon={Boxes} tone="blue" />
        <KpiCard label="Đang sử dụng" value="548" icon={Laptop} tone="cyan" />
        <KpiCard label="Đang bảo trì" value="21" icon={Wrench} tone="rose" />
        <KpiCard label="Trong kho" value="43" icon={Monitor} tone="violet" />
      </div>
      <Panel title="Danh sách tài sản">
        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[720px] text-sm">
            <thead><tr className="bg-muted/70 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground"><th className="px-4 py-3">Tài sản</th><th className="px-4 py-3">Loại</th><th className="px-4 py-3">Người dùng</th><th className="px-4 py-3">Ngày mua</th><th className="px-4 py-3">Giá trị</th><th className="px-4 py-3">Trạng thái</th></tr></thead>
            <tbody>
              {assets.map((a) => { const I = icons[a.type] ?? Boxes; return (
                <tr key={a.id} className="border-t transition-colors hover:bg-accent/50">
                  <td className="px-4 py-3.5"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary"><I className="h-4 w-4" /></span><div><p className="font-medium">{a.name}</p><p className="text-xs text-muted-foreground">{a.id}</p></div></div></td>
                  <td className="px-4 py-3.5">{a.type}</td><td className="px-4 py-3.5">{a.user}</td><td className="px-4 py-3.5 text-muted-foreground">{a.purchase}</td><td className="px-4 py-3.5 font-medium">{a.value}</td>
                  <td className="px-4 py-3.5"><span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", st[a.status])}>{a.status}</span></td>
                </tr>); })}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}

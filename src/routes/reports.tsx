import { createFileRoute } from "@tanstack/react-router";
import { Download, Gauge, Smile, Timer, TrendingUp } from "lucide-react";
import { seo } from "@/lib/seo";
import { KpiCard } from "@/components/shared/KpiCard";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { DonutChart, TicketBarChart } from "@/components/shared/Charts";
import { Btn } from "@/components/shared/Btn";
import { Avatar } from "@/components/shared/Avatar";

export const Route = createFileRoute("/reports")({
  head: () => seo("Báo cáo", "Báo cáo hiệu suất, SLA và mức độ hài lòng của bộ phận IT."),
  component: Reports,
});

const top = [{ n: "Võ Thanh Tâm", v: 61, r: "4,9" }, { n: "Trần Quốc Bảo", v: 42, r: "4,8" }, { n: "Ngô Đức Mạnh", v: 38, r: "4,9" }, { n: "Lê Hoàng Phúc", v: 29, r: "4,7" }];
const depts = [
  { name: "Kinh doanh", value: 28, color: "var(--chart-1)" }, { name: "Kế toán", value: 22, color: "var(--chart-2)" },
  { name: "Marketing", value: 20, color: "var(--chart-5)" }, { name: "Kỹ thuật", value: 18, color: "var(--chart-3)" }, { name: "Khác", value: 12, color: "var(--chart-4)" },
];

function Reports() {
  return (
    <div className="space-y-5">
      <PageHeader title="Báo cáo & phân tích" subtitle="Tháng 11/2026" actions={<Btn variant="ghost"><Download className="h-4 w-4" />Tải PDF</Btn>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Tỉ lệ đạt SLA" value="98,2%" delta="1,1%" icon={Gauge} tone="blue" />
        <KpiCard label="Thời gian giải quyết TB" value="3,1 giờ" delta="9%" icon={Timer} tone="violet" />
        <KpiCard label="Mức độ hài lòng" value="4,8/5" delta="0,1" icon={Smile} tone="cyan" />
        <KpiCard label="Giải quyết lần đầu" value="72%" delta="4%" icon={TrendingUp} tone="rose" />
      </div>
      <Panel title="Xu hướng ticket 12 tháng"><TicketBarChart height={300} /></Panel>
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Ticket theo phòng ban"><DonutChart data={depts} total="465" /></Panel>
        <Panel title="Nhân sự xuất sắc">
          <ul className="space-y-3">{top.map((t, i) => (
            <li key={t.n} className="flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-accent/60">
              <span className="w-5 text-sm font-bold text-muted-foreground">#{i + 1}</span><Avatar name={t.n} />
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{t.n}</p><div className="mt-1 h-1.5 rounded-full bg-muted"><div className="h-1.5 rounded-full bg-gradient-brand" style={{ width: `${(t.v / 61) * 100}%` }} /></div></div>
              <div className="text-right"><p className="text-sm font-semibold">{t.v}</p><p className="text-xs text-muted-foreground">★ {t.r}</p></div>
            </li>))}</ul>
        </Panel>
      </div>
    </div>
  );
}

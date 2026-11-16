import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, ListChecks, Star, Wrench, MapPin } from "lucide-react";
import { seo } from "@/lib/seo";
import { KpiCard } from "@/components/shared/KpiCard";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { DonutChart, TicketBarChart } from "@/components/shared/Charts";
import { PriorityBadge, StatusBadge } from "@/components/shared/StatusBadge";
import { tickets } from "@/data/mock";

export const Route = createFileRoute("/dashboard/technician")({
  head: () => seo("Dashboard Kỹ thuật viên", "Danh sách công việc, tiến độ và hiệu suất của kỹ thuật viên."),
  component: TechDashboard,
});

const workload = [
  { name: "Đang xử lý", value: 45, color: "var(--chart-1)" },
  { name: "Chờ linh kiện", value: 20, color: "var(--chart-4)" },
  { name: "Chờ phản hồi", value: 15, color: "var(--chart-2)" },
  { name: "Hoàn tất", value: 20, color: "var(--chart-3)" },
];

function TechDashboard() {
  const mine = tickets.filter((t) => t.assignee === "Ngô Đức Mạnh" || t.assignee === "Trần Quốc Bảo");
  return (
    <div className="space-y-5">
      <PageHeader title="Công việc của tôi" subtitle="Kỹ thuật viên · Ngô Đức Mạnh" />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Được giao" value="18" icon={ListChecks} tone="blue" />
        <KpiCard label="Đang thực hiện" value="6" icon={Wrench} tone="violet" />
        <KpiCard label="Thời gian xử lý TB" value="2,4 giờ" delta="12%" icon={Gauge} tone="cyan" />
        <KpiCard label="Đánh giá hài lòng" value="4,9/5" delta="0,2" icon={Star} tone="rose" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {mine.map((t) => (
          <Link key={t.id} to="/tickets/$ticketId" params={{ ticketId: t.id }} className="card-soft card-hover block p-5">
            <div className="flex items-center justify-between gap-2"><span className="text-sm font-semibold text-primary">{t.id}</span><StatusBadge status={t.status} /></div>
            <p className="mt-2 font-semibold">{t.title}</p>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground"><PriorityBadge priority={t.priority} /><span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{t.department}</span><span>{t.createdAt}</span></div>
          </Link>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="Hiệu suất theo tháng"><TicketBarChart /></Panel>
        <Panel title="Khối lượng công việc"><DonutChart data={workload} total="18" label="Ticket" /></Panel>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Activity, Boxes, Download, Ticket, Users, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { seo } from "@/lib/seo";
import { KpiCard } from "@/components/shared/KpiCard";
import { Panel } from "@/components/shared/Panel";
import { DonutChart, TicketBarChart } from "@/components/shared/Charts";
import { TicketTable } from "@/components/shared/TicketTable";
import { Btn } from "@/components/shared/Btn";
import { tickets } from "@/data/mock";

export const Route = createFileRoute("/")({
  head: () => seo("Dashboard Quản trị", "Tổng quan toàn hệ thống IT Helpdesk: ticket, tài sản, nhân sự và hiệu suất."),
  component: AdminDashboard,
});

const overview = [
  { v: "1.248", n: "+86 mới", l: "Tổng người dùng" },
  { v: "24", n: "+3 mới", l: "Kỹ thuật viên" },
  { v: "612", n: "+12 mới", l: "Tài sản IT" },
  { v: "86", n: "6 gần đây", l: "Bài viết KB" },
  { v: "98,2%", n: "SLA", l: "Tỉ lệ đạt SLA" },
];

function AdminDashboard() {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[20px] border bg-gradient-hero p-5 shadow-soft sm:p-6">
        <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full bg-gradient-cyan opacity-30 blur-2xl" />
        <div className="pointer-events-none absolute right-48 top-10 h-48 w-48 rounded-full bg-gradient-violet opacity-20 blur-2xl" />
        <div className="relative mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><h1 className="text-xl font-bold">Tổng quan nhanh</h1><p className="text-xs text-muted-foreground">Toàn bộ hoạt động hệ thống IT trong tháng này</p></div>
          <Btn variant="ghost"><Download className="h-4 w-4" />Xuất báo cáo</Btn>
        </div>
        <div className="relative grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          {overview.map((o) => (
            <div key={o.l} className="glass rounded-2xl p-4 transition-transform hover:-translate-y-0.5">
              <p className="text-2xl font-bold">{o.v} <span className="text-xs font-medium text-muted-foreground">({o.n})</span></p>
              <p className="mt-1 text-sm text-foreground/75">{o.l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Tổng Ticket" value="2.465" delta="4,2%" icon={Ticket} tone="blue" />
        <KpiCard label="Đang chờ xử lý" value="256" delta="2,1%" up={false} icon={Clock} tone="violet" />
        <KpiCard label="Đã giải quyết" value="2.093" delta="6,8%" icon={CheckCircle2} tone="cyan" />
        <KpiCard label="Quá hạn SLA" value="12" delta="1,4%" up={false} icon={AlertTriangle} tone="rose" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <Panel title="Ticket theo tháng" subtitle="Năm 2026" action={<Legend />}><TicketBarChart /></Panel>
        <Panel title="Ticket theo danh mục" subtitle="30 ngày gần nhất"><DonutChart total="465" /></Panel>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {[{ i: Users, t: "Người dùng hoạt động", v: "1.032", p: 83 }, { i: Boxes, t: "Tài sản đang sử dụng", v: "548/612", p: 89 }, { i: Activity, t: "Uptime hệ thống", v: "99,97%", p: 99 }].map((x) => (
          <div key={x.t} className="card-soft card-hover flex items-center gap-4 p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary"><x.i className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <div className="flex justify-between text-sm"><span className="truncate text-muted-foreground">{x.t}</span><span className="font-semibold">{x.v}</span></div>
              <div className="mt-2 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-gradient-brand" style={{ width: `${x.p}%` }} /></div>
            </div>
          </div>
        ))}
      </div>

      <Panel title="Ticket gần đây" subtitle="Cập nhật theo thời gian thực"><TicketTable data={tickets.slice(0, 6)} /></Panel>
    </div>
  );
}

export function Legend() {
  return (
    <div className="hidden gap-4 text-xs text-muted-foreground sm:flex">
      <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-chart-2" />Đã giải quyết</span>
      <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-chart-1" />Đang mở</span>
      <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-chart-3" />Đã đóng</span>
    </div>
  );
}

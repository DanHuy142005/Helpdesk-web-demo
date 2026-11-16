import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRightLeft, CheckCircle2, Headset, Inbox, LifeBuoy, Timer } from "lucide-react";
import { seo } from "@/lib/seo";
import { KpiCard } from "@/components/shared/KpiCard";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { DonutChart, TicketBarChart } from "@/components/shared/Charts";
import { TicketTable } from "@/components/shared/TicketTable";
import { BtnLink } from "@/components/shared/Btn";
import { PriorityBadge } from "@/components/shared/StatusBadge";
import { tickets } from "@/data/mock";

export const Route = createFileRoute("/dashboard/helpdesk")({
  head: () => seo("Dashboard Helpdesk", "Tiếp nhận, phân loại và xử lý nhanh yêu cầu hỗ trợ IT."),
  component: HelpdeskDashboard,
});

function HelpdeskDashboard() {
  const queue = tickets.filter((t) => t.status === "Mới" || t.status === "Đang xử lý");
  return (
    <div className="space-y-5">
      <PageHeader title="Bảng điều khiển Helpdesk" subtitle="Tiếp nhận & xử lý tuyến 1" actions={<BtnLink to="/helpdesk/resolve"><LifeBuoy className="h-4 w-4" />Xử lý sự cố</BtnLink>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Ticket mới hôm nay" value="38" delta="12%" icon={Inbox} tone="blue" />
        <KpiCard label="Tự xử lý thành công" value="27" delta="8%" icon={CheckCircle2} tone="cyan" />
        <KpiCard label="Chuyển Technician" value="11" delta="3%" up={false} icon={ArrowRightLeft} tone="violet" />
        <KpiCard label="Thời gian phản hồi TB" value="6 phút" delta="1 phút" icon={Timer} tone="rose" />
      </div>
      <div className="grid gap-5 xl:grid-cols-[1fr_1.4fr]">
        <Panel title="Hàng đợi cần xử lý" subtitle={`${queue.length} ticket`} action={<Headset className="h-5 w-5 text-primary" />}>
          <ul className="space-y-3">
            {queue.map((t) => (
              <li key={t.id}>
                <Link to="/helpdesk/resolve" className="block rounded-2xl border p-3.5 transition-all hover:border-primary/30 hover:shadow-soft">
                  <div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold text-primary">{t.id}</span><PriorityBadge priority={t.priority} /></div>
                  <p className="mt-1 truncate text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.requester} · {t.department}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-5">
          <Panel title="Lưu lượng ticket"><TicketBarChart height={210} /></Panel>
          <Panel title="Phân loại yêu cầu"><DonutChart /></Panel>
        </div>
      </div>
      <Panel title="Tất cả ticket tuyến 1"><TicketTable data={tickets} /></Panel>
    </div>
  );
}

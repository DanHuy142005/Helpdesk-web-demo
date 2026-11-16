import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, CheckCircle2, Clock, Laptop, PlusCircle, Ticket, LifeBuoy, KeyRound, Wifi, Printer } from "lucide-react";
import { seo } from "@/lib/seo";
import { KpiCard } from "@/components/shared/KpiCard";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { TicketTable } from "@/components/shared/TicketTable";
import { BtnLink } from "@/components/shared/Btn";
import { articles, tickets } from "@/data/mock";

export const Route = createFileRoute("/dashboard/user")({
  head: () => seo("Dashboard Nhân viên", "Theo dõi ticket cá nhân, thiết bị được cấp và hướng dẫn tự xử lý."),
  component: UserDashboard,
});

const quick = [{ i: KeyRound, t: "Đặt lại mật khẩu" }, { i: Wifi, t: "Lỗi mạng / VPN" }, { i: Printer, t: "Sự cố máy in" }, { i: Laptop, t: "Yêu cầu thiết bị" }];

function UserDashboard() {
  return (
    <div className="space-y-5">
      <PageHeader title="Xin chào, Minh Anh" subtitle="Chúng tôi luôn sẵn sàng hỗ trợ bạn" actions={<BtnLink to="/tickets/new"><PlusCircle className="h-4 w-4" />Tạo Ticket mới</BtnLink>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Ticket của tôi" value="12" icon={Ticket} tone="blue" hint="Tất cả thời gian" />
        <KpiCard label="Đang xử lý" value="2" icon={Clock} tone="violet" hint="Cập nhật hôm nay" />
        <KpiCard label="Đã giải quyết" value="10" delta="2" icon={CheckCircle2} tone="cyan" hint="Tháng này" />
        <KpiCard label="Thiết bị được cấp" value="2" icon={Laptop} tone="rose" hint="Laptop, màn hình" />
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Yêu cầu nhanh" subtitle="Chọn loại sự cố thường gặp">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quick.map((q) => (
              <Link key={q.t} to="/helpdesk/resolve" className="group rounded-2xl border bg-muted/40 p-4 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-card hover:shadow-lift">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow transition-transform group-hover:scale-105"><q.i className="h-5 w-5" /></span>
                <p className="mt-3 text-sm font-medium">{q.t}</p>
              </Link>
            ))}
          </div>
        </Panel>
        <Panel title="Bài viết hữu ích" action={<Link to="/knowledge" className="text-xs font-semibold text-primary">Xem tất cả</Link>}>
          <ul className="space-y-2">
            {articles.slice(0, 4).map((a) => (
              <li key={a.title}><Link to="/knowledge" className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-accent"><BookOpen className="h-4 w-4 shrink-0 text-primary" /><span className="truncate text-sm">{a.title}</span></Link></li>
            ))}
          </ul>
        </Panel>
      </div>
      <Panel title="Ticket của tôi" action={<LifeBuoy className="h-5 w-5 text-muted-foreground" />}><TicketTable data={tickets.slice(0, 4)} /></Panel>
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Paperclip, Send, User, Tag, Building2, Clock, Wrench } from "lucide-react";
import { seo } from "@/lib/seo";
import { Panel } from "@/components/shared/Panel";
import { Avatar } from "@/components/shared/Avatar";
import { Btn } from "@/components/shared/Btn";
import { PriorityBadge, StatusBadge } from "@/components/shared/StatusBadge";
import { tickets } from "@/data/mock";

export const Route = createFileRoute("/tickets/$ticketId")({
  loader: ({ params }) => {
    const ticket = tickets.find((t) => t.id === params.ticketId);
    if (!ticket) throw notFound();
    return { ticket };
  },
  head: ({ loaderData }) => seo(loaderData ? `${loaderData.ticket.id} – ${loaderData.ticket.title}` : "Chi tiết Ticket", "Chi tiết, lịch sử trao đổi và tiến độ xử lý ticket."),
  component: TicketDetail,
});

function TicketDetail() {
  const { ticket: t } = Route.useLoaderData();
  const timeline = [
    { who: t.requester, msg: t.description, time: t.createdAt },
    { who: "Võ Thanh Tâm", msg: "Helpdesk đã tiếp nhận. Đã thử hướng dẫn cơ bản nhưng chưa khắc phục, chuyển cho kỹ thuật viên.", time: "16/11/2026 08:30" },
    { who: t.assignee === "Chưa phân công" ? "Trần Quốc Bảo" : t.assignee, msg: "Đã nhận ticket, sẽ kiểm tra từ xa trong 15 phút tới. Vui lòng giữ máy bật.", time: "16/11/2026 08:45" },
  ];
  const info = [{ i: User, l: "Người yêu cầu", v: t.requester }, { i: Building2, l: "Phòng ban", v: t.department }, { i: Tag, l: "Danh mục", v: t.category }, { i: Wrench, l: "Phụ trách", v: t.assignee }, { i: Clock, l: "Ngày tạo", v: t.createdAt }];
  return (
    <div className="space-y-5">
      <Link to="/tickets" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />Quay lại danh sách</Link>
      <div className="card-soft relative overflow-hidden bg-gradient-hero p-6">
        <div className="flex flex-wrap items-center gap-2"><span className="text-sm font-bold text-primary">{t.id}</span><StatusBadge status={t.status} /><PriorityBadge priority={t.priority} /></div>
        <h1 className="mt-2 text-2xl font-bold">{t.title}</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Panel title="Lịch sử trao đổi">
          <ol className="space-y-5">
            {timeline.map((m, i) => (
              <li key={i} className="flex gap-3">
                <Avatar name={m.who} />
                <div className="min-w-0 flex-1 rounded-2xl bg-muted/60 p-4">
                  <div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-semibold">{m.who}</p><p className="text-xs text-muted-foreground">{m.time}</p></div>
                  <p className="mt-1.5 text-sm text-foreground/80">{m.msg}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 rounded-2xl border p-3 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-primary/10">
            <textarea rows={3} placeholder="Nhập phản hồi..." className="w-full resize-none bg-transparent text-sm outline-hidden" />
            <div className="flex items-center justify-between"><button className="grid h-9 w-9 place-items-center rounded-xl hover:bg-muted" aria-label="Đính kèm"><Paperclip className="h-4 w-4" /></button><Btn><Send className="h-4 w-4" />Gửi</Btn></div>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Thông tin">
            <ul className="space-y-4">
              {info.map((x) => (
                <li key={x.l} className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-primary"><x.i className="h-4 w-4" /></span><div className="min-w-0"><p className="text-xs text-muted-foreground">{x.l}</p><p className="truncate text-sm font-medium">{x.v}</p></div></li>
              ))}
            </ul>
          </Panel>
          <Panel title="Thao tác">
            <div className="grid gap-2"><Btn>Đánh dấu đã giải quyết</Btn><Btn variant="ghost">Chuyển kỹ thuật viên khác</Btn><Btn variant="ghost">Đóng ticket</Btn></div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

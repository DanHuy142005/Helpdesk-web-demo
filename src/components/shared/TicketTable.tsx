import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { Ticket } from "@/data/mock";
import { PriorityBadge, StatusBadge } from "./StatusBadge";
import { Avatar } from "./Avatar";

export function TicketTable({ data }: { data: Ticket[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border">
      <table className="w-full min-w-[760px] text-sm">
        <thead>
          <tr className="bg-muted/70 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3">Mã</th><th className="px-4 py-3">Tiêu đề</th><th className="px-4 py-3">Người yêu cầu</th>
            <th className="px-4 py-3">Ưu tiên</th><th className="px-4 py-3">Trạng thái</th><th className="px-4 py-3">Ngày tạo</th><th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {data.map((t) => (
            <tr key={t.id} className="group border-t transition-colors hover:bg-accent/50">
              <td className="px-4 py-3.5 font-semibold text-primary">{t.id}</td>
              <td className="max-w-[260px] px-4 py-3.5"><p className="truncate font-medium">{t.title}</p><p className="text-xs text-muted-foreground">{t.category}</p></td>
              <td className="px-4 py-3.5"><div className="flex items-center gap-2"><Avatar name={t.requester} size="sm" /><span className="whitespace-nowrap">{t.requester}</span></div></td>
              <td className="px-4 py-3.5"><PriorityBadge priority={t.priority} /></td>
              <td className="px-4 py-3.5"><StatusBadge status={t.status} /></td>
              <td className="whitespace-nowrap px-4 py-3.5 text-muted-foreground">{t.createdAt}</td>
              <td className="px-4 py-3.5 text-right">
                <Link to="/tickets/$ticketId" params={{ ticketId: t.id }} className="inline-grid h-8 w-8 place-items-center rounded-xl text-muted-foreground transition-all group-hover:bg-card group-hover:text-primary group-hover:shadow-sm" aria-label={`Xem ${t.id}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

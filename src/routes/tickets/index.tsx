import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Filter, PlusCircle } from "lucide-react";
import { seo } from "@/lib/seo";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { TicketTable } from "@/components/shared/TicketTable";
import { BtnLink, Btn } from "@/components/shared/Btn";
import { tickets, type TicketStatus } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tickets/")({
  head: () => seo("Danh sách Ticket", "Quản lý và theo dõi tất cả yêu cầu hỗ trợ IT."),
  component: TicketList,
});

const tabs: ("Tất cả" | TicketStatus)[] = ["Tất cả", "Mới", "Đang xử lý", "Chờ phản hồi", "Đã giải quyết", "Đã đóng"];

function TicketList() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Tất cả");
  const data = tab === "Tất cả" ? tickets : tickets.filter((t) => t.status === tab);
  return (
    <div>
      <PageHeader title="Danh sách Ticket" subtitle={`${tickets.length} ticket trong hệ thống`} actions={<><Btn variant="ghost"><Filter className="h-4 w-4" />Bộ lọc</Btn><BtnLink to="/tickets/new"><PlusCircle className="h-4 w-4" />Tạo Ticket</BtnLink></>} />
      <Panel>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => {
            const count = t === "Tất cả" ? tickets.length : tickets.filter((x) => x.status === t).length;
            return (
              <button key={t} onClick={() => setTab(t)} className={cn("whitespace-nowrap rounded-xl px-3.5 py-2 text-sm font-medium transition-all", tab === t ? "bg-gradient-brand text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground")}>
                {t} <span className="ml-1 opacity-75">{count}</span>
              </button>
            );
          })}
        </div>
        <TicketTable data={data} />
      </Panel>
    </div>
  );
}

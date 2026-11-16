import { createFileRoute } from "@tanstack/react-router";
import { Laptop, Mail, Ticket, UserPlus } from "lucide-react";
import { seo } from "@/lib/seo";
import { PageHeader } from "@/components/shared/Panel";
import { Btn } from "@/components/shared/Btn";
import { Avatar } from "@/components/shared/Avatar";
import { employees } from "@/data/mock";

export const Route = createFileRoute("/employees")({
  head: () => seo("Nhân viên", "Danh bạ nhân viên, vai trò và thiết bị được cấp."),
  component: Employees,
});

function Employees() {
  return (
    <div>
      <PageHeader title="Nhân viên" subtitle={`${employees.length} người trong danh bạ mẫu`} actions={<Btn><UserPlus className="h-4 w-4" />Thêm nhân viên</Btn>} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {employees.map((e) => (
          <div key={e.email} className="card-soft card-hover p-5">
            <div className="flex items-center gap-3"><Avatar name={e.name} size="lg" /><div className="min-w-0"><p className="truncate font-semibold">{e.name}</p><p className="text-sm text-muted-foreground">{e.dept}</p></div>
              <span className="ml-auto rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">{e.role}</span></div>
            <p className="mt-4 flex items-center gap-2 truncate text-sm text-muted-foreground"><Mail className="h-4 w-4 shrink-0" />{e.email}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-muted/60 p-3"><p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Laptop className="h-3.5 w-3.5" />Thiết bị</p><p className="text-lg font-bold">{e.devices}</p></div>
              <div className="rounded-xl bg-muted/60 p-3"><p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Ticket className="h-3.5 w-3.5" />Ticket</p><p className="text-lg font-bold">{e.tickets}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRightLeft, Check, CheckCircle2, Circle, LifeBuoy, Sparkles } from "lucide-react";
import { seo } from "@/lib/seo";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { Btn } from "@/components/shared/Btn";
import { PriorityBadge } from "@/components/shared/StatusBadge";
import { Avatar } from "@/components/shared/Avatar";
import { tickets } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/helpdesk/resolve")({
  head: () => seo("Tự xử lý sự cố", "Helpdesk xử lý sự cố đơn giản theo hướng dẫn hoặc chuyển kỹ thuật viên."),
  component: Resolve,
});

const steps = ["Xác minh thông tin tài khoản người dùng trên AD", "Yêu cầu người dùng đăng xuất và đăng nhập lại VPN client", "Xóa cache chứng chỉ và cập nhật cấu hình VPN mới nhất", "Kiểm tra kết nối Internet và tường lửa cá nhân"];
const techs = [{ n: "Trần Quốc Bảo", s: "Mạng & Bảo mật", load: 4 }, { n: "Ngô Đức Mạnh", s: "Hệ thống & Server", load: 6 }, { n: "Lê Hoàng Phúc", s: "Phần cứng", load: 2 }];

function Resolve() {
  const queue = tickets.filter((t) => t.status !== "Đã đóng" && t.status !== "Đã giải quyết");
  const [sel, setSel] = useState(queue[0]!);
  const [done, setDone] = useState<number[]>([]);
  const [result, setResult] = useState<null | "solved" | "escalated">(null);
  const [tech, setTech] = useState(techs[0]!.n);
  const toggle = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pick = (t: (typeof queue)[number]) => { setSel(t); setDone([]); setResult(null); };
  return (
    <div>
      <PageHeader title="Tự xử lý sự cố" subtitle="Xử lý tuyến 1 theo kịch bản – chuyển Technician khi không giải quyết được" />
      <div className="grid gap-5 xl:grid-cols-[300px_1fr_320px]">
        <Panel title="Hàng đợi" subtitle={`${queue.length} ticket`}>
          <ul className="space-y-2">
            {queue.map((t) => (
              <li key={t.id}><button onClick={() => pick(t)} className={cn("w-full rounded-2xl border p-3 text-left transition-all", sel.id === t.id ? "border-primary/40 bg-accent shadow-soft" : "hover:bg-muted")}>
                <div className="flex justify-between gap-2"><span className="text-xs font-semibold text-primary">{t.id}</span><PriorityBadge priority={t.priority} /></div>
                <p className="mt-1 line-clamp-1 text-sm font-medium">{t.title}</p>
              </button></li>
            ))}
          </ul>
        </Panel>
        <div className="space-y-5">
          <Panel title={sel.title} subtitle={`${sel.id} · ${sel.requester} · ${sel.department}`}>
            <p className="rounded-2xl bg-muted/60 p-4 text-sm">{sel.description}</p>
            <div className="mt-5 flex items-center gap-2 rounded-2xl bg-gradient-hero p-3 text-sm"><Sparkles className="h-4 w-4 shrink-0 text-primary" />Gợi ý kịch bản: <b>Khắc phục sự cố {sel.category}</b></div>
            <ol className="mt-5 space-y-2">
              {steps.map((s, i) => (
                <li key={s}><button onClick={() => toggle(i)} className={cn("flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left text-sm transition-all hover:border-primary/30", done.includes(i) && "border-success/40 bg-success/5")}>
                  {done.includes(i) ? <CheckCircle2 className="h-5 w-5 shrink-0 text-success" /> : <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />}
                  <span><b className="mr-1">Bước {i + 1}.</b>{s}</span>
                </button></li>
              ))}
            </ol>
            <div className="mt-3 h-2 rounded-full bg-muted"><div className="h-2 rounded-full bg-gradient-brand transition-all" style={{ width: `${(done.length / steps.length) * 100}%` }} /></div>
          </Panel>
          {result && (
            <div className={cn("card-soft flex items-center gap-3 p-5 animate-in fade-in", result === "solved" ? "bg-success/5" : "bg-accent")}>
              {result === "solved" ? <Check className="h-6 w-6 text-success" /> : <ArrowRightLeft className="h-6 w-6 text-primary" />}
              <p className="text-sm font-medium">{result === "solved" ? `Đã đánh dấu ${sel.id} là "Đã giải quyết" và gửi thông báo cho người dùng.` : `Đã chuyển ${sel.id} cho kỹ thuật viên ${tech}.`}</p>
            </div>
          )}
        </div>
        <div className="space-y-5">
          <Panel title="Kết quả xử lý">
            <Btn className="w-full" onClick={() => setResult("solved")}><CheckCircle2 className="h-4 w-4" />Đã giải quyết</Btn>
            <p className="my-4 text-center text-xs text-muted-foreground">— hoặc chuyển tuyến 2 —</p>
            <ul className="space-y-2">
              {techs.map((t) => (
                <li key={t.n}><button onClick={() => setTech(t.n)} className={cn("flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all", tech === t.n ? "border-primary/40 bg-accent" : "hover:bg-muted")}>
                  <Avatar name={t.n} /><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{t.n}</p><p className="text-xs text-muted-foreground">{t.s} · {t.load} việc</p></div>
                </button></li>
              ))}
            </ul>
            <textarea rows={3} placeholder="Ghi chú cho kỹ thuật viên..." className="mt-3 w-full rounded-xl border bg-card p-3 text-sm outline-hidden focus:ring-4 focus:ring-primary/10" />
            <Btn variant="ghost" className="mt-3 w-full" onClick={() => setResult("escalated")}><ArrowRightLeft className="h-4 w-4" />Chuyển Technician</Btn>
          </Panel>
          <div className="card-soft flex items-center gap-3 p-4 text-sm text-muted-foreground"><LifeBuoy className="h-5 w-5 text-primary" />72% sự cố được xử lý ngay ở tuyến 1</div>
        </div>
      </div>
    </div>
  );
}

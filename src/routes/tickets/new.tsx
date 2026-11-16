import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, UploadCloud, Laptop, AppWindow, Wifi, KeyRound, Mail, Server } from "lucide-react";
import { seo } from "@/lib/seo";
import { Panel, PageHeader } from "@/components/shared/Panel";
import { Btn } from "@/components/shared/Btn";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tickets/new")({
  head: () => seo("Tạo Ticket", "Gửi yêu cầu hỗ trợ IT mới."),
  component: NewTicket,
});

const cats = [{ i: Laptop, t: "Phần cứng" }, { i: AppWindow, t: "Phần mềm" }, { i: Wifi, t: "Mạng" }, { i: KeyRound, t: "Tài khoản" }, { i: Mail, t: "Email" }, { i: Server, t: "Hệ thống" }];
const prios = ["Thấp", "Trung bình", "Cao", "Khẩn cấp"];
const field = "w-full rounded-xl border bg-card px-4 py-3 text-sm outline-hidden transition-all focus:border-primary/40 focus:ring-4 focus:ring-primary/10";

function NewTicket() {
  const [cat, setCat] = useState("Phần cứng");
  const [prio, setPrio] = useState("Trung bình");
  const [sent, setSent] = useState(false);
  const nav = useNavigate();
  if (sent) return (
    <div className="card-soft mx-auto max-w-lg p-10 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-cyan text-primary-foreground shadow-glow"><CheckCircle2 className="h-8 w-8" /></span>
      <h2 className="mt-5 text-xl font-bold">Đã gửi yêu cầu thành công!</h2>
      <p className="mt-2 text-sm text-muted-foreground">Mã ticket của bạn là <b className="text-primary">TK-1043</b>. Helpdesk sẽ phản hồi trong vòng 15 phút.</p>
      <div className="mt-6 flex justify-center gap-2"><Btn variant="ghost" onClick={() => setSent(false)}>Tạo ticket khác</Btn><Btn onClick={() => nav({ to: "/tickets" })}>Xem danh sách</Btn></div>
    </div>
  );
  return (
    <div>
      <PageHeader title="Tạo Ticket mới" subtitle="Mô tả càng chi tiết, chúng tôi hỗ trợ càng nhanh" />
      <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <Panel title="Thông tin yêu cầu">
          <div className="space-y-5">
            <div><label className="mb-2 block text-sm font-medium">Tiêu đề</label><input required className={field} placeholder="VD: Không kết nối được Wi-Fi văn phòng" /></div>
            <div>
              <label className="mb-2 block text-sm font-medium">Danh mục</label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {cats.map((c) => (
                  <button type="button" key={c.t} onClick={() => setCat(c.t)} className={cn("rounded-2xl border p-3 text-center text-xs font-medium transition-all hover:-translate-y-0.5", cat === c.t ? "border-primary/40 bg-accent text-accent-foreground shadow-soft" : "hover:bg-muted")}>
                    <c.i className="mx-auto mb-1.5 h-5 w-5" />{c.t}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="mb-2 block text-sm font-medium">Mô tả chi tiết</label><textarea required rows={6} className={field} placeholder="Mô tả sự cố, thời điểm xảy ra, thông báo lỗi..." /></div>
            <div className="grid place-items-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors hover:border-primary/40 hover:bg-accent/40">
              <UploadCloud className="h-8 w-8 text-primary" /><p className="mt-2 text-sm font-medium">Kéo thả ảnh chụp màn hình vào đây</p><p className="text-xs text-muted-foreground">PNG, JPG tối đa 10MB</p>
            </div>
          </div>
        </Panel>
        <div className="space-y-5">
          <Panel title="Mức độ ưu tiên">
            <div className="grid grid-cols-2 gap-2">
              {prios.map((p) => <button type="button" key={p} onClick={() => setPrio(p)} className={cn("rounded-xl border px-3 py-2.5 text-sm font-medium transition-all", prio === p ? "bg-gradient-brand text-primary-foreground shadow-glow" : "hover:bg-muted")}>{p}</button>)}
            </div>
          </Panel>
          <Panel title="Thông tin liên hệ">
            <div className="space-y-3"><input className={field} defaultValue="Nguyễn Minh Anh" /><input className={field} defaultValue="Phòng Kế toán – Tầng 4" /><input className={field} placeholder="Số máy lẻ" /></div>
          </Panel>
          <Btn type="submit" className="w-full py-3.5">Gửi yêu cầu</Btn>
        </div>
      </form>
    </div>
  );
}

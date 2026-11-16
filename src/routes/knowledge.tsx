import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Eye, Search } from "lucide-react";
import { seo } from "@/lib/seo";
import { articles } from "@/data/mock";

export const Route = createFileRoute("/knowledge")({
  head: () => seo("Knowledge Base", "Thư viện hướng dẫn tự khắc phục sự cố IT thường gặp."),
  component: Knowledge,
});

const cats = ["Tất cả", "Mạng", "Tài khoản", "Phần cứng", "Phần mềm", "Email", "Bảo mật"];

function Knowledge() {
  return (
    <div className="space-y-5">
      <section className="relative overflow-hidden rounded-[20px] border bg-gradient-hero p-8 text-center shadow-soft sm:p-12">
        <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-gradient-cyan opacity-25 blur-2xl" />
        <h1 className="relative text-2xl font-bold sm:text-3xl">Bạn cần hỗ trợ gì hôm nay?</h1>
        <p className="relative mt-2 text-sm text-muted-foreground">Tìm câu trả lời từ hơn 86 bài viết hướng dẫn</p>
        <label className="glass relative mx-auto mt-6 flex max-w-xl items-center gap-3 rounded-2xl px-5 py-4 shadow-soft"><Search className="h-5 w-5 text-muted-foreground" /><input className="w-full bg-transparent text-sm outline-hidden" placeholder="VD: cách kết nối VPN" /></label>
        <div className="relative mt-5 flex flex-wrap justify-center gap-2">{cats.map((c) => <span key={c} className="glass cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors hover:text-primary">{c}</span>)}</div>
      </section>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((a) => (
          <article key={a.title} className="card-soft card-hover cursor-pointer p-5">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-primary"><BookOpen className="h-5 w-5" /></span>
            <span className="mt-4 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">{a.category}</span>
            <h3 className="mt-2 font-semibold leading-snug">{a.title}</h3>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground"><span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{a.views.toLocaleString("vi-VN")} lượt xem</span><span>{a.updated}</span></div>
          </article>
        ))}
      </div>
    </div>
  );
}

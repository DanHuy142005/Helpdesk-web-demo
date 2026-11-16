import { Bell, Menu, Search, Settings, CalendarDays } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
      <button onClick={onMenu} className="grid h-11 w-11 place-items-center rounded-2xl border bg-card shadow-sm lg:hidden" aria-label="Mở menu"><Menu className="h-5 w-5" /></button>
      <div className="flex min-w-0 items-center gap-3">
        <div className="card-soft hidden min-w-0 px-4 py-2.5 md:block">
          <p className="truncate text-sm font-semibold">Chào buổi chiều, Huy 👋</p>
          <p className="truncate text-xs text-muted-foreground">Bạn có 3 ticket cần xử lý hôm nay</p>
        </div>
        <label className="card-soft flex min-w-0 flex-1 items-center gap-2 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input placeholder="Tìm ticket, tài sản, bài viết..." className="w-full min-w-0 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground" />
        </label>
      </div>
      <div className="card-soft flex items-center gap-1 p-1.5 sm:gap-2 sm:pr-4">
        <span className="hidden items-center gap-2 px-2 text-xs text-muted-foreground xl:flex"><CalendarDays className="h-4 w-4" />16/11/2026</span>
        <button className="relative grid h-9 w-9 place-items-center rounded-xl hover:bg-muted" aria-label="Thông báo"><Bell className="h-[18px] w-[18px]" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" /></button>
        <button className="hidden h-9 w-9 place-items-center rounded-xl hover:bg-muted sm:grid" aria-label="Cài đặt"><Settings className="h-[18px] w-[18px]" /></button>
        <Avatar name="Huy Bui" />
        <div className="hidden leading-tight sm:block"><p className="text-sm font-semibold">Huy Bùi</p><p className="text-xs text-muted-foreground">Quản trị viên</p></div>
      </div>
    </header>
  );
}

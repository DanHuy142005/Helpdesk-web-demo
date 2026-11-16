import { BarChart3, BookOpen, Boxes, Headset, LayoutDashboard, LifeBuoy, PlusCircle, ShieldCheck, Ticket, User, Users, Wrench, AppWindow } from "lucide-react";

export const navGroups = [
  { label: "Dashboard", items: [
    { title: "Quản trị (Admin)", to: "/", icon: ShieldCheck },
    { title: "Nhân viên (End User)", to: "/dashboard/user", icon: User },
    { title: "Helpdesk", to: "/dashboard/helpdesk", icon: Headset },
    { title: "Kỹ thuật viên", to: "/dashboard/technician", icon: Wrench },
  ]},
  { label: "Ticket", items: [
    { title: "Danh sách Ticket", to: "/tickets", icon: Ticket },
    { title: "Tạo Ticket", to: "/tickets/new", icon: PlusCircle },
    { title: "Tự xử lý sự cố", to: "/helpdesk/resolve", icon: LifeBuoy },
  ]},
  { label: "Quản lý", items: [
    { title: "Tài sản", to: "/assets", icon: Boxes },
    { title: "Nhân viên", to: "/employees", icon: Users },
    { title: "Phần mềm", to: "/software", icon: AppWindow },
    { title: "Knowledge Base", to: "/knowledge", icon: BookOpen },
    { title: "Báo cáo", to: "/reports", icon: BarChart3 },
  ]},
] as const;
export { LayoutDashboard };

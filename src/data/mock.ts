export type TicketStatus = "Mới" | "Đang xử lý" | "Chờ phản hồi" | "Đã giải quyết" | "Đã đóng";
export type Priority = "Thấp" | "Trung bình" | "Cao" | "Khẩn cấp";

export interface Ticket {
  id: string;
  title: string;
  requester: string;
  department: string;
  category: string;
  priority: Priority;
  status: TicketStatus;
  assignee: string;
  createdAt: string;
  description: string;
}

export const tickets: Ticket[] = [
  { id: "TK-1042", title: "Không kết nối được VPN công ty", requester: "Nguyễn Minh Anh", department: "Kế toán", category: "Mạng", priority: "Cao", status: "Đang xử lý", assignee: "Trần Quốc Bảo", createdAt: "16/11/2026 08:12", description: "Từ sáng nay tôi không thể kết nối VPN, báo lỗi 'Authentication failed' dù đã nhập đúng mật khẩu." },
  { id: "TK-1041", title: "Máy in tầng 3 bị kẹt giấy liên tục", requester: "Lê Thu Hà", department: "Hành chính", category: "Phần cứng", priority: "Trung bình", status: "Mới", assignee: "Chưa phân công", createdAt: "16/11/2026 07:45", description: "Máy in HP LaserJet tầng 3 kẹt giấy sau mỗi 5-6 trang in." },
  { id: "TK-1040", title: "Yêu cầu cài đặt Adobe Photoshop", requester: "Phạm Gia Huy", department: "Marketing", category: "Phần mềm", priority: "Thấp", status: "Chờ phản hồi", assignee: "Võ Thanh Tâm", createdAt: "15/11/2026 16:30", description: "Cần cài Photoshop 2026 để thiết kế banner cho chiến dịch tháng 12." },
  { id: "TK-1039", title: "Outlook không đồng bộ email", requester: "Đỗ Khánh Linh", department: "Kinh doanh", category: "Email", priority: "Cao", status: "Đã giải quyết", assignee: "Trần Quốc Bảo", createdAt: "15/11/2026 14:05", description: "Outlook không nhận email mới từ 2 giờ chiều." },
  { id: "TK-1038", title: "Laptop khởi động rất chậm", requester: "Hoàng Văn Nam", department: "Kỹ thuật", category: "Phần cứng", priority: "Trung bình", status: "Đang xử lý", assignee: "Ngô Đức Mạnh", createdAt: "15/11/2026 10:20", description: "Laptop Dell mất hơn 5 phút để khởi động vào Windows." },
  { id: "TK-1037", title: "Server ERP không truy cập được", requester: "Bùi Thị Mai", department: "Tài chính", category: "Hệ thống", priority: "Khẩn cấp", status: "Đang xử lý", assignee: "Ngô Đức Mạnh", createdAt: "15/11/2026 09:02", description: "Toàn bộ phòng Tài chính không truy cập được hệ thống ERP." },
  { id: "TK-1036", title: "Quên mật khẩu tài khoản Windows", requester: "Trịnh Quang Vinh", department: "Nhân sự", category: "Tài khoản", priority: "Thấp", status: "Đã đóng", assignee: "Helpdesk", createdAt: "14/11/2026 17:40", description: "Cần đặt lại mật khẩu đăng nhập Windows." },
  { id: "TK-1035", title: "Màn hình thứ hai không nhận tín hiệu", requester: "Vũ Ngọc Trâm", department: "Thiết kế", category: "Phần cứng", priority: "Trung bình", status: "Đã giải quyết", assignee: "Võ Thanh Tâm", createdAt: "14/11/2026 11:15", description: "Màn hình Dell 27 inch không hiển thị khi cắm HDMI." },
];

export const statusStyles: Record<TicketStatus, string> = {
  "Mới": "bg-info/10 text-info",
  "Đang xử lý": "bg-primary/10 text-primary",
  "Chờ phản hồi": "bg-warning/15 text-warning",
  "Đã giải quyết": "bg-success/12 text-success",
  "Đã đóng": "bg-muted text-muted-foreground",
};
export const priorityStyles: Record<Priority, string> = {
  "Thấp": "bg-muted text-muted-foreground",
  "Trung bình": "bg-cyan/15 text-info",
  "Cao": "bg-warning/15 text-warning",
  "Khẩn cấp": "bg-destructive/12 text-destructive",
};

export const monthly = ["T1","T2","T3","T4","T5","T6","T7","T8","T9","T10","T11","T12"].map((m, i) => ({
  month: m,
  open: [30, 42, 28, 50, 38, 45, 52, 40, 36, 48, 55, 33][i],
  resolved: [52, 60, 48, 70, 62, 66, 74, 58, 55, 72, 80, 50][i],
  closed: [20, 25, 18, 30, 22, 28, 32, 24, 20, 30, 35, 21][i],
}));

export const byCategory = [
  { name: "Phần cứng", value: 34, color: "var(--chart-1)" },
  { name: "Phần mềm", value: 26, color: "var(--chart-2)" },
  { name: "Mạng", value: 18, color: "var(--chart-3)" },
  { name: "Tài khoản", value: 12, color: "var(--chart-4)" },
  { name: "Email", value: 10, color: "var(--chart-5)" },
];

export const assets = [
  { id: "AS-0231", name: "Dell Latitude 7440", type: "Laptop", user: "Nguyễn Minh Anh", status: "Đang dùng", purchase: "03/2025", value: "32.500.000₫" },
  { id: "AS-0232", name: "MacBook Pro 14 M3", type: "Laptop", user: "Phạm Gia Huy", status: "Đang dùng", purchase: "06/2025", value: "48.900.000₫" },
  { id: "AS-0118", name: "HP LaserJet M428", type: "Máy in", user: "Phòng Hành chính", status: "Bảo trì", purchase: "11/2023", value: "12.300.000₫" },
  { id: "AS-0305", name: "Dell UltraSharp U2723", type: "Màn hình", user: "Vũ Ngọc Trâm", status: "Đang dùng", purchase: "01/2026", value: "14.200.000₫" },
  { id: "AS-0099", name: "Cisco Catalyst 9200", type: "Switch", user: "Phòng Server", status: "Đang dùng", purchase: "08/2022", value: "65.000.000₫" },
  { id: "AS-0277", name: "Lenovo ThinkPad T14", type: "Laptop", user: "—", status: "Trong kho", purchase: "09/2025", value: "27.800.000₫" },
];

export const employees = [
  { name: "Nguyễn Minh Anh", email: "anh.nm@congty.vn", dept: "Kế toán", role: "Nhân viên", devices: 2, tickets: 5 },
  { name: "Trần Quốc Bảo", email: "bao.tq@congty.vn", dept: "IT", role: "Technician", devices: 3, tickets: 42 },
  { name: "Lê Thu Hà", email: "ha.lt@congty.vn", dept: "Hành chính", role: "Nhân viên", devices: 1, tickets: 3 },
  { name: "Ngô Đức Mạnh", email: "manh.nd@congty.vn", dept: "IT", role: "Technician", devices: 4, tickets: 38 },
  { name: "Võ Thanh Tâm", email: "tam.vt@congty.vn", dept: "IT", role: "Helpdesk", devices: 2, tickets: 61 },
  { name: "Phạm Gia Huy", email: "huy.pg@congty.vn", dept: "Marketing", role: "Nhân viên", devices: 2, tickets: 7 },
];

export const software = [
  { name: "Microsoft 365 Business", vendor: "Microsoft", used: 186, total: 200, expiry: "31/12/2026", color: "bg-gradient-blue" },
  { name: "Adobe Creative Cloud", vendor: "Adobe", used: 18, total: 20, expiry: "15/03/2027", color: "bg-gradient-rose" },
  { name: "Slack Pro", vendor: "Salesforce", used: 142, total: 150, expiry: "01/06/2027", color: "bg-gradient-violet" },
  { name: "Kaspersky Endpoint", vendor: "Kaspersky", used: 210, total: 250, expiry: "20/02/2027", color: "bg-gradient-cyan" },
  { name: "Zoom Workplace", vendor: "Zoom", used: 45, total: 50, expiry: "10/01/2027", color: "bg-gradient-blue" },
  { name: "AutoCAD 2026", vendor: "Autodesk", used: 8, total: 10, expiry: "28/08/2027", color: "bg-gradient-rose" },
];

export const articles = [
  { title: "Cách kết nối VPN công ty trên Windows và macOS", category: "Mạng", views: 1284, updated: "12/11/2026" },
  { title: "Đặt lại mật khẩu tài khoản email doanh nghiệp", category: "Tài khoản", views: 986, updated: "10/11/2026" },
  { title: "Khắc phục lỗi máy in kẹt giấy", category: "Phần cứng", views: 742, updated: "08/11/2026" },
  { title: "Cấu hình chữ ký email trong Outlook", category: "Email", views: 531, updated: "05/11/2026" },
  { title: "Hướng dẫn yêu cầu cài đặt phần mềm mới", category: "Phần mềm", views: 468, updated: "02/11/2026" },
  { title: "Bảo mật: Nhận diện email lừa đảo (phishing)", category: "Bảo mật", views: 1530, updated: "28/10/2026" },
];

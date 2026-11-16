import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { byCategory, monthly } from "@/data/mock";

const tooltipStyle = { borderRadius: 14, border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)", fontSize: 12 };

export function DonutChart({ data = byCategory, total, label = "Tổng Ticket" }: { data?: { name: string; value: number; color: string }[]; total?: string; label?: string }) {
  const sum = total ?? String(data.reduce((a, b) => a + b.value, 0));
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="relative h-48 w-48 shrink-0">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={62} outerRadius={88} paddingAngle={4} cornerRadius={8} stroke="none">
              {data.map((d) => <Cell key={d.name} fill={d.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div><p className="text-3xl font-bold">{sum}</p><p className="text-xs text-muted-foreground">{label}</p></div>
        </div>
      </div>
      <ul className="w-full space-y-3">
        {data.map((d) => (
          <li key={d.name} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex min-w-0 items-center gap-2"><span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: d.color }} /><span className="truncate">{d.name}</span></span>
            <span className="font-semibold">{d.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TicketBarChart({ height = 260 }: { height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer>
        <BarChart data={monthly} barGap={4} margin={{ left: -20, right: 0, top: 8 }}>
          <defs>
            <linearGradient id="gViolet" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-1)" /><stop offset="100%" stopColor="var(--violet)" stopOpacity={0.7} /></linearGradient>
            <linearGradient id="gCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-2)" /><stop offset="100%" stopColor="var(--info)" stopOpacity={0.7} /></linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--accent)", radius: 8 }} />
          <Bar dataKey="resolved" name="Đã giải quyết" fill="url(#gCyan)" radius={[8, 8, 8, 8]} barSize={10} />
          <Bar dataKey="open" name="Đang mở" fill="url(#gViolet)" radius={[8, 8, 8, 8]} barSize={10} />
          <Bar dataKey="closed" name="Đã đóng" fill="var(--chart-3)" radius={[8, 8, 8, 8]} barSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

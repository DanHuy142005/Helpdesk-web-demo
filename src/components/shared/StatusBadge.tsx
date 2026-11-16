import { cn } from "@/lib/utils";
import { priorityStyles, statusStyles, type Priority, type TicketStatus } from "@/data/mock";

export function StatusBadge({ status }: { status: TicketStatus }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap", statusStyles[status])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={cn("inline-flex rounded-lg px-2 py-0.5 text-xs font-medium whitespace-nowrap", priorityStyles[priority])}>
      {priority}
    </span>
  );
}

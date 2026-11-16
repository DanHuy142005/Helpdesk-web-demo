import { cn } from "@/lib/utils";
const tones = ["bg-gradient-blue", "bg-gradient-violet", "bg-gradient-cyan", "bg-gradient-rose"];
export function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const parts = name.split(" ");
  const initials = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
  const tone = tones[name.length % tones.length];
  const s = size === "sm" ? "h-7 w-7 text-[10px]" : size === "lg" ? "h-12 w-12 text-sm" : "h-9 w-9 text-xs";
  return <span className={cn("grid shrink-0 place-items-center rounded-full font-bold text-primary-foreground", tone, s)}>{initials.toUpperCase()}</span>;
}

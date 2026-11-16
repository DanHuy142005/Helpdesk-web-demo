import { Link } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const base = "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-50";
export const btn = {
  primary: cn(base, "bg-gradient-brand text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110"),
  ghost: cn(base, "border bg-card text-foreground hover:border-primary/30 hover:bg-accent hover:text-accent-foreground"),
};
export function Btn({ variant = "primary", className, ...p }: ComponentProps<"button"> & { variant?: keyof typeof btn }) {
  return <button className={cn(btn[variant], className)} {...p} />;
}
export function BtnLink({ to, variant = "primary", children }: { to: NonNullable<ComponentProps<typeof Link>["to"]>; variant?: keyof typeof btn; children: ReactNode }) {
  return <Link to={to} className={btn[variant]}>{children}</Link>;
}

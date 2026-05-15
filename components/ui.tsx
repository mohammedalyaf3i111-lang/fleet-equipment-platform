import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, Info } from "lucide-react";
import { clsx } from "clsx";
import { CitySelectField } from "@/components/city-fields";

export function ButtonLink({
  href, children, variant = "primary", size = "md"
}: {
  href: string; children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "whatsapp";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link href={href} className={clsx(
      "inline-flex items-center justify-center gap-2 rounded-md font-bold transition duration-300 ease-out hover:-translate-y-0.5",
      size === "sm" && "min-h-9 px-4 py-2 text-xs",
      size === "md" && "min-h-11 px-5 py-2.5 text-sm",
      size === "lg" && "min-h-13 px-7 py-3.5 text-base",
      variant === "primary" && "bg-gold text-navy shadow-xl shadow-gold/25 hover:bg-[#d6aa4d] hover:shadow-2xl hover:shadow-gold/35",
      variant === "secondary" && "border border-gold/55 bg-white/10 text-white shadow-lg shadow-black/10 backdrop-blur hover:border-gold hover:bg-white/18",
      variant === "ghost" && "border border-navy/15 bg-white text-navy shadow-sm hover:border-gold hover:shadow-md",
      variant === "danger" && "bg-red-600 text-white shadow-sm hover:bg-red-700",
      variant === "whatsapp" && "bg-[#25D366] text-white shadow-sm hover:bg-[#1ebe5d]"
    )}>
      {children}
      <ArrowLeft className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, align = "start" }: {
  eyebrow?: string; title: string; subtitle?: string; align?: "start" | "center";
}) {
  return (
    <div className={clsx("mb-8", align === "center" && "text-center")}>
      {eyebrow && <p className="mb-3 text-sm font-bold text-gold">{eyebrow}</p>}
      <h2 className={clsx("max-w-3xl text-2xl font-bold text-navy md:text-4xl", align === "center" && "mx-auto")}>{title}</h2>
      {subtitle && <p className={clsx("mt-4 max-w-2xl text-base leading-8 text-steel", align === "center" && "mx-auto")}>{subtitle}</p>}
    </div>
  );
}

export function Section({ title, eyebrow, subtitle, children, className }: {
  title: string; eyebrow?: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <section className={clsx("px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
}

export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <p className="text-sm font-semibold text-steel">{label}</p>
      <p className="mt-2 text-2xl font-black text-navy">{value}</p>
      <p className="mt-2 text-xs leading-6 text-slate-400">{hint}</p>
    </div>
  );
}

export function IconCard({ title, body, icon: Icon }: { title: string; body: string; icon: LucideIcon }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-lg font-black text-navy">{title}</h3>
      <p className="mt-3 leading-7 text-steel">{body}</p>
    </div>
  );
}

export function StatusBadge({ children, variant = "default" }: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
}) {
  const icons = { default: CheckCircle2, success: CheckCircle2, warning: AlertCircle, error: XCircle, info: Info };
  const Icon = icons[variant];
  return (
    <span className={clsx(
      "inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold",
      variant === "default" && "border border-gold/40 bg-gold/10 text-navy",
      variant === "success" && "border border-green-200 bg-green-50 text-green-800",
      variant === "warning" && "border border-amber-200 bg-amber-50 text-amber-800",
      variant === "error" && "border border-red-200 bg-red-50 text-red-800",
      variant === "info" && "border border-blue-200 bg-blue-50 text-blue-800"
    )}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {children}
    </span>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("animate-pulse rounded-md bg-slate-200", className)} />;
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <Skeleton className="h-40 w-full" />
      <Skeleton className="mt-4 h-5 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => <CardSkeleton key={i} />)}
    </div>
  );
}

export function Field({ label, name, type = "text", required = true, as = "input" }: {
  label: string; name: string; type?: string; required?: boolean; as?: "input" | "textarea" | "select";
}) {
  const className = "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";
  if (as === "select") return <CitySelectField label={label} name={name} required={required} />;
  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      {as === "textarea" ? <textarea name={name} required={required} className={className} rows={4} /> : <input name={name} type={type} required={required} className={className} />}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0c2040] sm:w-auto">
      {children}
    </button>
  );
}

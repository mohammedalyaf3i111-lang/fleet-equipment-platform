import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";
import { CitySelectField } from "@/components/city-fields";

export function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "ghost" }) {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition duration-300 ease-out hover:-translate-y-0.5",
        variant === "primary" && "bg-gold px-7 py-3.5 text-base text-navy shadow-xl shadow-gold/25 hover:bg-[#d6aa4d] hover:shadow-2xl hover:shadow-gold/35",
        variant === "secondary" && "border border-gold/55 bg-white/10 px-6 py-3.5 text-base text-white shadow-lg shadow-black/10 backdrop-blur hover:border-gold hover:bg-white/18",
        variant === "ghost" && "border border-navy/15 bg-white text-navy shadow-sm hover:border-gold hover:shadow-md"
      )}
    >
      {children}
      <ArrowLeft className="h-4 w-4" aria-hidden />
    </Link>
  );
}

export function Section({ title, eyebrow, children, className }: { title: string; eyebrow?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={clsx("px-4 py-14 sm:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {eyebrow ? <p className="mb-3 text-sm font-bold text-gold">{eyebrow}</p> : null}
        <h2 className="max-w-3xl text-2xl font-bold text-navy md:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <p className="text-sm text-steel">{label}</p>
      <p className="mt-2 text-2xl font-bold text-navy">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

export function IconCard({ title, body, icon: Icon }: { title: string; body: string; icon: LucideIcon }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-navy text-gold">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      <p className="mt-3 leading-7 text-steel">{body}</p>
    </div>
  );
}

export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md border border-gold/40 bg-gold/10 px-2.5 py-1 text-xs font-bold text-navy">
      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
      {children}
    </span>
  );
}

export function Field({ label, name, type = "text", required = true, as = "input" }: { label: string; name: string; type?: string; required?: boolean; as?: "input" | "textarea" | "select" }) {
  const className = "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";
  if (as === "select") return <CitySelectField label={label} name={name} required={required} />;

  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      {as === "textarea" ? (
        <textarea name={name} required={required} className={className} rows={4} />
      ) : (
        <input name={name} type={type} required={required} className={className} />
      )}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-ink sm:w-auto">
      {children}
    </button>
  );
}

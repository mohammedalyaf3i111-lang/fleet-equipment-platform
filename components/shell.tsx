"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ShieldCheck, Twitter, Linkedin, Instagram, FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui";
import { LanguageSwitcher } from "@/components/language-switcher";
import { brand } from "@/lib/brand";
import { officialWhatsAppDisplay, officialWhatsAppLink } from "@/lib/contact";

const navItems = [
  { href: "/", key: "home" },
  { href: "/equipment", key: "equipment" },
  { href: "/request-equipment", key: "request" },
  { href: "/become-supplier", key: "supplier" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" }
] as const;

export function PublicShell({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3.5">
            <Image src="/logo.svg" alt={t("brand.name")} width={56} height={56} priority className="h-14 w-14" />
            <span>
              <span className="flex items-center gap-2 text-xl font-black leading-tight text-navy">
                {t("brand.name")}
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/60 bg-amber-50 px-2 py-0.5 text-[10px] font-black text-amber-700">
                  <FlaskConical className="h-2.5 w-2.5" />
                  Beta
                </span>
              </span>
              <span className="block text-xs font-semibold text-steel">{t("brand.englishName")}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-ink lg:flex">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`relative pb-0.5 transition hover:text-gold ${isActive ? "text-gold" : "text-navy"}`}>
                  {t(`nav.${item.key}`)}
                  {isActive && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gold" />}
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/10 px-4 py-2 text-xs font-black text-[#128C7E] transition hover:bg-[#25D366]/20">
              <span className="h-2 w-2 rounded-full bg-[#25D366]" />
              واتساب
            </a>
            <LanguageSwitcher />
            <ButtonLink href="/login" variant="ghost">{t("nav.login")}</ButtonLink>
            <ButtonLink href="/request-equipment">{t("actions.requestEquipment")}</ButtonLink>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher compact />
            <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-md border border-slate-200 p-2 text-navy" aria-label="قائمة">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-3 lg:hidden">
            <nav className="grid gap-1">
              {navItems.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`rounded-md px-4 py-2.5 text-sm font-bold transition ${isActive ? "bg-gold/10 text-gold" : "text-navy hover:bg-mist"}`}>
                    {t(`nav.${item.key}`)}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-4 grid gap-2">
              <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-md bg-[#25D366] py-3 text-sm font-black text-white">تواصل عبر واتساب</a>
              <Link href="/request-equipment" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-md bg-gold py-3 text-sm font-black text-navy">{t("actions.requestEquipment")}</Link>
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center justify-center rounded-md border border-navy/15 py-3 text-sm font-bold text-navy">{t("nav.login")}</Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Beta notice banner ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-xs font-bold text-amber-800">
        <FlaskConical className="h-3.5 w-3.5 shrink-0" />
        <span>
          فليت معدات — نسخة تجريبية Beta · هذه نسخة تجريبية، بعض الخدمات قيد الاختبار والتفعيل.
        </span>
      </div>

      {children}
      <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-slate-900/25 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] ltr:left-5 ltr:right-auto">
        {t("actions.whatsapp")}
      </a>
      <footer className="bg-navy px-4 pt-14 pb-0 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <Image src="/logo.svg" alt={t("brand.name")} width={46} height={46} className="h-11 w-11" />
                <div>
                  <h2 className="text-xl font-black">{t("brand.name")}</h2>
                  <p className="text-xs text-white/60">{brand.englishName}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/65">{t("brand.subtitle")}</p>
              <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#25D366]/15 px-4 py-2.5 text-sm font-bold text-[#25D366] transition hover:bg-[#25D366]/25">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" />
                {officialWhatsAppDisplay}
              </a>
              <div className="mt-5 flex gap-3">
                <a href="#" aria-label="Twitter" className="rounded-md border border-white/15 p-2 text-white/50 transition hover:border-gold hover:text-gold"><Twitter className="h-4 w-4" /></a>
                <a href="#" aria-label="LinkedIn" className="rounded-md border border-white/15 p-2 text-white/50 transition hover:border-gold hover:text-gold"><Linkedin className="h-4 w-4" /></a>
                <a href="#" aria-label="Instagram" className="rounded-md border border-white/15 p-2 text-white/50 transition hover:border-gold hover:text-gold"><Instagram className="h-4 w-4" /></a>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-black text-gold">روابط سريعة</h3>
              <nav className="grid gap-2.5 text-sm text-white/70">
                <Link href="/" className="transition hover:text-white">الرئيسية</Link>
                <Link href="/equipment" className="transition hover:text-white">المعدات</Link>
                <Link href="/request-equipment" className="transition hover:text-white">اطلب معدة</Link>
                <Link href="/become-supplier" className="transition hover:text-white">سجل كمورد</Link>
                <Link href="/about" className="transition hover:text-white">عن المنصة</Link>
                <Link href="/contact" className="transition hover:text-white">تواصل معنا</Link>
                <Link href="/legal-forms" className="font-bold text-gold/80 transition hover:text-gold">النماذج القانونية (PDF)</Link>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-black text-gold">خدمات التشغيل</h3>
              <nav className="grid gap-2.5 text-sm text-white/70">
                <Link href="/services/concrete" className="transition hover:text-white">خدمات الخرسانة</Link>
                <Link href="/services/backfilling" className="transition hover:text-white">ردم وتجهيز المواقع</Link>
                <Link href="/services/construction-waste" className="transition hover:text-white">مخلفات البناء والهدم</Link>
                <Link href="/services/lifting" className="transition hover:text-white">رفع ومناولة</Link>
                <Link href="/services/heavy-transport" className="transition hover:text-white">نقل ثقيل</Link>
                <Link href="/services/asphalt" className="transition hover:text-white">أعمال الأسفلت</Link>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-black text-gold">الدعم والقانونية</h3>
              <nav className="grid gap-2.5 text-sm text-white/70">
                <Link href="/contact" className="transition hover:text-white">تواصل معنا</Link>
                <Link href="/terms" className="transition hover:text-white">الشروط والأحكام</Link>
                <Link href="/privacy" className="transition hover:text-white">سياسة الخصوصية</Link>
                <Link href="/legal-forms" className="transition hover:text-white">النماذج القانونية</Link>
              </nav>
              <div className="mt-6 rounded-lg border border-white/15 p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-gold">
                  <ShieldCheck className="h-4 w-4" />
                  {t("footer.legalProtection")}
                </div>
                <p className="mt-3 text-xs leading-6 text-white/55">{t("footer.legalNotice")}</p>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-white/45">
              <p>©2025 {brand.arabicName} - {brand.legalOwner} - جميع الحقوق محفوظة</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-[11px] font-black text-amber-400">
                  <FlaskConical className="h-3 w-3" />
                  نسخة تجريبية Beta
                </span>
                <p>{brand.primaryDomain} - {brand.globalDomain}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, ShieldCheck } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-mist">
      <header className="sticky top-0 z-40 border-b border-white/50 bg-white/82 shadow-sm shadow-slate-900/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-3.5">
            <Image src="/logo.svg" alt={t("brand.name")} width={56} height={56} priority className="h-14 w-14" />
            <span>
              <span className="block text-xl font-black leading-tight text-navy">{t("brand.name")}</span>
              <span className="block text-xs font-semibold text-steel">{t("brand.englishName")}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-bold text-ink lg:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-gold">
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ButtonLink href="/login" variant="ghost">
              {t("nav.login")}
            </ButtonLink>
            <ButtonLink href="/request-equipment">{t("actions.requestEquipment")}</ButtonLink>
          </div>
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher compact />
            <Link href="/login" className="rounded-md border border-slate-200 p-2 text-navy" aria-label={t("nav.login")}>
              <Menu className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>
      {children}
      <a
        href={officialWhatsAppLink}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-2xl shadow-slate-900/25 transition hover:-translate-y-0.5 hover:bg-[#1ebe5d] ltr:left-5 ltr:right-auto"
      >
        {t("actions.whatsapp")}
      </a>
      <footer className="bg-navy px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/logo.svg" alt={t("brand.name")} width={46} height={46} className="h-11 w-11" />
              <h2 className="text-xl font-black">{t("brand.name")}</h2>
            </div>
            <p className="mt-3 leading-7 text-white/70">{t("brand.subtitle")}</p>
            <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm font-bold text-gold">
              {t("footer.whatsapp")}: {officialWhatsAppDisplay}
            </a>
            <p className="mt-2 text-sm text-white/50">
              {brand.primaryDomain} · {brand.globalDomain}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gold">{t("footer.importantLinks")}</h3>
            <div className="mt-3 grid gap-2 text-sm text-white/75">
              <Link href="/terms">{t("footer.terms")}</Link>
              <Link href="/privacy">{t("footer.privacy")}</Link>
              <Link href="/services/construction-waste" className="font-bold text-white/75 hover:text-white">مخلفات البناء والهدم</Link>
              <Link href="/legal-forms" className="font-bold text-gold/80 hover:text-gold">النماذج القانونية (PDF)</Link>
              <Link href="/contact">{t("footer.contact")}</Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 p-4">
            <div className="flex items-center gap-2 font-bold text-gold">
              <ShieldCheck className="h-5 w-5" />
              {t("footer.legalProtection")}
            </div>
            <p className="mt-3 text-sm leading-7 text-white/70">{t("footer.legalNotice")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

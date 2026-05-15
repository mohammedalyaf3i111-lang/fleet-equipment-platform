"use client";

import { useLocale } from "next-intl";
import { Globe2 } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const currentLocale = useLocale() as Locale;

  const setLocale = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    window.location.reload();
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/85 p-1 text-xs font-black text-navy shadow-sm ${
        compact ? "scale-95" : ""
      }`}
      aria-label="Language switcher"
    >
      <Globe2 className="mx-1 h-4 w-4 text-gold" />
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => setLocale(locale)}
          className={`rounded-full px-2.5 py-1 transition ${
            currentLocale === locale ? "bg-navy text-white" : "text-steel hover:bg-gold/15 hover:text-navy"
          }`}
          aria-pressed={currentLocale === locale}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

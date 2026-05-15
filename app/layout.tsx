import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { brand } from "@/lib/brand";
import { defaultLocale, getDirection, getMessages, isLocale, type Locale } from "@/lib/i18n";
import "./globals.css";

async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value;
  return isLocale(locale) ? locale : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const messages = await getMessages(locale);

  return {
    metadataBase: new URL(`https://${brand.primaryDomain}`),
    title: messages.metadata.title,
    description: messages.metadata.description,
    applicationName: messages.brand.name,
    keywords: messages.metadata.keywords.split(",").map((keyword: string) => keyword.trim()),
    alternates: {
      canonical: `https://${brand.primaryDomain}`,
      languages: {
        ar: `https://${brand.primaryDomain}`,
        en: `https://${brand.globalDomain}`
      }
    },
    openGraph: {
      title: messages.metadata.title,
      description: messages.metadata.description,
      url: `https://${brand.primaryDomain}`,
      siteName: messages.brand.name,
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: ["/social-preview.svg"]
    },
    twitter: {
      card: "summary_large_image",
      title: messages.metadata.title,
      description: messages.metadata.description,
      images: ["/social-preview.svg"]
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/app-icon.svg"
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await resolveLocale();
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={getDirection(locale)} data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

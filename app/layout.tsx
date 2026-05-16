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

  const siteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(`https://${brand.primaryDomain}`),
    title: {
      default: `${messages.metadata.title} — نسخة تجريبية Beta`,
      template: `%s | ${messages.brand.name}`
    },
    description: messages.metadata.description,
    applicationName: messages.brand.name,
    keywords: [
      ...messages.metadata.keywords.split(",").map((k: string) => k.trim()),
      "تأجير معدات", "معدات ثقيلة", "المملكة العربية السعودية",
      "كرينات", "حفارات", "شيولات", "قلابات", "مولدات", "فوركلفت"
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    },
    ...(siteVerification ? { verification: { google: siteVerification } } : {}),
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
      images: [{ url: "/social-preview.svg", width: 1200, height: 630, alt: messages.brand.name }]
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

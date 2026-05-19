import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { brand } from "@/lib/brand";
import { defaultLocale, getDirection, getMessages, isLocale, type Locale } from "@/lib/i18n";
import { buildOrganizationSchema, buildWebsiteSchema, SITE_URL } from "@/lib/seo";
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

  const title = "فليت معدات | منصة تأجير المعدات الثقيلة في السعودية";
  const description = "فليت معدات — المنصة السعودية الرائدة لتأجير المعدات الثقيلة وإدارة الأساطيل. كرينات، حفارات، شيولات، قلابات، مولدات وأكثر من 2500 معدة معتمدة بعقود رقمية وتشغيل متكامل. الرياض، جدة، الدمام.";

  const keywords = [
    "فليت معدات",
    "تأجير معدات ثقيلة",
    "تأجير معدات السعودية",
    "ايجار معدات بناء",
    "تأجير كرينات",
    "تأجير حفارات",
    "تأجير شيولات",
    "تأجير قلابات",
    "تأجير مولدات",
    "تأجير فوركلفت",
    "معدات مقاولات للايجار",
    "تأجير معدات الرياض",
    "تأجير معدات جدة",
    "تأجير معدات الدمام",
    "heavy equipment rental saudi arabia",
    "fleet equipment platform",
    "crane rental riyadh",
    "excavator rental jeddah",
    "منصة معدات سعودية",
    "مزودي معدات"
  ];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | فليت معدات`
    },
    description,
    applicationName: messages.brand.name,
    keywords,
    authors: [{ name: brand.legalOwner }],
    creator: brand.legalOwner,
    publisher: brand.arabicName,
    category: "تأجير معدات",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    ...(siteVerification ? { verification: { google: siteVerification } } : {}),
    alternates: {
      canonical: SITE_URL,
      languages: {
        "ar-SA": SITE_URL,
        "en-US": `https://${brand.globalDomain}`
      }
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: "فليت معدات",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/social-preview.svg`,
          width: 1200,
          height: 630,
          alt: "فليت معدات — منصة تأجير المعدات الثقيلة في السعودية"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/social-preview.svg`]
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/app-icon.svg",
      shortcut: "/favicon.svg"
    },
    manifest: "/manifest.json",
    other: {
      "geo.region": "SA",
      "geo.country": "SA",
      "geo.placename": "المملكة العربية السعودية",
      "language": "Arabic",
      "content-language": "ar-SA",
      "rating": "General",
      "revisit-after": "7 days"
    }
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await resolveLocale();
  const messages = await getMessages(locale);

  const orgSchema = buildOrganizationSchema();
  const siteSchema = buildWebsiteSchema();

  return (
    <html lang={locale} dir={getDirection(locale)} data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#07162a" />
        <meta name="msapplication-TileColor" content="#07162a" />
        {/* IndexNow */}
        <meta name="indexnow-key" content={process.env.NEXT_PUBLIC_INDEXNOW_KEY} />
        {/* JSON-LD: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* JSON-LD: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

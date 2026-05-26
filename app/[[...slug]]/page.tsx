import {
  AuthPage,
  DashboardPage,
  DocumentPreviewPage,
  HomePage,
  LaunchChecklistPage,
  LegalFormsPage,
  NotFoundPage,
  RequestEquipmentPage,
  ServiceCategoryPage,
  StaticPublicPage
} from "@/components/pages";
import { CityLandingPage, EquipmentCityPage } from "@/components/city-pages";
import { findServiceCategory } from "@/lib/service-categories";
import { brand } from "@/lib/brand";
import { getCity, getCityEquipmentContent, EQUIPMENT_ARABIC_NAMES } from "@/lib/cities";
import {
  SITE_URL,
  equipmentSeoMap,
  pageSeoMap,
  buildEquipmentPageSchema,
  buildServicePageSchema,
  buildBreadcrumbSchema,
  buildFaqSchema
} from "@/lib/seo";
import type { Metadata } from "next";

// Private path prefixes — get noindex, nofollow
const PRIVATE_PREFIXES = ["admin", "supplier", "customer", "login", "register", "launch-checklist", "legal/document"];

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved.slug ?? [];
  const path = slug.join("/");

  // noindex for all private/dashboard pages
  const isPrivate = PRIVATE_PREFIXES.some(p => path === p || path.startsWith(p + "/"));
  if (isPrivate) {
    return {
      robots: { index: false, follow: false, googleBot: { index: false, follow: false } }
    };
  }

  // ── Home ────────────────────────────────────────────────────────────────────
  if (slug.length === 0) {
    const s = pageSeoMap.home;
    return {
      title: s.title,
      description: s.description,
      keywords: s.keywords,
      alternates: { canonical: SITE_URL },
      openGraph: {
        title: s.title,
        description: s.description,
        url: SITE_URL,
        siteName: "فليت معدات",
        locale: "ar_SA",
        type: "website",
        images: [{ url: `${SITE_URL}/social-preview.svg`, width: 1200, height: 630, alt: "فليت معدات" }]
      },
      twitter: { card: "summary_large_image", title: s.title, description: s.description }
    };
  }

  // ── Equipment listing ────────────────────────────────────────────────────────
  if (path === "equipment") {
    const s = pageSeoMap.equipment;
    return {
      title: s.title,
      description: s.description,
      keywords: s.keywords,
      alternates: { canonical: `${SITE_URL}/equipment` },
      openGraph: {
        title: s.title,
        description: s.description,
        url: `${SITE_URL}/equipment`,
        siteName: "فليت معدات",
        locale: "ar_SA",
        type: "website"
      }
    };
  }

  // ── Static public pages ──────────────────────────────────────────────────────
  const staticPage = pageSeoMap[path];
  if (staticPage && slug.length === 1) {
    return {
      title: staticPage.title,
      description: staticPage.description,
      keywords: staticPage.keywords,
      alternates: { canonical: `${SITE_URL}/${path}` },
      openGraph: {
        title: staticPage.title,
        description: staticPage.description,
        url: `${SITE_URL}/${path}`,
        siteName: "فليت معدات",
        locale: "ar_SA",
        type: "website"
      }
    };
  }

  // ── Service category pages ───────────────────────────────────────────────────
  if (slug[0] === "services" && slug[1]) {
    const service = findServiceCategory(slug[1]);
    if (service) {
      const keywords = [
        service.seoTitle,
        service.arabicName,
        `${service.arabicName} السعودية`,
        `${service.arabicName} الرياض`,
        `${service.arabicName} جدة`,
        "فليت معدات",
        "خدمات معدات"
      ];
      return {
        title: service.seoTitle,
        description: service.seoDescription,
        keywords,
        alternates: { canonical: `${SITE_URL}/services/${slug[1]}` },
        robots: { index: true, follow: true },
        openGraph: {
          title: service.seoTitle,
          description: service.seoDescription,
          url: `${SITE_URL}/services/${slug[1]}`,
          siteName: "فليت معدات",
          locale: "ar_SA",
          type: "website",
          images: [{ url: service.image, width: 1200, height: 630, alt: service.arabicName }]
        },
        twitter: {
          card: "summary_large_image",
          title: service.seoTitle,
          description: service.seoDescription
        }
      };
    }
  }

  // ── City landing pages (/cities/riyadh) ──────────────────────────────────────
  if (slug[0] === "cities" && slug[1] && !slug[2]) {
    const city = getCity(slug[1]);
    if (city) {
      const title = `تأجير معدات ثقيلة في ${city.arabicName} — فليت معدات`;
      const description = `اعثر على أفضل معدات ثقيلة للتأجير في ${city.arabicName}: كرينات، حفارات، شيولات، قلابات، مولدات وأكثر. مزودون معتمدون، عقود رقمية، أسعار شفافة. ${city.localContext}`;
      const keywords = [
        `تأجير معدات ${city.arabicName}`,
        `ايجار معدات ${city.arabicName}`,
        `معدات ثقيلة ${city.arabicName}`,
        `تأجير كرينات ${city.arabicName}`,
        `تأجير حفارات ${city.arabicName}`,
        `تأجير شيولات ${city.arabicName}`,
        `تأجير قلابات ${city.arabicName}`,
        `تأجير مولدات ${city.arabicName}`,
        `فليت معدات ${city.arabicName}`,
        `heavy equipment rental ${city.englishName}`
      ];
      return {
        title,
        description,
        keywords,
        alternates: { canonical: `${SITE_URL}/cities/${slug[1]}` },
        robots: { index: true, follow: true },
        openGraph: { title, description, url: `${SITE_URL}/cities/${slug[1]}`, siteName: "فليت معدات", locale: "ar_SA", type: "website" },
        twitter: { card: "summary_large_image", title, description }
      };
    }
  }

  // ── Equipment + City pages (/cities/riyadh/cranes) ────────────────────────
  if (slug[0] === "cities" && slug[1] && slug[2]) {
    const city = getCity(slug[1]);
    const equipName = EQUIPMENT_ARABIC_NAMES[slug[2]] ?? slug[2];
    if (city) {
      const title = `تأجير ${equipName} في ${city.arabicName} — فليت معدات`;
      const description = `استأجر ${equipName} في ${city.arabicName} بأسعار تنافسية وعقود رقمية. مزودون معتمدون، توصيل خلال 24 ساعة، مع مشغل أو بدون. ${city.description}.`;
      const keywords = [
        `تأجير ${equipName} ${city.arabicName}`,
        `ايجار ${equipName} ${city.arabicName}`,
        `${equipName} للايجار ${city.arabicName}`,
        `${equipName} ${city.arabicName}`,
        `تأجير معدات ${city.arabicName}`,
        `فليت معدات ${city.arabicName}`,
        `equipment rental ${city.englishName}`
      ];
      return {
        title,
        description,
        keywords,
        alternates: { canonical: `${SITE_URL}/cities/${slug[1]}/${slug[2]}` },
        robots: { index: true, follow: true },
        openGraph: { title, description, url: `${SITE_URL}/cities/${slug[1]}/${slug[2]}`, siteName: "فليت معدات", locale: "ar_SA", type: "website" },
        twitter: { card: "summary_large_image", title, description }
      };
    }
  }

  // ── Equipment category pages ─────────────────────────────────────────────────
  if (slug[0] === "equipment" && slug[1]) {
    const catSlug = slug[1];
    const eq = equipmentSeoMap[catSlug];

    if (eq) {
      return {
        title: eq.title,
        description: eq.description,
        keywords: eq.keywords,
        alternates: { canonical: `${SITE_URL}/equipment/${catSlug}` },
        robots: { index: true, follow: true },
        openGraph: {
          title: eq.title,
          description: eq.description,
          url: `${SITE_URL}/equipment/${catSlug}`,
          siteName: "فليت معدات",
          locale: "ar_SA",
          type: "website"
        },
        twitter: {
          card: "summary_large_image",
          title: eq.title,
          description: eq.description
        }
      };
    }

    // Fallback for unknown category slug
    const title = `تأجير ${catSlug} في السعودية — فليت معدات`;
    const description = `اعثر على ${catSlug} للتأجير في المملكة العربية السعودية بأسعار شفافة وعقود رقمية. فليت معدات.`;
    return {
      title,
      description,
      alternates: { canonical: `${SITE_URL}/equipment/${catSlug}` },
      robots: { index: true, follow: true },
      openGraph: { title, description, siteName: brand.arabicName, locale: "ar_SA", type: "website" }
    };
  }

  return {};
}

// ── JSON-LD injector ─────────────────────────────────────────────────────────

function JsonLd({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function PlatformRoute({
  params,
  searchParams
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ print?: string }>;
}) {
  const resolved = await params;
  const query = await searchParams;
  const slug = resolved.slug ?? [];
  const path = slug.join("/");

  // ── Home ─────────────────────────────────────────────────────────────────────
  if (slug.length === 0) return <HomePage />;

  if (path === "legal-forms") return <LegalFormsPage />;
  if (path === "admin/legal/documents") return <DashboardPage role="admin" page="legal-documents" />;

  if (slug[0] === "legal" && slug[1] === "document" && slug[2]) {
    return <DocumentPreviewPage id={slug[2]} print={query.print === "1"} />;
  }

  if (path === "login") return <AuthPage type="login" />;
  if (path === "register/customer") return <AuthPage type="customer" />;
  if (path === "register/supplier") return <AuthPage type="supplier" />;
  if (path === "request-equipment") return <RequestEquipmentPage />;
  if (path === "launch-checklist") return <LaunchChecklistPage />;

  // ── City landing page (/cities/riyadh) ───────────────────────────────────────
  if (slug[0] === "cities" && slug[1] && !slug[2]) {
    const city = getCity(slug[1]);
    if (!city) return <NotFoundPage />;
    const breadcrumb = buildBreadcrumbSchema([
      { name: "الرئيسية", url: SITE_URL },
      { name: `تأجير معدات في ${city.arabicName}`, url: `${SITE_URL}/cities/${slug[1]}` }
    ]);
    return (
      <>
        <JsonLd data={breadcrumb} />
        <CityLandingPage city={city} />
      </>
    );
  }

  // ── Equipment + City page (/cities/riyadh/cranes) ────────────────────────────
  if (slug[0] === "cities" && slug[1] && slug[2]) {
    const city = getCity(slug[1]);
    if (!city) return <NotFoundPage />;
    const content = getCityEquipmentContent(slug[1], slug[2]);
    if (!content) return <NotFoundPage />;
    const equipName = EQUIPMENT_ARABIC_NAMES[slug[2]] ?? slug[2];
    const schema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `تأجير ${equipName} في ${city.arabicName}`,
      description: content.intro,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "City", name: city.arabicName },
      url: `${SITE_URL}/cities/${slug[1]}/${slug[2]}`,
      offers: { "@type": "AggregateOffer", priceCurrency: "SAR", availability: "https://schema.org/InStock" }
    };
    const faqSchema = content.faqs.length > 0 ? buildFaqSchema(content.faqs) : null;
    const breadcrumb = buildBreadcrumbSchema([
      { name: "الرئيسية", url: SITE_URL },
      { name: `معدات ${city.arabicName}`, url: `${SITE_URL}/cities/${slug[1]}` },
      { name: `تأجير ${equipName}`, url: `${SITE_URL}/cities/${slug[1]}/${slug[2]}` }
    ]);
    return (
      <>
        <JsonLd data={schema} />
        <JsonLd data={faqSchema} />
        <JsonLd data={breadcrumb} />
        <EquipmentCityPage city={city} equipmentSlug={slug[2]} content={content} />
      </>
    );
  }

  // ── Services with JSON-LD ────────────────────────────────────────────────────
  if (slug[0] === "services" && slug[1]) {
    const service = findServiceCategory(slug[1]);
    const schema = service
      ? buildServicePageSchema(slug[1], service.arabicName, service.seoDescription)
      : null;
    const breadcrumb = buildBreadcrumbSchema([
      { name: "الرئيسية", url: SITE_URL },
      { name: "خدمات التشغيل", url: `${SITE_URL}/services` },
      { name: service?.arabicName ?? slug[1], url: `${SITE_URL}/services/${slug[1]}` }
    ]);
    return (
      <>
        <JsonLd data={schema} />
        <JsonLd data={breadcrumb} />
        <ServiceCategoryPage slug={slug[1]} />
      </>
    );
  }

  // ── Equipment category with JSON-LD ──────────────────────────────────────────
  if (slug[0] === "equipment" && slug[1]) {
    const eq = equipmentSeoMap[slug[1]];
    const schema = buildEquipmentPageSchema(slug[1]);
    const breadcrumb = buildBreadcrumbSchema([
      { name: "الرئيسية", url: SITE_URL },
      { name: "المعدات", url: `${SITE_URL}/equipment` },
      { name: eq?.arabicName ?? slug[1], url: `${SITE_URL}/equipment/${slug[1]}` }
    ]);
    return (
      <>
        <JsonLd data={schema} />
        <JsonLd data={breadcrumb} />
        <StaticPublicPage slug="equipment" categorySlug={slug[1]} />
      </>
    );
  }

  if (["about", "equipment", "become-supplier", "contact", "terms", "privacy"].includes(path)) {
    const breadcrumb = buildBreadcrumbSchema([
      { name: "الرئيسية", url: SITE_URL },
      { name: pageSeoMap[path]?.title?.split("—")[0]?.trim() ?? path, url: `${SITE_URL}/${path}` }
    ]);
    return (
      <>
        <JsonLd data={breadcrumb} />
        <StaticPublicPage slug={path} />
      </>
    );
  }

  const [role, page = "dashboard"] = slug;
  if (role === "customer" || role === "supplier" || role === "admin") {
    return <DashboardPage role={role} page={page} />;
  }

  return <NotFoundPage />;
}

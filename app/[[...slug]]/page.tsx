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
import { findServiceCategory } from "@/lib/service-categories";
import { brand } from "@/lib/brand";
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

  // Service pages
  if (slug[0] === "services" && slug[1]) {
    const service = findServiceCategory(slug[1]);
    if (service) {
      return {
        title: service.seoTitle,
        description: service.seoDescription,
        robots: { index: true, follow: true },
        openGraph: {
          title: service.seoTitle,
          description: service.seoDescription,
          siteName: brand.arabicName,
          locale: "ar_SA",
          type: "website",
          images: [service.image]
        }
      };
    }
  }

  // Equipment category pages
  if (slug[0] === "equipment" && slug[1]) {
    const cat = slug[1];
    const title = `تأجير ${cat} — فليت معدات`;
    const description = `اعثر على أفضل ${cat} معتمدة للتأجير في السعودية مع فلاتر مخصصة وأسعار شفافة.`;
    return {
      title,
      description,
      robots: { index: true, follow: true },
      openGraph: { title, description, siteName: brand.arabicName, locale: "ar_SA", type: "website" }
    };
  }

  return {};
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
  if (slug[0] === "services" && slug[1]) {
    return <ServiceCategoryPage slug={slug[1]} />;
  }
  if (slug[0] === "equipment" && slug[1]) {
    return <StaticPublicPage slug="equipment" categorySlug={slug[1]} />;
  }
  if (["about", "equipment", "become-supplier", "contact", "terms", "privacy"].includes(path)) {
    return <StaticPublicPage slug={path} />;
  }

  const [role, page = "dashboard"] = slug;
  if (role === "customer" || role === "supplier" || role === "admin") {
    return <DashboardPage role={role} page={page} />;
  }

  return <NotFoundPage />;
}

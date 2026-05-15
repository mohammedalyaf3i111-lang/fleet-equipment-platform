import Link from "next/link";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, ArrowLeft, BadgeCheck, BrickWall, CircleGauge, Construction, Container, Download, Droplets, Eye, Factory, FileCheck2, Forklift, Fuel, Gauge, Headphones, Mail, Mountain, Printer, Route, Send, Shield, ShieldCheck, ToyBrick, Truck, Users, Waves } from "lucide-react";
import { EquipmentCategoriesSection, PopularServicesSection, HowItWorksSection, WasteHighlightSection, WhyChooseUsSection, StatsStripSection, SupplierCtaSection } from "@/components/home-sections";
import { HeroImage } from "@/components/hero-image";
import { EquipmentMarketplace } from "@/components/equipment-marketplace";
import { RequestEquipmentForm } from "@/components/request-equipment-form";
import { SupplierStepper } from "@/components/supplier-stepper";
import { AboutPageContent, ContactPageContent, TermsPageContent, PrivacyPageContent } from "@/components/static-pages";
import { LegalPDFGenerator } from "@/components/legal-pdf-generator";
import { PublicShell } from "@/components/shell";
import { ButtonLink, Field, MetricCard, Section, StatusBadge, SubmitButton } from "@/components/ui";
import { CustomerRegisterForm, LoginForm, SupplierRegisterForm } from "@/components/forms";
import { EquipmentSearch } from "@/components/equipment-search";
import { adminStats, dashboardMenus, equipmentItems, landingStats, orderRows, requestRows } from "@/lib/mock-data";
import { calculateQuote } from "@/lib/business";
import { buildLegalDocuments, legalDisclaimer } from "@/lib/contracts";
import { brand } from "@/lib/brand";
import { equipmentCatalog, findCatalogCategory, getAllEquipmentTypes } from "@/lib/equipment-catalog";
import { getEquipmentFilterSchema } from "@/constants/equipmentFilterSchemas";
import { buildGeneratedDocument, getDocumentTemplate, listGeneratedDocuments, parseGeneratedDocumentId } from "@/lib/document-engine";
import { findServiceCategory, serviceCategories, type ServiceCategory, type ServiceFilterField } from "@/lib/service-categories";
import { BrickBlockService } from "@/components/brick-block-service";
import { BackfillingService } from "@/components/backfilling-service";
import { ConstructionWasteService } from "@/components/construction-waste-service";
import { officialWhatsAppDisplay } from "@/lib/contact";
import {
  adminOperationActions,
  customerOperationActions,
  formatSar,
  fleetAssets,
  futureOperationIntegrations,
  handoverProof,
  notificationBlueprints,
  operationOrder,
  operationOrderTerms,
  operationStatuses,
  returnProof,
  shortRightsTerms,
  smartRequest,
  supplierAgreement,
  supplierOffers,
  supplierOperationActions
} from "@/lib/operation-contracts";

function Hero() {
  const trustIndicators = [
    { label: "عقود رقمية موثقة", icon: FileCheck2 },
    { label: "مزودون معتمدون", icon: BadgeCheck },
    { label: "حماية وتشغيل احترافي", icon: ShieldCheck },
    { label: "دعم فني متكامل", icon: Headphones }
  ];
  const heroStats = [
    { value: "+500", label: "مزود معتمد", icon: Users },
    { value: "+2500", label: "معدة متنوعة", icon: Truck },
    { value: "+1500", label: "عميل وشركة", icon: BadgeCheck },
    { value: "+50", label: "مدينة داخل المملكة", icon: ShieldCheck }
  ];
  return (
    <section className="relative isolate min-h-[700px] overflow-hidden bg-navy text-white md:min-h-[780px]">
      <HeroImage />
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(7,22,42,0.70)_0%,rgba(7,22,42,0.66)_33%,rgba(7,22,42,0.42)_55%,rgba(7,22,42,0.14)_78%,rgba(7,22,42,0.06)_100%)]" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_72%_42%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_50%_50%,transparent_48%,rgba(2,8,18,0.58)_100%)]" />
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(180deg,rgba(3,10,20,0.02),rgba(3,10,20,0.72))]" />
      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl items-center px-4 pb-40 pt-[clamp(90px,12vh,140px)] sm:px-6 md:min-h-[780px] md:pb-44 lg:px-8">
        <div className="hero-rise mr-auto max-w-2xl translate-y-3 rounded-2xl border border-white/10 bg-navy/10 p-0 text-right shadow-2xl shadow-black/20 backdrop-blur-[1px] sm:translate-y-6 lg:max-w-3xl lg:translate-y-8">
          <p className="mb-5 inline-flex rounded-md border border-gold/45 bg-white/10 px-4 py-2 text-sm font-semibold text-gold shadow-2xl backdrop-blur">
            منصة سعودية لإدارة تأجير المعدات
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.16] text-white drop-shadow-2xl sm:text-5xl lg:text-6xl">
            منصة فليت معدات<br />لتأجير المعدات<br />وإدارة الأساطيل
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-white/84 sm:text-xl">
            حل احترافي يربط ملاك المعدات بالمقاولين والشركات<br className="hidden sm:block" />
            مع عقود رقمية وتشغيل متكامل..
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/request-equipment">اطلب معدة الآن</ButtonLink>
            <ButtonLink href="/become-supplier" variant="secondary">سجل كمزود معدات</ButtonLink>
          </div>
          <div className="hero-rise-delay mt-8 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {trustIndicators.map(({ label, icon: Icon }) => (
              <div key={label} className="group rounded-xl border border-white/16 bg-white/[0.11] px-4 py-4 text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-gold/65 hover:bg-white/[0.16]">
                <Icon className="mb-3 h-5 w-5 text-gold transition group-hover:scale-110" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-5 z-10 mx-auto max-w-7xl sm:bottom-8 sm:px-2">
        <div className="grid overflow-hidden rounded-2xl border border-white/16 bg-white/[0.13] shadow-2xl shadow-black/30 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="group border-white/12 px-5 py-5 text-right transition duration-300 hover:bg-white/[0.08] sm:border-l">
              <Icon className="mb-3 h-5 w-5 text-gold transition group-hover:scale-110" />
              <p className="text-3xl font-extrabold text-gold">{value}</p>
              <p className="mt-1 text-sm font-semibold text-white/82">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <PublicShell>
      <Hero />
      <EquipmentCategoriesSection />
      <PopularServicesSection />
      <HowItWorksSection />
      <WasteHighlightSection />
      <WhyChooseUsSection />
      <StatsStripSection />
      <EquipmentSection />
      <SupplierCtaSection />
      <Section title="النماذج القانونية القابلة للتنزيل" eyebrow="توليد PDF فوري من المتصفح" className="bg-white">
        <LegalPDFGenerator />
      </Section>
      <FaqSection />
    </PublicShell>
  );
}

function EquipmentSection() {
  const equipmentCategories: CatalogCard[] = [
    { title: "كرينات", description: "كرينات تلسكوبية ومتنقلة بسعات متعددة للمشاريع الثقيلة.", icon: Construction, color: "#D8A31E", surface: "#FFF7DE", href: "/equipment/cranes" },
    { title: "رافعات بوم", description: "رافعات بوم ومنصات عمل للمواقع الصناعية والإنشائية.", icon: Route, color: "#2563EB", surface: "#EAF1FF", href: "/equipment/boom-lifts-manlifts" },
    { title: "رافعات شوكية", description: "فوركلفت ديزل وكهرباء للمستودعات والمصانع.", icon: Forklift, color: "#EA7A18", surface: "#FFF1E6", href: "/equipment/forklifts" },
    { title: "بوبكات", description: "بوبكات كفرات وجنزير مع ملحقات تشغيل متنوعة.", icon: ToyBrick, color: "#B7791F", surface: "#FFF4CF", href: "/equipment/skid-steers" },
    { title: "شيولات", description: "شيولات تحميل ونقل داخل المواقع والساحات.", icon: Construction, color: "#F2B705", surface: "#FFF7CC", href: "/equipment/wheel-loaders" },
    { title: "حفارات", description: "بوكلينات وحفارات بأحجام تشغيلية مختلفة.", icon: Construction, color: "#111827", surface: "#FFF3BF", href: "/equipment/excavators" },
    { title: "سطحات", description: "سطحات ولوبدات لنقل المعدات داخل المدن والمشاريع.", icon: Truck, color: "#64748B", surface: "#F1F5F9", href: "/equipment/trucks" },
    { title: "مولدات", description: "مولدات طاقة للمشاريع والمواقع المؤقتة.", icon: Gauge, color: "#2F855A", surface: "#EAF8F0", href: "/equipment/compressors-generators" },
    { title: "كمبروسرات", description: "ضواغط هواء للمواقع الصناعية وأعمال الصيانة.", icon: CircleGauge, color: "#2B6CB0", surface: "#EAF4FF", href: "/equipment/compressors-generators" },
    { title: "مان لفت", description: "معدات رفع أشخاص للعمل الداخلي والخارجي.", icon: Waves, color: "#0EA5E9", surface: "#E8F7FF", href: "/equipment/boom-lifts-manlifts" },
    { title: "معدات نقل ثقيل", description: "حلول نقل وتشغيل للمعدات الثقيلة والحمولات الخاصة.", icon: Truck, color: "#1F2937", surface: "#F3F4F6", href: "/equipment/trucks" },
    { title: "جي سي بي (JCB)", description: "معدات متعددة الاستخدام للحفر والتحميل والرفع في مواقع المشاريع.", icon: Construction, color: "#D8A31E", surface: "#FFF7DE", href: "/equipment" },
    { title: "بلدوزر", description: "بلدوزرات قوية للدفع والردم وتسوية الأراضي والمواقع.", icon: Construction, color: "#B7791F", surface: "#FFF4CF", href: "/equipment" },
    { title: "جريدر", description: "جريدرات لتسوية الطرق والمواقع بدقة عالية.", icon: Route, color: "#D6A23A", surface: "#FFF7DE", href: "/equipment/grader" }
  ];

  const siteServices: CatalogCard[] = [
    { title: "خرسانة", description: "خدمات الخرسانة والمضخات والخلاطات للمشاريع.", icon: Factory, color: "#7C5E3C", surface: "#F7F0E7", href: "/services/concrete" },
    { title: "ردم", description: "معدات ومواد الردم والدك وتجهيز المواقع.", icon: Truck, color: "#D6A23A", surface: "#FFF7DE", href: "/services/backfilling" },
    { title: "طوب وبلوك", description: "توريد ونقل الطوب والبلوك لمواقع البناء.", icon: BrickWall, color: "#B45309", surface: "#FFF1E6", href: "/services/bricks-blocks" },
    { title: "أسفلت", description: "معدات وخدمات الأسفلت والطرق.", icon: Route, color: "#374151", surface: "#F3F4F6", href: "/services/asphalt" },
    { title: "رفع", description: "كرينات ورافعات وحلول رفع آمنة للمشاريع.", icon: Construction, color: "#D8A31E", surface: "#FFF7DE", href: "/services/lifting" },
    { title: "نقل ثقيل", description: "سطحات ولوبد وتريلات لنقل المعدات والحمولات.", icon: Truck, color: "#1F2937", surface: "#F3F4F6", href: "/services/heavy-transport" },
    { title: "حجر وركام", description: "توريد الحجر والركام والمواد الإنشائية.", icon: Mountain, color: "#78716C", surface: "#F5F3EF" },
    { title: "رمل وبحص", description: "نقل الرمل والبحص للمشاريع والمواقع.", icon: Truck, color: "#D6A23A", surface: "#FFF7DE" },
    { title: "مخلفات بناء", description: "حاويات ونقل مخلفات البناء والهدم.", icon: Container, color: "#475569", surface: "#F1F5F9" },
    { title: "تنكر ماء", description: "توريد ونقل المياه للمواقع والمشاريع.", icon: Droplets, color: "#0284C7", surface: "#E8F7FF" },
    { title: "تنكر ديزل", description: "خدمات وقود الديزل للمعدات والمواقع.", icon: Fuel, color: "#B7791F", surface: "#FFF4CF" },
    { title: "حفر", description: "بوكلينات وحفارات وتجهيز مواقع الحفر.", icon: Construction, color: "#111827", surface: "#FFF3BF", href: "/services/excavation" },
    { title: "تكسير", description: "معدات تكسير وهدم ونقل مخلفات.", icon: Container, color: "#475569", surface: "#F1F5F9", href: "/services/demolition" },
    { title: "مواقع صناعية", description: "طاقة وهواء ورفع وتشغيل للمواقع الصناعية.", icon: Factory, color: "#2F855A", surface: "#EAF8F0", href: "/services/industrial-sites" },
    { title: "تشطيب", description: "سقالات ومان لفت ومعدات تشطيب للمواقع.", icon: Waves, color: "#0EA5E9", surface: "#E8F7FF", href: "/services/finishing" },
    { title: "خدمات طوارئ", description: "استجابة عاجلة للنقل والطاقة والمياه.", icon: AlertTriangle, color: "#B7791F", surface: "#FFF4CF", href: "/services/emergency" }
  ];

  return (
    <Section title="أنواع المعدات" eyebrow="كتالوج قابل للتوسع" className="bg-white">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {equipmentCategories.map((item) => <CatalogImageCardView key={item.title} item={item} />)}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-10">
        <div className="mb-6">
          <p className="text-sm font-bold text-gold">توريد وتشغيل للمواقع</p>
          <h3 className="mt-2 text-2xl font-bold text-navy">مواد وخدمات مواقع العمل</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteServices.map((item) => <CatalogImageCardView key={item.title} item={item} />)}
        </div>
      </div>
    </Section>
  );
}

function EquipmentSectionLegacy() {
  const equipmentCategories: CatalogCard[] = [
    { title: "كرينات", description: "كرينات تلسكوبية ومتنقلة بسعات متعددة للمشاريع الثقيلة.", icon: Construction, color: "#D8A31E", surface: "#FFF7DE", href: "/equipment/cranes" },
    { title: "رافعات بوم", description: "رافعات بوم ومانصات عمل للمواقع الصناعية والإنشائية.", icon: Route, color: "#2563EB", surface: "#EAF1FF", href: "/equipment/boom-lifts-manlifts" },
    { title: "رافعات شوكية", description: "فوركلفت ديزل وكهرباء للمستودعات والمصانع.", icon: Forklift, color: "#EA7A18", surface: "#FFF1E6", href: "/equipment/forklifts" },
    { title: "بوبكات", description: "بوبكات كفرات وجنزير مع ملحقات تشغيل متنوعة.", icon: ToyBrick, color: "#B7791F", surface: "#FFF4CF", href: "/equipment/skid-steers" },
    { title: "شيولات", description: "شيولات تحميل ونقل داخل المواقع والساحات.", icon: Construction, color: "#F2B705", surface: "#FFF7CC", href: "/equipment/wheel-loaders" },
    { title: "حفارات", description: "بوكلينات وحفارات بأحجام تشغيلية مختلفة.", icon: Construction, color: "#111827", surface: "#FFF3BF", href: "/equipment/excavators" },
    { title: "سطحات", description: "سطحات ولوبدات لنقل المعدات داخل المدن والمشاريع.", icon: Truck, color: "#64748B", surface: "#F1F5F9", href: "/equipment/trucks" },
    { title: "مولدات", description: "مولدات طاقة للمشاريع والمواقع المؤقتة.", icon: Gauge, color: "#2F855A", surface: "#EAF8F0", href: "/equipment/compressors-generators" },
    { title: "كمبروسرات", description: "ضواغط هواء للمواقع الصناعية وأعمال الصيانة.", icon: CircleGauge, color: "#2B6CB0", surface: "#EAF4FF", href: "/equipment/compressors-generators" },
    { title: "مان لفت", description: "معدات رفع أشخاص للعمل الداخلي والخارجي.", icon: Waves, color: "#0EA5E9", surface: "#E8F7FF", href: "/equipment/boom-lifts-manlifts" },
    { title: "معدات نقل ثقيل", description: "حلول نقل وتشغيل للمعدات الثقيلة والحمولات الخاصة.", icon: Truck, color: "#1F2937", surface: "#F3F4F6", href: "/equipment/trucks" }
  ];

  const siteServices: CatalogCard[] = [
    { title: "خرسانة", description: "خدمات الخرسانة والمضخات والخلاطات للمشاريع.", icon: Factory, color: "#7C5E3C", surface: "#F7F0E7", href: "/services/concrete" },
    { title: "ردم", description: "معدات ومواد الردم والدك وتجهيز المواقع.", icon: Truck, color: "#D6A23A", surface: "#FFF7DE", href: "/services/backfilling" },
    { title: "طوب وبلوك", description: "توريد ونقل الطوب والبلوك لمواقع البناء.", icon: BrickWall, color: "#B45309", surface: "#FFF1E6", href: "/services/bricks-blocks" },
    { title: "أسفلت", description: "معدات وخدمات الأسفلت والطرق.", icon: Route, color: "#374151", surface: "#F3F4F6", href: "/services/asphalt" },
    { title: "رفع", description: "كرينات ورافعات وحلول رفع آمنة للمشاريع.", icon: Construction, color: "#D8A31E", surface: "#FFF7DE", href: "/services/lifting" },
    { title: "نقل ثقيل", description: "سطحات ولوبد وتريلات لنقل المعدات والحمولات.", icon: Truck, color: "#1F2937", surface: "#F3F4F6", href: "/services/heavy-transport" },
    { title: "حجر وركام", description: "توريد الحجر والركام والمواد الإنشائية.", icon: Mountain, color: "#78716C", surface: "#F5F3EF" },
    { title: "رمل وبحص", description: "نقل الرمل والبحص للمشاريع والمواقع.", icon: Truck, color: "#D6A23A", surface: "#FFF7DE" },
    { title: "مخلفات بناء", description: "حاويات ونقل مخلفات البناء والهدم.", icon: Container, color: "#475569", surface: "#F1F5F9" },
    { title: "تنكر ماء", description: "توريد ونقل المياه للمواقع والمشاريع.", icon: Droplets, color: "#0284C7", surface: "#E8F7FF" },
    { title: "تنكر ديزل", description: "خدمات وقود الديزل للمعدات والمواقع.", icon: Fuel, color: "#B7791F", surface: "#FFF4CF" },
    { title: "حفر", description: "بوكلينات وحفارات وتجهيز مواقع الحفر.", icon: Construction, color: "#111827", surface: "#FFF3BF", href: "/services/excavation" },
    { title: "تكسير", description: "معدات تكسير وهدم ونقل مخلفات.", icon: Container, color: "#475569", surface: "#F1F5F9", href: "/services/demolition" },
    { title: "مواقع صناعية", description: "طاقة وهواء ورفع وتشغيل للمواقع الصناعية.", icon: Factory, color: "#2F855A", surface: "#EAF8F0", href: "/services/industrial-sites" },
    { title: "تشطيب", description: "سقالات ومان لفت ومعدات تشطيب للمواقع.", icon: Waves, color: "#0EA5E9", surface: "#E8F7FF", href: "/services/finishing" },
    { title: "خدمات طوارئ", description: "استجابة عاجلة للنقل والطاقة والمياه.", icon: AlertTriangle, color: "#B7791F", surface: "#FFF4CF", href: "/services/emergency" }
  ];

  return (
    <Section title="أنواع المعدات" eyebrow="كتالوج قابل للتوسع" className="bg-white">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {equipmentCategories.map((item) => <CatalogCardView key={item.title} item={item} />)}
      </div>

      <div className="mt-12 border-t border-slate-200 pt-10">
        <div className="mb-6">
          <p className="text-sm font-bold text-gold">توريد وتشغيل للمواقع</p>
          <h3 className="mt-2 text-2xl font-bold text-navy">مواد وخدمات مواقع العمل</h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteServices.map((item) => <CatalogCardView key={item.title} item={item} />)}
        </div>
      </div>
    </Section>
  );
}

void EquipmentSectionLegacy;

type CatalogCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  surface: string;
  href?: string;
};

const categoryVisuals: Record<string, { image: string; count: string }> = {
  "كرينات": { image: "/images/categories/cranes.jpg", count: "+42 معدة" },
  "رافعات بوم": { image: "/images/categories/boom-lifts.jpg", count: "+28 معدة" },
  "رافعات شوكية": { image: "/images/categories/forklifts.jpg", count: "+65 معدة" },
  "بوبكات": { image: "/images/categories/bobcats.jpg", count: "+31 معدة" },
  "شيولات": { image: "/images/categories/wheel-loaders.jpg", count: "+54 معدة" },
  "حفارات": { image: "/images/categories/excavators.jpg", count: "+48 معدة" },
  "سطحات": { image: "/images/categories/lowbeds.jpg", count: "+36 معدة" },
  "مولدات": { image: "/images/categories/generators.jpg", count: "+57 معدة" },
  "كمبروسرات": { image: "/images/categories/compressors.jpg", count: "+22 معدة" },
  "مان لفت": { image: "/images/categories/manlifts.jpg", count: "+18 معدة" },
  "معدات نقل ثقيل": { image: "/images/categories/heavy-transport.jpg", count: "+24 معدة" },
  "قلابات": { image: "/images/services/dump-trucks.jpg", count: "+38 معدة" },
  "رصاصات": { image: "/images/services/compaction.jpg", count: "+15 معدة" },
  "خرسانة": { image: "/images/new-categories/concrete.jpg", count: "+19 خدمة" },
  "ردم": { image: "/images/categories/sand.jpg", count: "+44 معدة" },
  "طوب وبلوك": { image: "/images/categories/blocks.jpg", count: "+14 مورد" },
  "أسفلت": { image: "/images/categories/asphalt.jpg", count: "+16 خدمة" },
  "رفع": { image: "/images/categories/cranes.jpg", count: "+80 معدة" },
  "نقل ثقيل": { image: "/images/categories/heavy-transport.jpg", count: "+36 شاحنة" },
  "حجر وركام": { image: "/images/categories/aggregates.jpg", count: "+21 مورد" },
  "رمل وبحص": { image: "/images/categories/sand.jpg", count: "+33 مورد" },
  "مخلفات بناء": { image: "/images/categories/waste.jpg", count: "+12 خدمة" },
  "تنكر ماء": { image: "/images/categories/water-tanker.jpg", count: "+27 معدة" },
  "تنكر ديزل": { image: "/images/categories/fuel-tanker.jpg", count: "+20 معدة" },
  "حفر": { image: "/images/categories/excavators.jpg", count: "+32 معدة" },
  "تكسير": { image: "/images/categories/waste.jpg", count: "+12 خدمة" },
  "مواقع صناعية": { image: "/images/categories/generators.jpg", count: "+57 معدة" },
  "تشطيب": { image: "/images/categories/boom-lifts.jpg", count: "+18 خدمة" },
  "خدمات طوارئ": { image: "/images/categories/water-tanker.jpg", count: "+20 خدمة" }
};

function CatalogCardView({ item }: { item: CatalogCard }) {
  const Icon = item.icon;
  const visual = categoryVisuals[item.title] ?? { image: "/a_wide_cinematic_construction_site_scene_at_sunse.png", count: "+10 معدات" };

  return (
    <Link
      href={item.href ?? "/equipment"}
      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_18px_45px_rgba(216,163,30,0.20)]"
    >
      <div className="relative h-48 overflow-hidden bg-slate-200 sm:h-52">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
        <Image
          src={visual.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
        <div
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur"
          style={{ color: item.color }}
        >
          <Icon className="h-5 w-5" strokeWidth={2.4} />
        </div>
        <div className="absolute bottom-4 right-4 left-4">
          <h3 className="text-xl font-black text-white">{item.title}</h3>
          <p className="mt-1 inline-flex rounded-full border border-gold/40 bg-gold/20 px-3 py-1 text-xs font-black text-white backdrop-blur">
            {visual.count}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="min-h-12 text-sm leading-7 text-steel">{item.description}</p>
        <span className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-navy/10 bg-mist px-4 py-2.5 text-sm font-black text-navy transition group-hover:border-gold/50 group-hover:bg-gold group-hover:text-navy">
          استعراض
        </span>
      </div>
    </Link>
  );
}

const catalogImageVisuals: Record<string, { image: string; count: string }> = {
  "كرينات": { image: "/images/catalog/cranes.jpg", count: "+42 معدة" },
  "رافعات بوم": { image: "/images/catalog/boom-lifts.jpg", count: "+28 معدة" },
  "رافعات شوكية": { image: "/images/catalog/forklifts.jpg", count: "+65 معدة" },
  "بوبكات": { image: "/images/catalog/skid-steers.jpg", count: "+31 معدة" },
  "شيولات": { image: "/images/catalog/wheel-loaders.jpg", count: "+54 معدة" },
  "حفارات": { image: "/images/catalog/excavators.jpg", count: "+48 معدة" },
  "سطحات": { image: "/images/catalog/lowbeds.jpg", count: "+36 معدة" },
  "مولدات": { image: "/images/catalog/generators.jpg", count: "+57 معدة" },
  "كمبروسرات": { image: "/images/catalog/compressors.jpg", count: "+22 معدة" },
  "مان لفت": { image: "/images/catalog/manlifts.jpg", count: "+18 معدة" },
  "معدات نقل ثقيل": { image: "/images/categories/heavy-transport.jpg", count: "+24 معدة" },
  "قلابات": { image: "/images/services/dump-trucks.jpg", count: "+38 معدة" },
  "رصاصات": { image: "/images/services/compaction.jpg", count: "+15 معدة" },
  "جي سي بي (JCB)": { image: "/images/new-categories/jcb.jpg", count: "+42 معدة" },
  "بلدوزر": { image: "/images/new-categories/bulldozer.jpg", count: "+34 معدة" },
  "جريدر": { image: "/images/new-categories/grader.jpg", count: "+28 معدة" },
  "خرسانة": { image: "/images/new-categories/concrete.jpg", count: "+19 خدمة" },
  "ردم": { image: "/images/new-categories/backfilling.jpg", count: "+44 معدة" },
  "طوب وبلوك": { image: "/images/new-categories/blocks.jpg", count: "+14 مورد" },
  "أسفلت": { image: "/images/new-categories/asphalt.jpg", count: "+16 خدمة" },
  "رفع": { image: "/images/site-services/lifting.jpg", count: "+80 معدة" },
  "نقل ثقيل": { image: "/images/site-services/heavy-transport.jpg", count: "+36 شاحنة" },
  "حجر وركام": { image: "/images/site-services/aggregates.jpg", count: "+21 مورد" },
  "رمل وبحص": { image: "/images/services/sand-gravel.jpg", count: "+33 مورد" },
  "مخلفات بناء": { image: "/images/services/waste-hauling.jpg", count: "+12 خدمة" },
  "تنكر ماء": { image: "/images/services/water-tanker.jpg", count: "+27 معدة" },
  "تنكر ديزل": { image: "/images/site-services/diesel-tanker.jpg", count: "+20 معدة" },
  "حفر": { image: "/images/catalog/excavators.jpg", count: "+32 معدة" },
  "تكسير": { image: "/images/site-services/demolition.jpg", count: "+12 خدمة" },
  "مواقع صناعية": { image: "/images/catalog/generators.jpg", count: "+57 معدة" },
  "تشطيب": { image: "/images/catalog/boom-lifts.jpg", count: "+18 خدمة" },
  "خدمات طوارئ": { image: "/images/services/water-tanker.jpg", count: "+20 خدمة" }
};

function CatalogImageCardView({ item }: { item: CatalogCard }) {
  const Icon = item.icon;
  const visual = catalogImageVisuals[item.title] ?? { image: "/a_wide_cinematic_construction_site_scene_at_sunse.png", count: "+10 معدات" };

  return (
    <Link
      href={item.href ?? "/equipment"}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_18px_45px_rgba(216,163,30,0.20)]"
    >
      <div className="relative h-48 overflow-hidden rounded-2xl bg-slate-200 sm:h-52">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
        <Image
          src={visual.image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="rounded-2xl object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-navy/88 via-navy/26 to-transparent" />
        <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur">
          <Icon className="h-5 w-5" strokeWidth={2.4} style={{ color: item.color }} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black text-white">{item.title}</h3>
          <p className="mt-1 inline-flex rounded-full border border-gold/40 bg-gold/20 px-3 py-1 text-xs font-black text-white backdrop-blur">
            {visual.count}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="min-h-12 text-sm leading-7 text-steel">{item.description}</p>
        <span className="mt-4 inline-flex w-full items-center justify-center rounded-md border border-navy/10 bg-mist px-4 py-2.5 text-sm font-black text-navy transition group-hover:border-gold/50 group-hover:bg-gold group-hover:text-navy">
          استعراض
        </span>
      </div>
    </Link>
  );
}

function FaqSection() {
  const faqs = [
    ["هل المنصة تملك المعدات؟", "المنصة وسيط تشغيلي وتقني، وتوثق العلاقة بين العميل ومزود المعدة وفق العقود والنماذج."],
    ["كيف يتم اعتماد المورد؟", "يتم رفع السجل التجاري والمستندات وسياسات القبول ثم تراجع الإدارة الحساب والمعدات."],
    ["هل الدفع إلكتروني؟", "النسخة الحالية تدعم تأكيد الدفع اليدوي مع رفع الإيصال، والتكاملات المالية جاهزة لاحقًا."],
    ["كيف تتم معالجة النزاعات؟", "يتم فتح ملف نزاع موثق بالصور والملاحظات وقراءات العدادات والمستندات المرتبطة."]
  ];
  return (
    <Section title="الأسئلة الشائعة" className="bg-white">
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map(([q, a]) => (
          <div key={q} className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-bold text-navy">{q}</h3>
            <p className="mt-2 leading-7 text-steel">{a}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function StaticPublicPage({ slug, categorySlug }: { slug: string; categorySlug?: string }) {
  const config: Record<string, { title: string; body: string; kind?: string }> = {
    about: { title: `عن ${brand.arabicName}`, body: `${brand.arabicName} منصة تشغيل وسوق معدات ثقيلة مملوكة لـ ${brand.legalOwner}، مصممة للسوق السعودي أولًا ثم التوسع الخليجي.`, kind: "about" },
    equipment: { title: "المعدات المتاحة", body: "استعرض فئات المعدات المعتمدة والجاهزة للتسعير حسب المدينة والمورد.", kind: "equipment" },
    "become-supplier": { title: "سجل كمزود معدات", body: "انضم كمورد معتمد وارفع معداتك ووثائقك واستقبل أوامر تشغيل بعد الاعتماد.", kind: "supplier" },
    contact: { title: "تواصل معنا", body: `فريق ${brand.arabicName} جاهز لاستقبال طلبات الشركات والموردين والشراكات التشغيلية.`, kind: "contact" },
    terms: { title: "الشروط والأحكام", body: "تحدد هذه الصفحة شروط استخدام المنصة ومسؤوليات العملاء والموردين وإجراءات الدفع والنزاعات.", kind: "legal" },
    privacy: { title: "سياسة الخصوصية", body: "نحمي بيانات المستخدمين والمستندات التشغيلية وفق ضوابط وصول وسجل تدقيق وممارسات تحقق آمنة.", kind: "legal" }
  };
  const page = config[slug] ?? config.about;
  return (
    <PublicShell>
      <section className="bg-navy px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-black">{page.title}</h1>
          <p className="mt-4 max-w-3xl leading-8 text-white/75">{page.body}</p>
        </div>
      </section>
      {page.kind === "equipment" ? <EquipmentMarketplace categorySlug={categorySlug} /> : null}
      {page.kind === "supplier" ? <SupplierStepper /> : null}
      {page.kind === "contact" ? <ContactPageContent /> : null}
      {page.kind === "legal" && slug === "terms" ? <TermsPageContent /> : null}
      {page.kind === "legal" && slug === "privacy" ? <PrivacyPageContent /> : null}
      {page.kind === "about" ? <AboutPageContent /> : null}
    </PublicShell>
  );
}

function EquipmentListing({ categorySlug }: { categorySlug?: string }) {
  const categoryAliases: Record<string, string> = {
    grader: "road-equipment",
    generators: "compressors-generators",
    "dump-trucks": "trucks",
    lowbeds: "trucks"
  };
  const selectedCategory = categorySlug ? findCatalogCategory(categorySlug) ?? findCatalogCategory(categoryAliases[categorySlug] ?? "") : undefined;
  const selectedFilterSchema = getEquipmentFilterSchema(categorySlug ?? selectedCategory?.slug);
  const visibleItems = selectedCategory
    ? equipmentItems.filter((item) => item.category === selectedCategory.arabicName || item.category.includes(selectedCategory.arabicName.replace("ال", "")))
    : equipmentItems;
  const searchItems = (visibleItems.length ? visibleItems : []).map(({ icon: _icon, ...item }) => item);

  return (
    <Section title={selectedFilterSchema ? `${selectedFilterSchema.title} متاحة للتسعير` : selectedCategory ? `${selectedCategory.arabicName} متاحة للتسعير` : "معدات معروضة كنموذج MVP"}>
      {selectedFilterSchema || selectedCategory ? (
        <p className="mb-5 max-w-3xl text-sm leading-7 text-steel">
          فلاتر مخصصة لتصنيف {selectedFilterSchema?.title ?? selectedCategory?.arabicName}: تظهر هنا المواصفات المناسبة لهذا النوع فقط بدون خلط مع معدات أخرى.
        </p>
      ) : null}
      <EquipmentSearch
        category={selectedCategory}
        categorySlug={categorySlug}
        items={searchItems}
        allTypes={getAllEquipmentTypes().slice(0, 24).map((type) => ({ slug: type.slug, arabicName: type.arabicName }))}
        fieldSchema={[]}
      />
    </Section>
  );
}

const serviceInputClass = "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";

function ServiceFilterControl({ field }: { field: ServiceFilterField }) {
  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 rounded-md bg-white/80 p-3 text-sm font-bold text-navy">
        <input type="checkbox" name={field.key} />
        {field.label}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="text-sm font-bold text-navy">
        {field.label}
        <select name={field.key} className={serviceInputClass}>
          <option value="">اختر</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="text-sm font-bold text-navy">
      {field.label}
      <input
        name={field.key}
        type={field.type === "number" ? "number" : "text"}
        placeholder={field.placeholder ?? (field.unit ? `بالـ ${field.unit}` : field.label)}
        className={serviceInputClass}
      />
    </label>
  );
}

function ServicePillList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-black text-navy">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-md border border-slate-200 bg-mist px-4 py-3 text-sm font-bold text-navy">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ServiceCategoryView({ service }: { service: ServiceCategory }) {
  if (service.slug === "bricks-blocks") {
    return (
      <PublicShell>
        <BrickBlockService service={service} />
      </PublicShell>
    );
  }
  if (service.slug === "backfilling") {
    return (
      <PublicShell>
        <BackfillingService service={service} />
      </PublicShell>
    );
  }
  if (service.slug === "construction-waste") {
    return (
      <PublicShell>
        <ConstructionWasteService service={service} />
      </PublicShell>
    );
  }

  return (
    <PublicShell>
      <section className="relative isolate overflow-hidden bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <Image src={service.image} alt={service.arabicName} fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/95 via-navy/80 to-navy/40" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black text-gold">مجال عمل متخصص</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">{service.heroTitle}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-white/80">{service.description}</p>
          </div>
          <div className="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
            {service.stats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between rounded-md bg-white/10 px-4 py-3">
                <span className="text-white/75">{stat.label}</span>
                <strong className="text-gold">{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section title={`فلترة طلب ${service.arabicName}`} eyebrow="فلاتر مرتبطة بالمجال فقط">
        <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-3 lg:grid-cols-4">
          {service.filters.map((field) => (
            <ServiceFilterControl key={field.key} field={field} />
          ))}
          <div className="md:col-span-3 lg:col-span-4">
            <ButtonLink href="/request-equipment">إرسال طلب لهذا المجال</ButtonLink>
          </div>
        </form>
      </Section>

      <Section title={`معدات مرتبطة بـ ${service.arabicName}`} className="bg-white">
        <div className="grid gap-6 lg:grid-cols-2">
          <ServicePillList title="المعدات المناسبة" items={service.equipment} />
          <ServicePillList title="الخدمات المرتبطة" items={service.services} />
        </div>
      </Section>

      <Section title="مجالات عمل أخرى">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {serviceCategories.filter((item) => item.slug !== service.slug).slice(0, 5).map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-gold hover:shadow-soft">
              <p className="font-black text-navy">{item.arabicName}</p>
              <p className="mt-2 text-xs leading-6 text-steel">{item.description}</p>
            </Link>
          ))}
        </div>
      </Section>
    </PublicShell>
  );
}

export function ServiceCategoryPage({ slug }: { slug: string }) {
  const service = findServiceCategory(slug);
  if (!service) return <NotFoundPage />;
  return <ServiceCategoryView service={service} />;
}

function LegalPanel() {
  return (
    <>
      <Section title="السياسات القانونية المنشورة">
        <div className="grid gap-4 md:grid-cols-2">
          {buildLegalDocuments().map((document) => (
            <div key={document.type} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-navy">{document.title}</h3>
                  <p className="mt-2 text-sm text-steel">الإصدار {document.version} · منشور</p>
                </div>
                <StatusBadge>{document.status}</StatusBadge>
              </div>
              <p className="mt-4 leading-7 text-steel">{document.body[0]}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm font-bold text-amber-900">{legalDisclaimer}</p>
      </Section>
      <Section title="النماذج القانونية القابلة للتنزيل" eyebrow="توليد PDF فوري — Download PDF" className="bg-white">
        <LegalPDFGenerator />
      </Section>
    </>
  );
}

export function LegalFormsPage() {
  return (
    <PublicShell>
      <section className="bg-navy px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold text-gold">توليد PDF فوري من المتصفح</p>
          <h1 className="text-4xl font-black">النماذج القانونية</h1>
          <p className="mt-4 max-w-3xl leading-8 text-white/75">
            عبِّئ بيانات الأطراف والمعدة ثم حمِّل نموذجك القانوني بصيغة PDF جاهزة — كل النماذج مسودات أولية تتطلب مراجعة قانونية قبل الاستخدام التجاري.
          </p>
        </div>
      </section>
      <Section title="النماذج المتاحة للتنزيل" eyebrow="7 نماذج قانونية احترافية">
        <LegalPDFGenerator />
      </Section>
    </PublicShell>
  );
}

export function AuthPage({ type }: { type: "login" | "customer" | "supplier" }) {
  const titles = {
    login: "تسجيل الدخول",
    customer: "تسجيل عميل أو شركة",
    supplier: "تسجيل مزود معدات"
  };
  return (
    <PublicShell>
      <Section title={titles[type]} eyebrow={brand.arabicName}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg border border-slate-200 bg-navy p-8 text-white shadow-soft">
            <Shield className="h-10 w-10 text-gold" />
            <h2 className="mt-5 text-2xl font-black">{brand.arabicName}</h2>
            <p className="mt-4 leading-8 text-white/75">{brand.heroSubtitle}</p>
          </div>
          {type === "login" ? <LoginForm /> : type === "customer" ? <CustomerRegisterForm /> : <SupplierRegisterForm />}
        </div>
      </Section>
    </PublicShell>
  );
}

export function RequestEquipmentPage() {
  return (
    <PublicShell>
      <RequestEquipmentForm />
    </PublicShell>
  );
}

export function LaunchChecklistPage() {
  const checks = [
    ["حالة الموقع", "يعمل محليًا على localhost:3000 بعد تشغيل السيرفر"],
    ["حالة قاعدة البيانات", "PostgreSQL محلي متصل على المنفذ 5432"],
    ["حالة الطلبات", "نموذج طلب المعدة وAPI جاهزان للاختبار"],
    ["حالة الموردين", "تسجيل الموردين ومراجعة الموردين جاهزان للعرض"],
    ["حالة أوامر التشغيل", "واجهة أمر التشغيل ومسار القبول جاهزان"],
    ["حالة PDF", "معاينة وتحميل مستندات PDF جاهزة عبر Document Engine"],
    ["حالة واتساب", `زر واتساب رسمي مفعّل: ${officialWhatsAppDisplay}`]
  ];
  return (
    <PublicShell>
      <Section title="Launch Checklist" eyebrow="جاهزية نسخة العرض">
        <div className="grid gap-4 md:grid-cols-2">
          {checks.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
              <StatusBadge>جاهز للاختبار</StatusBadge>
              <h3 className="mt-4 text-lg font-black text-navy">{label}</h3>
              <p className="mt-2 text-sm leading-7 text-steel">{value}</p>
            </div>
          ))}
        </div>
      </Section>
    </PublicShell>
  );
}

function DashboardLayout({ role, section, page }: { role: "customer" | "supplier" | "admin"; section: string; page: string }) {
  const menu = dashboardMenus[role];
  return (
    <div className="min-h-screen bg-mist">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-l border-slate-200 bg-navy p-5 text-white">
          <Link href="/" className="text-2xl font-black text-gold">{brand.arabicName}</Link>
          <nav className="mt-8 grid gap-2">
            {menu.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-md px-3 py-2 text-sm font-bold text-white/75 hover:bg-white/10 hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-gold">{role === "admin" ? "لوحة الإدارة" : role === "supplier" ? "لوحة المزود" : "لوحة العميل"}</p>
              <h1 className="text-3xl font-black text-navy">{section}</h1>
            </div>
            <ButtonLink href="/">الصفحة الرئيسية</ButtonLink>
          </div>
          <DashboardContent role={role} page={page} />
        </main>
      </div>
    </div>
  );
}

function DashboardContent({ role, page }: { role: "customer" | "supplier" | "admin"; page: string }) {
  if (page === "legal") return <LegalCenterPanel />;
  if (page === "orders" || page === "requests") return <OperationOrdersPanel role={role} />;
  if (page === "contracts" && role !== "admin") return <OperationOrdersPanel role={role} />;
  if (page === "legal-documents" || page === "contracts" || page === "documents") return <DocumentRegistryPanel />;
  if (page === "quotes") return <SupplierOffersPanel role={role} />;
  if (role === "supplier" && page === "equipment") return <SupplierFleetPanel />;
  if (page === "equipment" || page === "catalog") return <EquipmentCatalogPanel role={role} />;
  if (role === "admin" && page === "suppliers") return <SupplierReviewPanel />;
  if (page === "payments") return <ManualPaymentsPanel />;
  if (page === "disputes") return <OperationDisputesPanel />;
  return <OverviewPanel role={role} />;
}

const supplierReviewRows = [
  {
    company: "مؤسسة الخليج للمعدات",
    owner: "ناصر العتيبي",
    city: "الرياض",
    status: "قيد المراجعة",
    equipment: [
      { type: "شيول", spec: "CAT 966", quantity: 1, movementType: "كفرات", operatorIncluded: "نعم", city: "الرياض" },
      { type: "كرين", spec: "20 طن", quantity: 6, movementType: "تلسكوبي", operatorIncluded: "نعم", city: "الرياض" },
      { type: "كرين", spec: "100 طن", quantity: 2, movementType: "رافعة متنقلة", operatorIncluded: "نعم", city: "الرياض" }
    ]
  },
  {
    company: "شركة حلول الطاقة والمعدات",
    owner: "فهد القحطاني",
    city: "الدمام",
    status: "بانتظار مستندات",
    equipment: [
      { type: "حفار / بوكلين", spec: "320 جنزير", quantity: 4, movementType: "جنزير", operatorIncluded: "نعم", city: "الدمام" },
      { type: "مولد", spec: "500 KVA", quantity: 3, movementType: "ديزل", operatorIncluded: "لا", city: "الخبر" },
      { type: "تنكر ماء", spec: "18 متر", quantity: 2, movementType: "شاحنة", operatorIncluded: "نعم", city: "الجبيل" }
    ]
  }
];

function SupplierReviewPanel() {
  return (
    <div className="grid gap-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-black text-navy">مراجعة مزودي المعدات</h2>
            <p className="mt-2 text-sm leading-7 text-steel">
              يظهر هنا ملخص معدات المزود المبدئي من نموذج التسجيل لمساعدة الإدارة على تقييم حجم الأسطول قبل الاعتماد.
            </p>
          </div>
          <StatusBadge>معلومات تسجيل مبدئية</StatusBadge>
        </div>
      </div>

      {supplierReviewRows.map((supplier) => (
        <div key={supplier.company} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-navy">{supplier.company}</h3>
              <p className="mt-1 text-sm text-steel">{supplier.owner} · {supplier.city}</p>
            </div>
            <StatusBadge>{supplier.status}</StatusBadge>
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
            <div className="hidden bg-mist px-4 py-3 text-xs font-black text-steel md:grid md:grid-cols-[1.1fr_1.3fr_100px_1fr_100px_1fr]">
              <span>نوع المعدة</span>
              <span>السعة / الموديل / المقاس</span>
              <span>العدد</span>
              <span>نوع الحركة</span>
              <span>مع مشغل؟</span>
              <span>المدينة الرئيسية</span>
            </div>
            {supplier.equipment.map((item) => (
              <div key={`${supplier.company}-${item.type}-${item.spec}`} className="grid gap-2 border-t border-slate-200 p-4 text-sm md:grid-cols-[1.1fr_1.3fr_100px_1fr_100px_1fr]">
                <strong className="text-navy">{item.type}</strong>
                <span className="text-steel">{item.spec}</span>
                <span className="font-bold text-navy">{item.quantity.toLocaleString("ar-SA")}</span>
                <span className="text-steel">{item.movementType}</span>
                <span className="text-steel">{item.operatorIncluded}</span>
                <span className="text-steel">{item.city}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function OverviewPanel({ role }: { role: "customer" | "supplier" | "admin" }) {
  const rows = role === "admin" ? adminStats : landingStats;
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">{rows.map((stat) => <MetricCard key={stat.label} {...stat} />)}</div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-navy">دورة الطلب</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {operationStatuses.map((status, index) => (
            <div key={status} className="rounded-lg border border-slate-200 bg-mist p-4">
              <p className="text-xs font-black text-gold">{String(index + 1).padStart(2, "0")}</p>
              <p className="mt-2 font-bold text-navy">{status}</p>
            </div>
          ))}
        </div>
      </div>
      <RowsPanel title="طلبات وأوامر حديثة" rows={[...requestRows, ...orderRows]} />
    </div>
  );
}

function RowsPanel({ title, rows }: { title: string; rows: typeof requestRows }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-navy">{title}</h2>
      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        {rows.map((row) => (
          <div key={row.id} className="grid gap-3 border-b border-slate-200 p-4 last:border-0 md:grid-cols-[1fr_180px_150px]">
            <div>
              <p className="font-bold text-navy">{row.title}</p>
              <p className="mt-1 text-sm text-steel">{row.id} · {row.meta}</p>
            </div>
            <StatusBadge>{row.status}</StatusBadge>
            <p className="font-bold text-navy md:text-left">{row.amount ?? "قيد التسعير"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationOrdersPanel({ role }: { role: "customer" | "supplier" | "admin" }) {
  const actions = role === "admin" ? adminOperationActions : role === "supplier" ? supplierOperationActions : customerOperationActions;
  const title = role === "admin" ? "إدارة أوامر التشغيل" : role === "supplier" ? "طلبات التشغيل المسندة" : "أوامر التشغيل الخاصة بي";

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-4">
        <MetricCard label="حالة الطلب" value={operationOrder.status} hint="تتغير بعد موافقة الطرفين" />
        <MetricCard label="حالة الدفع" value={operationOrder.payment.status} hint="دفع يدوي قابل للمراجعة" />
        <MetricCard label="عمولة المنصة" value={`${operationOrder.commissionPercent}%`} hint="قابلة للتعديل من الإدارة" />
        <MetricCard label="حالة النزاع" value={operationOrder.disputeStatus} hint="يرتبط بالصور والوقت وGPS" />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-navy">{title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-steel">
              نظام تعاقد مبسط من ثلاث طبقات: اتفاقية المورد مرة واحدة، أمر تشغيل إلكتروني لكل طلب، وإثبات استلام وتسليم بالصور والوقت والموقع.
            </p>
          </div>
          <StatusBadge>{operationOrder.status}</StatusBadge>
        </div>
        <ActionChecklist items={actions} />
      </div>

      {role === "admin" ? <SupplierAgreementCard /> : null}
      <OperationOrderCard role={role} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ProofCard proof={handoverProof} />
        <ProofCard proof={returnProof} />
      </div>

      <OperationTermsNotice />
      <NotificationSystemPanel />

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h3 className="text-xl font-black text-navy">تكاملات جاهزة للتطوير لاحقًا</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {futureOperationIntegrations.map((item) => (
            <span key={item} className="rounded-full bg-mist px-4 py-2 text-sm font-bold text-navy">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupplierAgreementCard() {
  return (
    <div className="rounded-lg border border-gold/30 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-navy">اتفاقية المورد</h3>
          <p className="mt-2 text-sm text-steel">{supplierAgreement.id} · {supplierAgreement.supplierName}</p>
        </div>
        <StatusBadge>{supplierAgreement.status}</StatusBadge>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <InfoTile label="السجل التجاري" value={supplierAgreement.commercialNumber} />
        <InfoTile label="الرقم الضريبي" value={supplierAgreement.vatNumber} />
        <InfoTile label="الآيبان" value={supplierAgreement.iban} />
        <InfoTile label="مسؤول التواصل" value={supplierAgreement.contactPerson} />
        <InfoTile label="نسبة العمولة" value={`${supplierAgreement.commissionPercent}%`} />
        <InfoTile label="وقت القبول" value={supplierAgreement.acceptedAt} />
      </div>
      <ActionChecklist items={supplierAgreement.clauses} />
    </div>
  );
}

function OperationOrderCard({ role }: { role: "customer" | "supplier" | "admin" }) {
  const pdfHref = "/api/legal/document/doc-ord-501-equipment-rental-contract/pdf";
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="border-b border-slate-200 bg-navy p-5 text-white">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-gold">أمر تشغيل إلكتروني</p>
            <h3 className="mt-2 text-2xl font-black">{operationOrder.id}</h3>
            <p className="mt-1 text-sm text-white/70">مرتبط بالطلب {operationOrder.requestId}</p>
          </div>
          <span className="rounded-full bg-gold px-4 py-2 text-sm font-black text-navy">{operationOrder.status}</span>
        </div>
      </div>

      <div className="grid gap-6 p-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          <div className="grid gap-3 md:grid-cols-2">
            <InfoTile label="العميل" value={operationOrder.customerName} />
            <InfoTile label="المورد" value={operationOrder.supplierName} />
            <InfoTile label="نوع المعدة" value={operationOrder.equipmentType} />
            <InfoTile label="المدينة والموقع" value={`${operationOrder.city} · ${operationOrder.siteLocation}`} />
            <InfoTile label="بداية التشغيل" value={operationOrder.startsAt} />
            <InfoTile label="مدة التشغيل" value={`${operationOrder.duration} · ${operationOrder.dailyHours} يوميًا`} />
            <InfoTile label="مسؤولية الوقود" value={operationOrder.fuelResponsibility} />
            <InfoTile label="سياسة الإلغاء" value={operationOrder.cancellationPolicy} />
          </div>

          <div className="rounded-lg border border-slate-200">
            <PriceLine label="سعر اليوم أو الساعة" value={formatSar(operationOrder.dailyRate)} />
            <PriceLine label="تكلفة النقل" value={formatSar(operationOrder.transportCost)} />
            <PriceLine label="سعر الساعة الإضافية" value={formatSar(operationOrder.extraHourRate)} />
            <PriceLine label="رسوم الانتظار" value={formatSar(operationOrder.waitingFee)} />
            <PriceLine label="إجمالي السعر" value={formatSar(operationOrder.totalPrice)} strong />
            <PriceLine label="عمولة المنصة" value={formatSar(operationOrder.commissionAmount)} />
            <PriceLine label="صافي مستحق المورد" value={formatSar(operationOrder.supplierNet)} strong />
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className="rounded-lg bg-mist p-4">
            <h4 className="font-black text-navy">الدفع اليدوي</h4>
            <div className="mt-3 grid gap-2 text-sm">
              <InfoRow label="المبلغ المسجل" value={formatSar(operationOrder.payment.amount)} />
              <InfoRow label="طريقة الدفع" value={operationOrder.payment.method} />
              <InfoRow label="الحالة" value={operationOrder.payment.status} />
              <InfoRow label="مرجع التحويل" value={operationOrder.payment.reference} />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-black text-navy">الموافقات الإلكترونية</h4>
            <div className="mt-3 grid gap-2 text-sm">
              <InfoRow label="موافقة العميل" value={operationOrder.customerAcceptedAt} />
              <InfoRow label="قبول المورد" value={operationOrder.supplierAcceptedAt} />
              <InfoRow label="OTP" value="جاهز للإضافة لاحقًا عبر الجوال" />
            </div>
            <div className="mt-4 grid gap-2">
              {role === "customer" ? <OperationAcceptanceForm actor="customer" label="أوافق على أمر التشغيل" redirectTo="/customer/orders" /> : null}
              {role === "supplier" ? <OperationAcceptanceForm actor="supplier" label="أقبل تنفيذ الطلب" redirectTo="/supplier/orders" /> : null}
              {role === "admin" ? <OperationAcceptanceForm actor="admin" label="تأكيد إداري للأمر" redirectTo="/admin/orders" /> : null}
              <DocumentAction href={pdfHref} icon={Download} label="تحميل PDF" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h4 className="font-black text-navy">الشروط المختصرة</h4>
            <ul className="mt-3 grid gap-2 text-sm leading-7 text-steel">
              {operationOrderTerms.slice(0, 4).map((term) => <li key={term}>• {term}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function OperationAcceptanceForm({ actor, label, redirectTo }: { actor: string; label: string; redirectTo: string }) {
  return (
    <form action="/api/operation-orders/accept" method="post">
      <input type="hidden" name="orderId" value={operationOrder.id} />
      <input type="hidden" name="actor" value={actor} />
      <input type="hidden" name="redirectTo" value={redirectTo} />
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-black text-navy shadow-soft transition hover:-translate-y-0.5 hover:bg-goldDark">
        <FileCheck2 className="h-4 w-4" />
        {label}
      </button>
    </form>
  );
}

function ProofCard({ proof }: { proof: typeof handoverProof | typeof returnProof }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-navy">{proof.title}</h3>
          <p className="mt-1 text-sm text-steel">{proof.id}</p>
        </div>
        <StatusBadge>موثق</StatusBadge>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {proof.photos.map((photo) => (
          <div key={photo} className="rounded-lg border border-dashed border-slate-300 bg-mist p-4 text-center text-sm font-bold text-navy">
            {photo}
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InfoTile label="عداد الساعات" value={proof.hourMeter} />
        <InfoTile label="الوقت" value={"arrivedAt" in proof ? proof.arrivedAt : proof.finishedAt} />
        <InfoTile label="موقع GPS" value={proof.gpsLocation} />
        <InfoTile label="التأكيد" value={proof.confirmation} />
      </div>
      <p className="mt-4 rounded-md bg-mist p-4 text-sm leading-7 text-steel">{proof.conditionNote}</p>
    </div>
  );
}

function OperationTermsNotice() {
  return (
    <div className="rounded-lg border border-gold/30 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-black text-navy">حماية الحقوق وشروط التشغيل المختصرة</h3>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {shortRightsTerms.map((term) => (
          <div key={term} className="rounded-md bg-mist p-4 text-sm font-bold leading-7 text-navy">
            {term}
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSystemPanel() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h3 className="text-xl font-black text-navy">نظام الإشعارات الجاهز للتكامل</h3>
      <p className="mt-2 text-sm leading-7 text-steel">
        لا يوجد ربط فعلي الآن مع واتساب أو SMS أو البريد، لكن البنية جاهزة لإنشاء سجل إشعار وإرساله لاحقًا عبر مزود خارجي.
      </p>
      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        {notificationBlueprints.map((notification) => (
          <form key={notification.type} action="/api/notifications" method="post" className="rounded-lg border border-slate-200 p-4">
            <input type="hidden" name="type" value={notification.type} />
            <input type="hidden" name="channel" value={notification.channel} />
            <input type="hidden" name="title" value={notification.title} />
            <input type="hidden" name="body" value={notification.body} />
            <input type="hidden" name="relatedId" value={operationOrder.id} />
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-black text-navy">{notification.title}</h4>
                <p className="mt-1 text-sm leading-7 text-steel">{notification.body}</p>
              </div>
              <StatusBadge>{notification.channel}</StatusBadge>
            </div>
            <button className="mt-4 rounded-md border border-gold/50 px-4 py-2 text-sm font-bold text-navy hover:border-gold">
              إنشاء إشعار تجريبي
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

function ActionChecklist({ items }: { items: string[] }) {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item} className="flex gap-3 rounded-md bg-mist p-4 text-sm font-bold leading-7 text-navy">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-gold" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-mist p-4">
      <p className="text-xs font-black text-steel">{label}</p>
      <p className="mt-2 font-bold leading-7 text-navy">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-slate-200 py-2 last:border-0">
      <span className="text-steel">{label}</span>
      <strong className="text-left text-navy">{value}</strong>
    </div>
  );
}

function PriceLine({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 last:border-0 ${strong ? "bg-gold/10 font-black" : ""}`}>
      <span className="text-steel">{label}</span>
      <strong className="text-left text-navy">{value}</strong>
    </div>
  );
}

function SupplierOffersPanel({ role }: { role: "customer" | "supplier" | "admin" }) {
  if (role === "admin") {
    return (
      <div className="grid gap-6">
        <QuotePanel />
        <OffersList title="عروض الموردين على الطلبات" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <SmartRequestSummary />
      {role === "supplier" ? <SupplierOfferForm /> : <OffersList title="العروض المتاحة لاختيار الأنسب" />}
    </div>
  );
}

function SmartRequestSummary() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-gold">نظام الطلب الذكي</p>
          <h2 className="mt-2 text-2xl font-black text-navy">{smartRequest.workType}</h2>
          <p className="mt-2 text-sm leading-7 text-steel">
            {smartRequest.id} · {smartRequest.city} · {smartRequest.siteLocation}
          </p>
        </div>
        <StatusBadge>أقرب مورد: {smartRequest.nearestSupplier}</StatusBadge>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <InfoTile label="نوع المعدة" value={smartRequest.equipmentType} />
        <InfoTile label="مدة التشغيل" value={smartRequest.duration} />
        <InfoTile label="إحداثيات GPS" value={smartRequest.gpsCoordinates} />
        <InfoTile label="مسافة تقديرية" value={`${smartRequest.distanceEstimateKm} كم`} />
        <InfoTile label="مشغل" value={smartRequest.operatorRequired} />
        <InfoTile label="نقل" value={smartRequest.transportRequired} />
        <InfoTile label="من مدينة" value={smartRequest.fromCity} />
        <InfoTile label="إلى مدينة" value={smartRequest.toCity} />
      </div>
      <p className="mt-4 rounded-md bg-mist p-4 text-sm leading-7 text-steel">{smartRequest.notes}</p>
    </div>
  );
}

function OffersList({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-black text-navy">{title}</h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {supplierOffers.map((offer) => (
          <div key={offer.id} className="rounded-lg border border-slate-200 p-4 transition hover:border-gold">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-black text-navy">{offer.supplierName}</h3>
                <p className="mt-1 text-sm text-steel">{offer.equipment} · {offer.arrivalTime}</p>
              </div>
              <StatusBadge>{offer.supplierLevel}</StatusBadge>
            </div>
            <div className="mt-4 grid gap-2 text-sm">
              <InfoRow label="السعر" value={`${formatSar(offer.price)} / ${offer.pricingType}`} />
              <InfoRow label="النقل" value={formatSar(offer.transportCost)} />
              <InfoRow label="الساعة الإضافية" value={formatSar(offer.extraHourRate)} />
              <InfoRow label="رسوم الانتظار" value={formatSar(offer.waitingFee)} />
            </div>
            <p className="mt-4 rounded-md bg-mist p-3 text-sm leading-7 text-steel">{offer.terms}</p>
            <form action="/api/operation-orders" method="post" className="mt-4 grid gap-2">
              <input type="hidden" name="rentalRequestId" value={smartRequest.id} />
              <input type="hidden" name="supplierOfferId" value={offer.id} />
              <input type="hidden" name="customerId" value="CUST-001" />
              <input type="hidden" name="supplierId" value="SUP-001" />
              <input type="hidden" name="city" value={smartRequest.city} />
              <input type="hidden" name="siteLocation" value={smartRequest.siteLocation} />
              <input type="hidden" name="gpsCoordinates" value={smartRequest.gpsCoordinates} />
              <input type="hidden" name="startAt" value="2026-05-18T07:00" />
              <input type="hidden" name="durationLabel" value={smartRequest.duration} />
              <input type="hidden" name="dailyHours" value="10" />
              <input type="hidden" name="priceAmount" value={offer.price} />
              <input type="hidden" name="pricingType" value="DAILY" />
              <input type="hidden" name="transportCost" value={offer.transportCost} />
              <input type="hidden" name="fuelResponsibility" value="على العميل" />
              <input type="hidden" name="extraHourRate" value={offer.extraHourRate} />
              <input type="hidden" name="waitingFee" value={offer.waitingFee} />
              <button className="rounded-md bg-gold px-4 py-3 text-sm font-black text-navy hover:bg-goldDark">اختيار العرض وإنشاء أمر تشغيل</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

function SupplierOfferForm() {
  return (
    <form action="/api/supplier-offers" method="post" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-2">
      <div className="md:col-span-2">
        <h2 className="text-xl font-black text-navy">إرسال عرض مورد</h2>
        <p className="mt-2 text-sm leading-7 text-steel">اقبل الطلب أو ارفضه، وأرسل السعر ووقت الوصول وشروط العرض للعميل.</p>
      </div>
      <input type="hidden" name="rentalRequestId" value={smartRequest.id} />
      <input type="hidden" name="supplierId" value="SUP-001" />
      <Field label="السعر" name="priceAmount" type="number" />
      <label className="block text-sm font-bold text-navy">
        نوع التسعير
        <select name="pricingType" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm">
          <option value="HOURLY">بالساعة</option>
          <option value="DAILY">يومي</option>
          <option value="WEEKLY">أسبوعي</option>
          <option value="MONTHLY">شهري</option>
          <option value="PROJECT">مشروع</option>
        </select>
      </label>
      <Field label="وقت الوصول المتوقع" name="arrivalTime" />
      <Field label="سعر النقل" name="transportCost" type="number" />
      <Field label="سعر ساعة إضافية" name="extraHourRate" type="number" />
      <Field label="رسوم الانتظار" name="waitingFee" type="number" />
      <Field label="مسؤولية الوقود" name="fuelResponsibility" />
      <div className="md:col-span-2"><Field label="شروط العرض" name="terms" as="textarea" /></div>
      <div className="flex flex-wrap gap-3 md:col-span-2">
        <button name="action" value="ACCEPT" className="rounded-md bg-navy px-5 py-3 text-sm font-bold text-white">إرسال العرض</button>
        <button name="action" value="REJECT" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-bold text-navy">رفض الطلب</button>
      </div>
    </form>
  );
}

function SupplierFleetPanel() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-5">
        <MetricCard label="متاحة" value="12" hint="جاهزة لاستقبال طلبات" />
        <MetricCard label="مؤجرة" value="5" hint="قيد التشغيل حاليًا" />
        <MetricCard label="تحت الصيانة" value="2" hint="لا تظهر للعملاء" />
        <MetricCard label="انتهاء فحص" value="3" hint="خلال 30 يومًا" />
        <MetricCard label="انتهاء تأمين" value="1" hint="يحتاج مراجعة" />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black text-navy">إدارة أسطول المورد</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {fleetAssets.map((asset) => (
            <div key={asset.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-navy">{asset.name}</h3>
                  <p className="mt-1 text-sm text-steel">{asset.city} · {asset.plateNumber}</p>
                </div>
                <StatusBadge>{asset.status}</StatusBadge>
              </div>
              <div className="mt-4 grid gap-2 text-sm">
                <InfoRow label="ساعات التشغيل" value={asset.hourMeter} />
                <InfoRow label="انتهاء الفحص" value={asset.inspectionExpiry} />
                <InfoRow label="انتهاء التأمين" value={asset.insuranceExpiry} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {asset.photos.map((photo) => (
                  <span key={photo} className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-navy">{photo}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <FleetStatusForm />
    </div>
  );
}

function ManualPaymentsPanel() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        {["تحويل بنكي", "كاش", "حسب الاتفاق"].map((method) => (
          <div key={method} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <h3 className="font-bold text-navy">{method}</h3>
            <p className="mt-2 text-sm leading-7 text-steel">تسجيل يدوي مع مرجع تحويل أو إثبات دفع ومراجعة الإدارة.</p>
          </div>
        ))}
      </div>
      <form action="/api/payments/confirm" method="post" encType="multipart/form-data" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="text-xl font-black text-navy">تأكيد دفع يدوي</h2>
          <p className="mt-2 text-sm text-steel">لا توجد بوابة دفع إلكترونية الآن. يتم تسجيل الدفعة ومراجعتها إداريًا.</p>
        </div>
        <Field label="رقم أمر التشغيل" name="orderId" />
        <Field label="المبلغ" name="amount" type="number" />
        <label className="block text-sm font-bold text-navy">
          طريقة الدفع
          <select name="method" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm">
            <option value="BANK_TRANSFER">تحويل بنكي</option>
            <option value="MANUAL_ADMIN_CONFIRMATION">كاش / حسب الاتفاق</option>
          </select>
        </label>
        <Field label="مرجع التحويل أو الملاحظة" name="notes" required={false} />
        <Field label="إثبات الدفع" name="receiptFile" type="file" required={false} />
        <div className="md:col-span-2"><SubmitButton>تأكيد الدفع إداريًا</SubmitButton></div>
      </form>
    </div>
  );
}

function OperationDisputesPanel() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {["تلف المعدة", "تأخير الإرجاع", "عدم السداد", "معدة غير مطابقة", "مشكلة دخول الموقع", "مشكلة المشغل", "إلغاء"].map((reason) => (
          <div key={reason} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <AlertTriangle className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-bold text-navy">{reason}</h3>
            <p className="mt-2 text-sm text-steel">الحالات: مفتوح، قيد المراجعة، محلول، مصعد.</p>
          </div>
        ))}
      </div>
      <form action="/api/disputes" method="post" encType="multipart/form-data" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-2">
        <div className="md:col-span-2">
          <h2 className="text-xl font-black text-navy">فتح نزاع</h2>
          <p className="mt-2 text-sm text-steel">يتم ربط النزاع بأمر التشغيل والصور والملاحظات وقرار الإدارة.</p>
        </div>
        <Field label="رقم أمر التشغيل" name="orderId" />
        <label className="block text-sm font-bold text-navy">
          سبب النزاع
          <select name="reason" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm">
            <option value="DAMAGE">تلف المعدة</option>
            <option value="LATE_RETURN">تأخير الإرجاع</option>
            <option value="NON_PAYMENT">عدم السداد</option>
            <option value="WRONG_EQUIPMENT">معدة غير مطابقة</option>
            <option value="SITE_ACCESS_ISSUE">مشكلة دخول الموقع</option>
            <option value="OPERATOR_ISSUE">مشكلة المشغل</option>
            <option value="CANCELLATION">إلغاء</option>
          </select>
        </label>
        <Field label="صور ومرفقات" name="evidenceFiles" type="file" required={false} />
        <div className="md:col-span-2"><Field label="ملاحظات العميل أو المورد" name="notes" as="textarea" /></div>
        <div className="md:col-span-2"><SubmitButton>فتح النزاع</SubmitButton></div>
      </form>
      <RatingPanel />
    </div>
  );
}

function RatingPanel() {
  return (
    <form action="/api/ratings" method="post" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-2">
      <div className="md:col-span-2">
        <h2 className="text-xl font-black text-navy">تقييم بعد اكتمال الطلب</h2>
        <p className="mt-2 text-sm text-steel">يدعم تقييم المورد والعميل في الالتزام وجودة المعدة والسعر والتعامل.</p>
      </div>
      <Field label="رقم أمر التشغيل" name="orderId" />
      <Field label="تقييم عام من 1 إلى 5" name="score" type="number" />
      <input type="hidden" name="fromUserId" value="USER-001" />
      <input type="hidden" name="toUserId" value="USER-002" />
      <Field label="الالتزام بالوقت" name="returnCompliance" type="number" required={false} />
      <Field label="جودة المعدة" name="paymentReliability" type="number" required={false} />
      <Field label="سرعة الرد" name="responseSpeed" type="number" required={false} />
      <div className="md:col-span-2"><Field label="تعليق نصي" name="notes" as="textarea" required={false} /></div>
      <div className="md:col-span-2"><SubmitButton>حفظ التقييم</SubmitButton></div>
    </form>
  );
}

function FleetStatusForm() {
  return (
    <form action="/api/fleet-status" method="post" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-soft md:grid-cols-2">
      <div className="md:col-span-2">
        <h2 className="text-xl font-black text-navy">تحديث حالة معدة</h2>
        <p className="mt-2 text-sm text-steel">ارفع بيانات التشغيل الأساسية بدون تغيير نظام الطلبات.</p>
      </div>
      <Field label="اسم المعدة" name="equipmentName" />
      <label className="block text-sm font-bold text-navy">
        الحالة
        <select name="status" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm">
          <option value="AVAILABLE">متاحة</option>
          <option value="RENTED">مؤجرة</option>
          <option value="MAINTENANCE">تحت الصيانة</option>
          <option value="INSPECTION_EXPIRING">انتهاء الفحص قريب</option>
          <option value="INSURANCE_EXPIRING">انتهاء التأمين قريب</option>
        </select>
      </label>
      <Field label="رقم اللوحة" name="plateNumber" required={false} />
      <Field label="ساعات التشغيل" name="hourMeterReading" type="number" required={false} />
      <Field label="تاريخ انتهاء الفحص" name="inspectionExpiryDate" type="date" required={false} />
      <Field label="تاريخ انتهاء التأمين" name="insuranceExpiryDate" type="date" required={false} />
      <div className="md:col-span-2"><Field label="ملاحظة صيانة أو تشغيل" name="lastServiceNote" as="textarea" required={false} /></div>
      <div className="md:col-span-2"><SubmitButton>حفظ حالة الأسطول</SubmitButton></div>
    </form>
  );
}

function QuotePanel() {
  const quote = calculateQuote({ dailyRate: 1800, durationDays: 6, transportCost: 1200, operatorDailyCost: 550, deposit: 3000 });
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-navy">إنشاء عرض سعر</h2>
        <p className="mt-2 text-steel">احتساب السعر والعمولة وضريبة القيمة المضافة 15% ومبلغ التأمين.</p>
        <button className="mt-5 rounded-md bg-navy px-5 py-3 text-sm font-bold text-white">حفظ عرض السعر</button>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-navy">ملخص الاحتساب</h2>
        <div className="mt-4 grid gap-3">
          {Object.entries({
            "سعر المعدة": quote.equipmentPrice,
            "تكلفة النقل": quote.transportCost,
            "تكلفة المشغل": quote.operatorCost,
            "مبلغ التأمين": quote.deposit,
            "عمولة المنصة": quote.platformFee,
            "ضريبة القيمة المضافة 15%": quote.vat,
            "الإجمالي المستحق": quote.totalPayable
          }).map(([label, value]) => (
            <div key={label} className="flex justify-between rounded-md bg-mist px-4 py-3">
              <span className="text-steel">{label}</span>
              <strong className="text-navy">{Math.round(value).toLocaleString("ar-SA")} ر.س</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EquipmentCatalogPanel({ role }: { role: "customer" | "supplier" | "admin" }) {
  return (
    <div className="grid gap-6">
      {role !== "customer" ? (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold text-navy">إضافة معدة حسب الكتالوج</h2>
          <p className="mt-2 text-sm leading-7 text-steel">اختر التصنيف والنوع ثم تظهر المواصفات التشغيلية المناسبة. النظام قابل للتوسع بإضافة أنواع جديدة من الإدارة.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {equipmentCatalog.slice(0, 9).map((category) => (
              <div key={category.slug} className="rounded-lg border border-slate-200 bg-mist p-4">
                <h3 className="font-bold text-navy">{category.arabicName}</h3>
                <p className="mt-2 text-sm text-steel">{category.types.length} نوع · {category.specFields.length} مواصفة</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <EquipmentListing />
    </div>
  );
}

function LegalCenterPanel() {
  return (
    <div className="grid gap-6">
      <LegalPanel />
      <OperationTermsNotice />
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold text-navy">سجل القبول القانوني</h2>
        <p className="mt-2 leading-7 text-steel">كل قبول قانوني يحفظ نوع المستند والإصدار والطلب المرتبط والاسم والهوية أو السجل التجاري والوقت وعنوان IP وUser Agent.</p>
      </div>
    </div>
  );
}

function DocumentRegistryPanel() {
  const docs = listGeneratedDocuments();
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-xl font-bold text-navy">المستندات القانونية</h2>
      <div className="mt-5 grid gap-4">
        {docs.map((document) => {
          const template = getDocumentTemplate(document.documentType);
          return (
            <div key={document.id} className="grid gap-3 rounded-lg border border-slate-200 p-4 lg:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-bold text-navy">{template.arabicName}</h3>
                <p className="mt-1 text-sm text-steel">{document.id} · {document.status}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <DocumentAction href={`/legal/document/${document.id}`} icon={Eye} label="معاينة" />
                <DocumentAction href={`/api/legal/document/${document.id}/pdf`} icon={Download} label="تحميل PDF" />
                <DocumentAction href={`/legal/document/${document.id}?print=1`} icon={Printer} label="طباعة" />
                <DocumentAction href={`/api/notifications/mock-send?channel=whatsapp&documentId=${document.id}`} icon={Send} label="إرسال واتساب" />
                <DocumentAction href={`/api/notifications/mock-send?channel=email&documentId=${document.id}`} icon={Mail} label="إرسال بريد" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DocumentAction({ href, icon: Icon, label }: { href: string; icon: typeof Eye; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-bold text-navy hover:border-gold">
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

function PaymentsPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {["غير مدفوع", "تم دفع التأمين", "مدفوع جزئيًا", "مدفوع بالكامل", "متأخر", "مسترد", "مخصوم من التأمين"].map((status) => (
        <div key={status} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <h3 className="font-bold text-navy">{status}</h3>
          <p className="mt-2 text-sm text-steel">تأكيد يدوي مع رفع إيصال ومراجعة الإدارة.</p>
        </div>
      ))}
    </div>
  );
}

function DisputesPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {["تلف المعدة", "تأخير الإرجاع", "عدم السداد", "معدة غير مطابقة", "مشكلة دخول الموقع", "مشكلة المشغل", "إلغاء"].map((reason) => (
        <div key={reason} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
          <AlertTriangle className="h-6 w-6 text-gold" />
          <h3 className="mt-3 font-bold text-navy">{reason}</h3>
          <p className="mt-2 text-sm text-steel">الحالات: مفتوح، قيد المراجعة، بانتظار السداد، محلول، مصعد قانونيًا.</p>
        </div>
      ))}
    </div>
  );
}

void PaymentsPanel;
void DisputesPanel;

export function DocumentPreviewPage({ id, print }: { id: string; print?: boolean }) {
  const type = parseGeneratedDocumentId(id);
  const resolved = buildGeneratedDocument(type, { status: "Pending Signature" });
  const template = getDocumentTemplate(resolved.documentType);
  return (
    <PublicShell>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[320px_1fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
            <h1 className="text-2xl font-black text-navy">{template.arabicName}</h1>
            <p className="mt-2 text-sm text-steel">{resolved.id}</p>
            <div className="mt-5 grid gap-2">
              <ButtonLink href={resolved.generatedPdfUrl} variant="ghost">تحميل PDF</ButtonLink>
              <ButtonLink href={`/legal/document/${id}?print=1`} variant="ghost">طباعة</ButtonLink>
            </div>
            <form action="/api/legal/acceptance" method="post" className="mt-6 grid gap-3">
              <input type="hidden" name="documentType" value={resolved.documentType} />
              <label className="text-sm font-bold text-navy">الاسم الكامل للتوقيع<input name="signedBy" defaultValue="عبدالله فهد القحطاني" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm" /></label>
              <label className="flex items-center gap-2 text-sm font-bold text-navy"><input name="acceptedAt" type="hidden" value={new Date().toISOString()} /><input type="checkbox" required /> أوافق وأوقع إلكترونيًا</label>
              <button className="rounded-md bg-navy px-5 py-3 text-sm font-bold text-white">قبول وتوقيع</button>
            </form>
          </div>
          <iframe title={template.arabicName} srcDoc={resolved.generatedHtml} className="h-[78vh] w-full rounded-lg border border-slate-200 bg-white shadow-soft" />
        </div>
      </section>
      {print ? <script dangerouslySetInnerHTML={{ __html: "setTimeout(() => window.print(), 600);" }} /> : null}
    </PublicShell>
  );
}

export function DashboardPage({ role, page }: { role: "customer" | "supplier" | "admin"; page: string }) {
  const labels: Record<string, string> = {
    dashboard: "لوحة التحكم",
    requests: "الطلبات",
    quotes: "عروض الأسعار",
    orders: "الأوامر",
    payments: "المدفوعات",
    contracts: "العقود",
    profile: "الملف الشخصي",
    equipment: "المعدات",
    catalog: "تصنيفات المعدات",
    documents: "المستندات",
    suppliers: "الموردون",
    customers: "العملاء",
    disputes: "النزاعات",
    legal: "المركز القانوني",
    "legal-documents": "المستندات القانونية",
    reports: "التقارير",
    settings: "الإعدادات"
  };
  return <DashboardLayout role={role} section={labels[page] ?? "لوحة التحكم"} page={page} />;
}

export function NotFoundPage() {
  return (
    <PublicShell>
      <Section title="الصفحة غير موجودة">
        <Link href="/" className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 font-bold text-white">
          العودة للرئيسية <ArrowLeft className="h-4 w-4" />
        </Link>
      </Section>
    </PublicShell>
  );
}


"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  Clock,
  Container,
  FileCheck,
  MapPin,
  MessageSquare,
  Package,
  Phone,
  RefreshCw,
  Shield,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { CitySelectField } from "@/components/city-fields";
import { officialWhatsAppLink } from "@/lib/contact";
import type { ServiceCategory } from "@/lib/service-categories";

/* ─── Types ───────────────────────────────────────────────────────────── */

type WasteTab = "all" | "containers" | "transport" | "loading" | "cleaning";

type WasteOffer = {
  id: string;
  tab: Exclude<WasteTab, "all">;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
};

type ContainerSpec = {
  size: string;
  yards: string;
  capacity: string;
  bestFor: string;
  color: string;
  icon: string;
};

type SubService = {
  label: string;
  description: string;
  icon: React.ReactNode;
};

type Equipment = {
  name: string;
  description: string;
  icon: React.ReactNode;
};

type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

/* ─── Data ────────────────────────────────────────────────────────────── */

const tabs: { id: WasteTab; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "containers", label: "حاويات" },
  { id: "transport", label: "نقل ردميات" },
  { id: "loading", label: "تحميل" },
  { id: "cleaning", label: "تنظيف مواقع" },
];

const containerSpecs: ContainerSpec[] = [
  { size: "6 ياردة", yards: "6 yd³", capacity: "~4 طن", bestFor: "منازل صغيرة · ترميم خفيف", color: "#D8A31E", icon: "📦" },
  { size: "12 ياردة", yards: "12 yd³", capacity: "~8 طن", bestFor: "شقق · مشاريع متوسطة", color: "#2563EB", icon: "📦" },
  { size: "20 ياردة", yards: "20 yd³", capacity: "~14 طن", bestFor: "عمارات · هدم جزئي", color: "#16A34A", icon: "📦" },
  { size: "40 ياردة", yards: "40 yd³", capacity: "~28 طن", bestFor: "مصانع · هدم كامل", color: "#DC2626", icon: "📦" },
  { size: "حاوية يومية", yards: "متغير", capacity: "حسب الطلب", bestFor: "مشاريع عاجلة · طوارئ", color: "#7C3AED", icon: "⚡" },
  { size: "حاوية شهرية", yards: "متغير", capacity: "حسب الطلب", bestFor: "مقاولات مستمرة · عقود", color: "#0891B2", icon: "📅" },
  { size: "تبديل ممتلئة", yards: "خدمة", capacity: "بلا توقف", bestFor: "مواقع العمل المستمر", color: "#D97706", icon: "🔄" },
];

const subServices: SubService[] = [
  { label: "حاويات مخلفات بناء", description: "توفير حاويات بأحجام متعددة للمواقع", icon: <Container className="h-5 w-5" /> },
  { label: "نقل أنقاض وهدم", description: "قلابات متخصصة لنقل مخلفات الهدم", icon: <Truck className="h-5 w-5" /> },
  { label: "رفع وترحيل الردميات", description: "معدات رفع ثقيل لنقل الكميات الكبيرة", icon: <Package className="h-5 w-5" /> },
  { label: "إزالة مخلفات الخرسانة", description: "تكسير وتحميل ونقل الخرسانة القديمة", icon: <Trash2 className="h-5 w-5" /> },
  { label: "نقل الطوب والبلوك المكسر", description: "جمع وترحيل الطوب والبلك المكسر", icon: <Package className="h-5 w-5" /> },
  { label: "إزالة الحديد والخشب المتبقي", description: "تجميع وفرز ونقل مخلفات الحديد والخشب", icon: <Trash2 className="h-5 w-5" /> },
  { label: "تنظيف مواقع المشاريع", description: "تنظيف شامل بعد انتهاء أعمال البناء", icon: <CheckCircle2 className="h-5 w-5" /> },
  { label: "تنظيف بعد الهدم", description: "إزالة جميع مخلفات الهدم وتنظيف الموقع", icon: <CheckCircle2 className="h-5 w-5" /> },
  { label: "تنظيف بعد الترميم", description: "تنظيف الموقع عقب أعمال الترميم", icon: <CheckCircle2 className="h-5 w-5" /> },
  { label: "تحميل مخلفات بالبكلين", description: "بوكلينات للتحميل السريع والكميات الكبيرة", icon: <Truck className="h-5 w-5" /> },
  { label: "شيول تحميل مخلفات", description: "شيولات لتجميع وتحميل المخلفات المتناثرة", icon: <Truck className="h-5 w-5" /> },
  { label: "قلابات نقل الردميات", description: "أسطول قلابات بأحجام مختلفة للنقل", icon: <Truck className="h-5 w-5" /> },
  { label: "سطحات نقل المعدات الصغيرة", description: "نقل البوبكات والمعدات الصغيرة للموقع", icon: <Truck className="h-5 w-5" /> },
  { label: "شفط ونقل المخلفات الثقيلة", description: "سيارات شفط متخصصة للمخلفات الثقيلة", icon: <Zap className="h-5 w-5" /> },
];

const equipmentList: Equipment[] = [
  { name: "قلابات", description: "6 · 12 · 18 متر — بأحجام تناسب جميع المشاريع", icon: <Truck className="h-6 w-6" /> },
  { name: "شيولات", description: "CAT 950 · 966 · 980 — تحميل سريع ومتين", icon: <Truck className="h-6 w-6" /> },
  { name: "بوبكات", description: "مناسبة للمواقع الضيقة والأحجام الصغيرة", icon: <Truck className="h-6 w-6" /> },
  { name: "بوكلينات", description: "بريكر وتحميل للكميات الكبيرة والخرسانة", icon: <Truck className="h-6 w-6" /> },
  { name: "كرين رفع مخلفات", description: "رفع الأنقاض الثقيلة من الطوابق العليا", icon: <Zap className="h-6 w-6" /> },
  { name: "عمال تحميل", description: "فرق ميدانية متخصصة بالتجميع والتحميل", icon: <CheckCircle2 className="h-6 w-6" /> },
  { name: "معدات تكسير خفيف", description: "لتكسير الخرسانة الصغيرة وتنظيف الحواف", icon: <Zap className="h-6 w-6" /> },
];

const features: Feature[] = [
  { icon: <Clock className="h-6 w-6" />, title: "استلام خلال ساعتين", description: "نصل للموقع خلال ساعتين من تأكيد الطلب في المناطق الرئيسية" },
  { icon: <Zap className="h-6 w-6" />, title: "خدمة طوارئ 24/7", description: "فريق طوارئ متاح على مدار الساعة طوال أيام الأسبوع" },
  { icon: <Camera className="h-6 w-6" />, title: "صور قبل وبعد", description: "توثيق كامل بالصور قبل وبعد العملية لضمان الجودة" },
  { icon: <MapPin className="h-6 w-6" />, title: "تتبع الطلب", description: "تتبع حي لموقع المركبة ومراحل تنفيذ الطلب" },
  { icon: <FileCheck className="h-6 w-6" />, title: "إصدار فاتورة", description: "فاتورة ضريبية إلكترونية فور اكتمال الخدمة" },
  { icon: <Shield className="h-6 w-6" />, title: "توثيق الاستلام", description: "وثيقة استلام رسمية موقّعة لكل عملية تسليم" },
  { icon: <RefreshCw className="h-6 w-6" />, title: "جدولة دورية", description: "خطط أسبوعية وشهرية للمشاريع المستمرة بأسعار مخفضة" },
];

const offers: WasteOffer[] = [
  {
    id: "CW-01", tab: "containers",
    title: "حاوية 12 ياردة — يومية",
    subtitle: "الأكثر طلبًا للعمارات والشقق",
    description: "تسليم وسحب في اليوم الواحد · تحتوي حتى 8 أطنان · مناسبة لمخلفات البناء المختلطة",
    price: "من 350 ر.س / يوم",
    badge: "الأكثر طلبًا",
    badgeColor: "bg-gold text-navy",
    icon: <Container className="h-5 w-5" />,
  },
  {
    id: "CW-02", tab: "containers",
    title: "حاوية 20 ياردة — أسبوعية",
    subtitle: "مثالية لمشاريع التشييد المتوسطة",
    description: "إيجار أسبوعي مرن · سعة 14 طن · مناسبة للخرسانة والردميات والهدم",
    price: "من 900 ر.س / أسبوع",
    badge: "قيمة عالية",
    badgeColor: "bg-blue-600 text-white",
    icon: <Container className="h-5 w-5" />,
  },
  {
    id: "CW-03", tab: "transport",
    title: "قلابات ردميات 18 متر",
    subtitle: "نقل سريع بأسطول متاح الآن",
    description: "قلابات 18 متر للنقل داخل وخارج المدينة · سعر بالنقلة أو بالمشروع",
    price: "من 750 ر.س / نقلة",
    badge: "متوفر الآن",
    badgeColor: "bg-green-600 text-white",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "CW-04", tab: "loading",
    title: "شيول تحميل + قلاب",
    subtitle: "خدمة تحميل ونقل متكاملة",
    description: "شيول CAT 966 مع مشغل + قلاب للنقل الفوري · مناسب للكميات الكبيرة",
    price: "من 3,200 ر.س / يوم",
    badge: "تحميل ونقل",
    badgeColor: "bg-amber-600 text-white",
    icon: <Truck className="h-5 w-5" />,
  },
  {
    id: "CW-05", tab: "loading",
    title: "بوكلين + نقل مخلفات",
    subtitle: "حفر وتكسير وترحيل فوري",
    description: "بوكلين مع بريكر لتكسير الخرسانة + قلابات لنقل المخلفات من الموقع",
    price: "من 2,800 ر.س / يوم",
    badge: "تكسير + نقل",
    badgeColor: "bg-slate-700 text-white",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "CW-06", tab: "cleaning",
    title: "تنظيف موقع بعد الهدم",
    subtitle: "تنظيف كامل للموقع",
    description: "فريق متخصص + معدات + قلابات · صور قبل وبعد · تقرير إتمام الخدمة",
    price: "سعر حسب الحجم",
    badge: "خدمة متكاملة",
    badgeColor: "bg-teal-600 text-white",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    id: "CW-07", tab: "containers",
    title: "حاوية 40 ياردة — شهرية",
    subtitle: "للمشاريع الكبيرة والمصانع",
    description: "عقد شهري · سعة 28 طن · خدمة تبديل عند الامتلاء · أسعار خاصة للمقاولين",
    price: "من 2,500 ر.س / شهر",
    badge: "عقد شهري",
    badgeColor: "bg-purple-600 text-white",
    icon: <RefreshCw className="h-5 w-5" />,
  },
  {
    id: "CW-08", tab: "cleaning",
    title: "تنظيف بعد الترميم",
    subtitle: "تنظيف دقيق للتشطيبات",
    description: "إزالة الدهان والغبار والمخلفات الخفيفة بعد أعمال الترميم والتشطيب",
    price: "من 500 ر.س",
    badge: "ترميم وتشطيب",
    badgeColor: "bg-cyan-600 text-white",
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
  {
    id: "CW-09", tab: "transport",
    title: "نقل حديد وخشب مخلفات",
    subtitle: "إزالة ومخلفات المعدن والأخشاب",
    description: "سطحات وقلابات مخصصة لنقل مخلفات الحديد والخشب والمعادن من الموقع",
    price: "من 600 ر.س / رحلة",
    badge: "نقل متخصص",
    badgeColor: "bg-rose-600 text-white",
    icon: <Truck className="h-5 w-5" />,
  },
];

const wasteTypeFilters = ["الكل", "خرسانة", "رمل", "طوب", "خشب", "حديد", "مخلفات مختلطة"];
const projectSizeFilters = ["الكل", "منزل", "عمارة", "مشروع تجاري", "مصنع"];
const serviceTypeFilters = ["الكل", "حاوية فقط", "نقل فقط", "تحميل + نقل", "تنظيف كامل"];
const durationFilters = ["الكل", "يومي", "أسبوعي", "شهري"];
const tripCountFilters = ["الكل", "نقلة واحدة", "عدة نقلات", "عقد مستمر"];

/* ─── Sub-components ──────────────────────────────────────────────────── */

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
        active
          ? "border-gold bg-gold text-navy shadow"
          : "border-slate-300 bg-white text-steel hover:border-gold hover:text-navy"
      }`}
    >
      {label}
    </button>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      <select className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
        <option value="">اختر</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function CheckField({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-slate-200 bg-white p-3 text-sm font-bold text-navy">
      <input type="checkbox" className="accent-gold" />
      {label}
    </label>
  );
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export function ConstructionWasteService({ service }: { service: ServiceCategory }) {
  const [activeTab, setActiveTab] = useState<WasteTab>("all");
  const [wasteType, setWasteType] = useState("الكل");
  const [projectSize, setProjectSize] = useState("الكل");
  const [serviceType, setServiceType] = useState("الكل");
  const [duration, setDuration] = useState("الكل");
  const [tripCount, setTripCount] = useState("الكل");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const visibleOffers = useMemo(() => {
    if (activeTab === "all") return offers;
    return offers.filter((o) => o.tab === activeTab);
  }, [activeTab]);

  return (
    <div className="bg-slate-50">

      {/* ═══ HERO ═══ */}
      <section className="relative isolate overflow-hidden bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <Image
          src={service.image}
          alt="مخلفات البناء والهدم"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/95 via-slate-900/85 to-slate-700/40" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_400px] lg:items-end">
          <div>
            <p className="text-sm font-black tracking-wide text-gold">
              حاويات · قلابات · شيولات · تنظيف مواقع
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              مخلفات البناء والهدم
              <br />
              <span className="text-gold">حلول متكاملة</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-white/80">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowRequestForm(true)}
                className="rounded-lg bg-gold px-6 py-3 text-sm font-black text-navy shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-400"
              >
                اطلب خدمة الآن
              </button>
              <a
                href={officialWhatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20"
              >
                <MessageSquare className="h-4 w-4" />
                واتساب سريع
              </a>
            </div>
          </div>
          <div className="grid gap-3 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur">
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between rounded-lg bg-white/10 px-5 py-3"
              >
                <span className="text-sm text-white/75">{stat.label}</span>
                <strong className="text-lg text-gold">{stat.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ═══ SUB-SERVICES GRID ═══ */}
        <div className="mb-12">
          <p className="text-sm font-black tracking-wide text-gold">خدماتنا المتخصصة</p>
          <h2 className="mt-2 text-3xl font-black text-navy">14 خدمة متخصصة في مخلفات البناء</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {subServices.map((item) => (
              <div
                key={item.label}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy/8 text-gold ring-1 ring-navy/10 transition group-hover:bg-gold group-hover:text-white">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-navy">{item.label}</h3>
                  <p className="mt-1 text-xs leading-6 text-steel">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ CONTAINER TYPES ═══ */}
        <div className="mb-12">
          <p className="text-sm font-black tracking-wide text-gold">أنواع الحاويات</p>
          <h2 className="mt-2 text-3xl font-black text-navy">7 أحجام تناسب كل مشروع</h2>
          <p className="mt-2 text-sm leading-7 text-steel">
            اختر الحاوية المناسبة لحجم مشروعك — توصيل وسحب من الموقع مباشرة
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {containerSpecs.map((container) => (
              <div
                key={container.size}
                className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderTopColor: container.color, borderTopWidth: 3 }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{container.icon}</span>
                    <span
                      className="rounded-full px-3 py-1 text-xs font-black text-white"
                      style={{ backgroundColor: container.color }}
                    >
                      {container.yards}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-black text-navy">{container.size}</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-steel">
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-gold" />
                      <span className="font-bold">{container.capacity}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-gold" />
                      <span>{container.bestFor}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(true)}
                    className="mt-4 w-full rounded-lg border border-slate-200 py-2 text-sm font-black text-navy transition hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    اطلب هذا الحجم
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ PROFESSIONAL FILTERS ═══ */}
        <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-gold">فلاتر احترافية</p>
              <h2 className="text-2xl font-black text-navy">حدد احتياجاتك بدقة</h2>
            </div>
            <button
              type="button"
              onClick={() => setShowRequestForm(true)}
              className="rounded-lg bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-gold hover:text-navy"
            >
              إرسال الطلب
            </button>
          </div>

          {/* Filter: Waste Type */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-black text-steel">نوع المخلفات</p>
            <div className="flex flex-wrap gap-2">
              {wasteTypeFilters.map((f) => (
                <FilterChip key={f} label={f} active={wasteType === f} onClick={() => setWasteType(f)} />
              ))}
            </div>
          </div>

          {/* Filter: Project Size */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-black text-steel">حجم المشروع</p>
            <div className="flex flex-wrap gap-2">
              {projectSizeFilters.map((f) => (
                <FilterChip key={f} label={f} active={projectSize === f} onClick={() => setProjectSize(f)} />
              ))}
            </div>
          </div>

          {/* Filter: Service Type */}
          <div className="mb-5">
            <p className="mb-2 text-sm font-black text-steel">نوع الخدمة</p>
            <div className="flex flex-wrap gap-2">
              {serviceTypeFilters.map((f) => (
                <FilterChip key={f} label={f} active={serviceType === f} onClick={() => setServiceType(f)} />
              ))}
            </div>
          </div>

          {/* Filter: Duration + Trip Count in row */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="mb-2 text-sm font-black text-steel">مدة الخدمة</p>
              <div className="flex flex-wrap gap-2">
                {durationFilters.map((f) => (
                  <FilterChip key={f} label={f} active={duration === f} onClick={() => setDuration(f)} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-black text-steel">عدد النقلات</p>
              <div className="flex flex-wrap gap-2">
                {tripCountFilters.map((f) => (
                  <FilterChip key={f} label={f} active={tripCount === f} onClick={() => setTripCount(f)} />
                ))}
              </div>
            </div>
          </div>

          {/* Advanced Selects */}
          <div className="mt-5 grid gap-3 border-t border-slate-100 pt-5 md:grid-cols-3 lg:grid-cols-4">
            <SelectField label="نوع المخلفات (تفصيلي)" options={["خرسانة", "رمل", "طوب", "خشب", "حديد", "مخلفات مختلطة"]} />
            <SelectField label="حجم الحاوية" options={["6 ياردة", "12 ياردة", "20 ياردة", "40 ياردة", "يومية", "شهرية"]} />
            <CitySelectField label="المدينة" required={false} placeholder="اختر المدينة" />
            <SelectField label="عدد القلابات" options={["1", "2-3", "4-5", "6-10", "أكثر من 10"]} />
            <CheckField label="خدمة طوارئ 24 ساعة" />
            <CheckField label="مع معدة تحميل" />
            <CheckField label="صور توثيقية" />
            <CheckField label="عقد شهري مستمر" />
          </div>
        </div>

        {/* ═══ OFFERS TABS ═══ */}
        <div className="mb-12">
          <div className="mb-5 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-5 py-2.5 text-sm font-black transition ${
                  activeTab === tab.id
                    ? "border-navy bg-navy text-white"
                    : "border-slate-300 bg-white text-steel hover:border-navy hover:text-navy"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleOffers.map((offer) => (
              <article
                key={offer.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-xl"
              >
                {/* Card Image Placeholder */}
                <div className="relative h-44 overflow-hidden rounded-t-xl bg-gradient-to-br from-navy to-slate-700">
                  <Image
                    src={service.image}
                    alt={offer.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-50 transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${offer.badgeColor}`}>
                    {offer.badge}
                  </span>
                  <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gold text-navy">
                    {offer.icon}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold text-gold">{offer.subtitle}</p>
                  <h3 className="mt-1.5 text-lg font-black text-navy">{offer.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-steel">{offer.description}</p>

                  <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-3">
                    <Package className="h-4 w-4 text-gold" />
                    <span className="text-sm font-black text-navy">{offer.price}</span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-100 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(true)}
                      className="rounded-lg bg-gold py-2.5 text-sm font-black text-navy transition hover:bg-amber-400"
                    >
                      طلب عرض
                    </button>
                    <a
                      href={officialWhatsAppLink}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2.5 text-sm font-black text-navy transition hover:border-green-600 hover:text-green-700"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      واتساب
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ═══ EQUIPMENT GRID ═══ */}
        <div className="mb-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm font-black text-gold">المعدات المرتبطة</p>
          <h2 className="mt-2 text-3xl font-black text-navy">أسطول متكامل لخدمة مواقعك</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {equipmentList.map((eq) => (
              <div
                key={eq.name}
                className="group flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-gold hover:bg-white hover:shadow"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy">
                  {eq.icon}
                </div>
                <div>
                  <h3 className="font-black text-navy">{eq.name}</h3>
                  <p className="mt-1 text-xs leading-6 text-steel">{eq.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ SERVICE FEATURES ═══ */}
        <div className="mb-12">
          <p className="text-sm font-black text-gold">لماذا فليت معدات؟</p>
          <h2 className="mt-2 text-3xl font-black text-navy">7 مميزات تميّزنا</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-gold hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20 transition group-hover:bg-gold group-hover:text-white">
                  {f.icon}
                </div>
                <h3 className="mt-4 font-black text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-7 text-steel">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ REQUEST FORM ═══ */}
        {showRequestForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
              onClick={() => setShowRequestForm(false)}
            />
            <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
              {/* Modal Header */}
              <div className="bg-navy px-6 py-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-gold/80">منصة فليت معدات</p>
                    <h2 className="mt-1 text-xl font-black">طلب خدمة مخلفات البناء</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="rounded-full border border-white/20 bg-white/10 p-2 text-white/70 transition hover:bg-white/20"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="max-h-[70vh] overflow-y-auto p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-bold text-navy">
                    الاسم الكامل
                    <input
                      type="text"
                      placeholder="محمد العبدالله"
                      className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </label>
                  <label className="block text-sm font-bold text-navy">
                    رقم الجوال
                    <input
                      type="tel"
                      placeholder="+966 5x xxx xxxx"
                      className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </label>
                  <SelectField label="نوع الخدمة" options={["حاوية فقط", "نقل فقط", "تحميل + نقل", "تنظيف كامل"]} />
                  <SelectField label="حجم الحاوية" options={["6 ياردة", "12 ياردة", "20 ياردة", "40 ياردة", "يومية", "شهرية"]} />
                  <SelectField label="نوع المخلفات" options={["خرسانة", "رمل", "طوب", "خشب", "حديد", "مخلفات مختلطة"]} />
                  <SelectField label="حجم المشروع" options={["منزل", "عمارة", "مشروع تجاري", "مصنع"]} />
                  <SelectField label="مدة الخدمة" options={["يومي", "أسبوعي", "شهري", "عقد مستمر"]} />
                  <CitySelectField label="المدينة" required={false} placeholder="اختر المدينة" />
                  <label className="sm:col-span-2 block text-sm font-bold text-navy">
                    عنوان الموقع بالتفصيل
                    <div className="relative mt-2">
                      <input
                        type="text"
                        placeholder="الحي، الشارع، رقم القطعة..."
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 pr-10 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                      />
                      <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    </div>
                  </label>
                  <label className="sm:col-span-2 block text-sm font-bold text-navy">
                    رفع صور المخلفات (اختياري)
                    <div className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 py-6 transition hover:border-gold hover:bg-gold/5">
                      <Camera className="h-6 w-6 text-slate-400" />
                      <div className="text-sm">
                        <span className="font-black text-navy">اضغط لرفع صور</span>
                        <span className="text-steel"> أو اسحب الملفات هنا</span>
                      </div>
                      <input type="file" accept="image/*" multiple className="hidden" />
                    </div>
                    <p className="mt-1 text-xs text-steel">JPG, PNG — حتى 5 صور</p>
                  </label>
                  <label className="sm:col-span-2 block text-sm font-bold text-navy">
                    ملاحظات إضافية
                    <textarea
                      rows={3}
                      placeholder="أي تفاصيل إضافية عن الموقع أو الكميات أو الجدول الزمني..."
                      className="mt-2 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    />
                  </label>
                </div>

                {/* Urgent notice */}
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                  <p className="text-xs font-bold text-amber-900">
                    خدمة الطوارئ متاحة 24 ساعة. سيتواصل معك فريقنا خلال دقائق للتأكيد.
                  </p>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/request-equipment"
                    className="flex items-center justify-center gap-2 rounded-lg bg-navy py-3 text-sm font-black text-white transition hover:bg-gold hover:text-navy"
                  >
                    إرسال الطلب
                  </Link>
                  <a
                    href={officialWhatsAppLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] py-3 text-sm font-black text-white transition hover:bg-[#1ebe5d]"
                  >
                    <MessageSquare className="h-4 w-4" />
                    واتساب فوري
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══ RELATED SERVICES ═══ */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black text-navy">خدمات مشابهة</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: "/services/demolition", label: "التكسير والهدم", desc: "معدات تكسير وهدم وبريكرات" },
              { href: "/services/excavation", label: "الحفر وتجهيز المواقع", desc: "بوكلينات وحفارات ومعدات مساندة" },
              { href: "/services/backfilling", label: "الردم والتسوية", desc: "قلابات وشيولات ومواد ردم" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 transition hover:border-gold hover:bg-white hover:shadow"
              >
                <h3 className="font-black text-navy">{item.label}</h3>
                <p className="mt-2 text-sm text-steel">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

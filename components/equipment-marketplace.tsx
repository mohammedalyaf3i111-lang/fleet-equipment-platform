"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ChevronDown, SlidersHorizontal, Search, SendHorizontal } from "lucide-react";
import { officialWhatsAppLink } from "@/lib/contact";
import { getEquipmentFilterSchema, type EquipmentFilterField } from "@/constants/equipmentFilterSchemas";

// ─── Types ────────────────────────────────────────────────────────────────────
type EquipmentItem = {
  id: string; name: string; category: string; supplier: string; city: string;
  available: boolean; dailyPrice: number; monthlyPrice: number; image: string; verified: boolean;
  brand?: string; bladeWidth?: string; horsepower?: number; operatingWeight?: string;
  hasOperator?: boolean; gpsReady?: boolean; ripperAvailable?: boolean; articulatedFrame?: boolean;
};

// ─── Slug → Arabic category labels ───────────────────────────────────────────
const SLUG_TO_CATEGORIES: Record<string, string[]> = {
  "cranes":                ["كرينات"],
  "crane":                 ["كرينات"],
  "excavators":            ["حفارات"],
  "excavator":             ["حفارات"],
  "wheel-loaders":         ["شيولات"],
  "wheel-loader":          ["شيولات"],
  "trucks":                ["قلابات", "سطحات"],
  "dump-trucks":           ["قلابات"],
  "lowbeds":               ["سطحات"],
  "skid-steers":           ["بوبكات"],
  "bobcats":               ["بوبكات"],
  "forklifts":             ["فوركلفت"],
  "compressors-generators":["مولدات", "كمبروسرات"],
  "generators":            ["مولدات"],
  "compressors":           ["كمبروسرات"],
  "boom-lifts-manlifts":   ["مان لفت", "رافعات بوم"],
  "manlifts":              ["مان لفت"],
  "boom-lifts":            ["رافعات بوم"],
  "grader":                ["جريدرات"],
  "graders":               ["جريدرات"],
  "road-equipment":        ["جريدرات"],
  "jcb":                   ["جريدرات", "حفارات"],
  "bulldozers":            ["جريدرات"],
  "bulldozer":             ["جريدرات"]
};

// ─── Grader mock data ─────────────────────────────────────────────────────────
const graderItems: EquipmentItem[] = [
  { id: "EQG001", name: "جريدر CAT 140 M3", category: "جريدرات", brand: "CAT", supplier: "معدات الطرق المتقدمة", city: "الرياض", available: true, dailyPrice: 2800, monthlyPrice: 68000, image: "/images/new-categories/grader.jpg", verified: true, bladeWidth: "3.70", horsepower: 155, operatingWeight: "14.7 طن", hasOperator: true, gpsReady: true, ripperAvailable: false, articulatedFrame: false },
  { id: "EQG002", name: "جريدر Komatsu GD555A", category: "جريدرات", brand: "Komatsu", supplier: "شركة الطرق والمشاريع", city: "جدة", available: true, dailyPrice: 3100, monthlyPrice: 75000, image: "/images/services/graders.jpg", verified: true, bladeWidth: "3.96", horsepower: 175, operatingWeight: "18.2 طن", hasOperator: true, gpsReady: true, ripperAvailable: true, articulatedFrame: false },
  { id: "EQG003", name: "جريدر Volvo G940", category: "جريدرات", brand: "Volvo", supplier: "مؤسسة الطرق الحديثة", city: "الدمام", available: false, dailyPrice: 2950, monthlyPrice: 71000, image: "/images/new-categories/grader.jpg", verified: true, bladeWidth: "3.66", horsepower: 167, operatingWeight: "15.7 طن", hasOperator: false, gpsReady: false, ripperAvailable: true, articulatedFrame: true },
  { id: "EQG004", name: "جريدر CAT 120 M3", category: "جريدرات", brand: "CAT", supplier: "معدات الطرق المتقدمة", city: "مكة المكرمة", available: true, dailyPrice: 2200, monthlyPrice: 53000, image: "/images/new-categories/grader.jpg", verified: false, bladeWidth: "3.66", horsepower: 125, operatingWeight: "12.9 طن", hasOperator: true, gpsReady: false, ripperAvailable: false, articulatedFrame: false },
  { id: "EQG005", name: "جريدر SDLG GR215", category: "جريدرات", brand: "SDLG", supplier: "التجهيزات الثقيلة السعودية", city: "الرياض", available: true, dailyPrice: 1700, monthlyPrice: 41000, image: "/images/services/graders.jpg", verified: true, bladeWidth: "3.70", horsepower: 138, operatingWeight: "13.9 طن", hasOperator: false, gpsReady: false, ripperAvailable: false, articulatedFrame: false },
  { id: "EQG006", name: "جريدر John Deere 672G", category: "جريدرات", brand: "John Deere", supplier: "معدات البناء الحديثة", city: "الخبر", available: true, dailyPrice: 2600, monthlyPrice: 63000, image: "/images/new-categories/grader.jpg", verified: true, bladeWidth: "3.96", horsepower: 158, operatingWeight: "15.3 طن", hasOperator: true, gpsReady: true, ripperAvailable: true, articulatedFrame: false }
];

// ─── General mock data ────────────────────────────────────────────────────────
const mockEquipment: EquipmentItem[] = [
  { id: "EQ001", name: "كرين 50 طن - Liebherr LTM 1050",      category: "كرينات",    supplier: "شركة الرياض للمعدات",        city: "الرياض",        available: true,  dailyPrice: 3500,  monthlyPrice: 85000,  image: "/images/categories/cranes.jpg",        verified: true  },
  { id: "EQ012", name: "كرين 20 طن - Grove GMK 3060",          category: "كرينات",    supplier: "الرافعات السعودية",           city: "جدة",           available: true,  dailyPrice: 2200,  monthlyPrice: 54000,  image: "/images/categories/cranes.jpg",        verified: true  },
  { id: "EQ013", name: "كرين 100 طن - Liebherr LTM 1100",      category: "كرينات",    supplier: "شركة البناء المتقدم",         city: "الرياض",        available: true,  dailyPrice: 5500,  monthlyPrice: 130000, image: "/images/categories/cranes.jpg",        verified: true  },
  { id: "EQ002", name: "بوكلين CAT 320 - حفر وتحميل",          category: "حفارات",    supplier: "مؤسسة الشرق الأوسط",          city: "جدة",           available: true,  dailyPrice: 2200,  monthlyPrice: 52000,  image: "/images/categories/excavators.jpg",    verified: true  },
  { id: "EQ014", name: "حفار CAT 330 - مع بريكر",              category: "حفارات",    supplier: "معدات المنطقة الشرقية",       city: "الدمام",        available: true,  dailyPrice: 2600,  monthlyPrice: 62000,  image: "/images/categories/excavators.jpg",    verified: true  },
  { id: "EQ003", name: "شيول Volvo L150H - تحميل ونقل",        category: "شيولات",    supplier: "شركة الخليج للمعدات الثقيلة", city: "الدمام",        available: true,  dailyPrice: 1900,  monthlyPrice: 45000,  image: "/images/categories/wheel-loaders.jpg", verified: true  },
  { id: "EQ015", name: "شيول CAT 966 - بكت 3.5 متر",           category: "شيولات",    supplier: "شركة الرياض للمعدات",         city: "الرياض",        available: false, dailyPrice: 2100,  monthlyPrice: 50000,  image: "/images/categories/wheel-loaders.jpg", verified: true  },
  { id: "EQ004", name: "قلاب 18 متر - Mercedes Actros",         category: "قلابات",    supplier: "مؤسسة النقل الحديث",          city: "الرياض",        available: false, dailyPrice: 1400,  monthlyPrice: 33000,  image: "/images/services/dump-trucks.jpg",     verified: true  },
  { id: "EQ016", name: "قلاب 8 متر - DAF XF",                  category: "قلابات",    supplier: "مؤسسة النقل الحديث",          city: "جدة",           available: true,  dailyPrice: 900,   monthlyPrice: 21000,  image: "/images/services/dump-trucks.jpg",     verified: false },
  { id: "EQ005", name: "بوبكات Bobcat S650 - بكفرات",          category: "بوبكات",    supplier: "شركة الجزيرة للمعدات",        city: "مكة المكرمة",   available: true,  dailyPrice: 950,   monthlyPrice: 22000,  image: "/images/categories/bobcats.jpg",       verified: false },
  { id: "EQ006", name: "فوركلفت Toyota 7FG35 - 3.5 طن",        category: "فوركلفت",   supplier: "مستودعات السعودية",           city: "جدة",           available: true,  dailyPrice: 850,   monthlyPrice: 19000,  image: "/images/categories/forklifts.jpg",     verified: true  },
  { id: "EQ017", name: "فوركلفت Komatsu 5 طن ديزل",            category: "فوركلفت",   supplier: "مستودعات السعودية",           city: "الرياض",        available: true,  dailyPrice: 900,   monthlyPrice: 21000,  image: "/images/categories/forklifts.jpg",     verified: true  },
  { id: "EQ007", name: "مولد CAT 500 KVA ديزل",                category: "مولدات",    supplier: "شركة القدرة للطاقة",          city: "الرياض",        available: true,  dailyPrice: 1200,  monthlyPrice: 28000,  image: "/images/categories/generators.jpg",    verified: true  },
  { id: "EQ018", name: "مولد Perkins 100 KVA صامت",             category: "مولدات",    supplier: "شركة القدرة للطاقة",          city: "جدة",           available: true,  dailyPrice: 650,   monthlyPrice: 15000,  image: "/images/categories/generators.jpg",    verified: true  },
  { id: "EQ008", name: "مان لفت JLG 400S - 40 قدم",            category: "مان لفت",   supplier: "الرافعات السعودية",           city: "الدمام",        available: true,  dailyPrice: 780,   monthlyPrice: 18000,  image: "/images/categories/manlifts.jpg",      verified: true  },
  { id: "EQ009", name: "كمبروسر Atlas Copco 185 cfm",           category: "كمبروسرات", supplier: "معدات الهواء المضغوط",        city: "الرياض",        available: true,  dailyPrice: 650,   monthlyPrice: 15000,  image: "/images/categories/compressors.jpg",   verified: false },
  { id: "EQ010", name: "رصاصة تمهيد - Bomag BW 213",           category: "رصاصات",    supplier: "شركة الطرق والبناء",          city: "جدة",           available: true,  dailyPrice: 1100,  monthlyPrice: 26000,  image: "/images/services/compaction.jpg",      verified: true  },
  { id: "EQ011", name: "سطحة 40 طن - Man TGA",                 category: "سطحات",     supplier: "خدمات النقل الثقيل",          city: "الدمام",        available: false, dailyPrice: 2800,  monthlyPrice: 65000,  image: "/images/categories/lowbeds.jpg",       verified: true  }
];

const ALL_CITIES     = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الجبيل", "تبوك"];
const ALL_CATEGORIES = ["الكل", "كرينات", "حفارات", "شيولات", "قلابات", "بوبكات", "فوركلفت", "مولدات", "مان لفت", "كمبروسرات", "سطحات"];

function formatSar(n: number) { return n.toLocaleString("ar-SA") + " ر.س"; }

// ─── Generic filter field renderer ────────────────────────────────────────────
function FieldControl({
  field, value, onChange, cities
}: {
  field: EquipmentFilterField; value: string; onChange: (v: string) => void; cities: string[];
}) {
  const cls = "w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

  if (field.type === "city") {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-black text-steel">{field.label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className={cls}>
          <option value="">كل المدن</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    );
  }
  if (field.type === "boolean") {
    return (
      <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-navy transition hover:border-gold/50">
        <input type="checkbox" checked={value === "true"} onChange={e => onChange(e.target.checked ? "true" : "")} className="h-4 w-4 rounded border-slate-300 accent-gold" />
        {field.label}
      </label>
    );
  }
  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="mb-1.5 block text-xs font-black text-steel">{field.label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className={cls}>
          <option value="">الكل</option>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black text-steel">{field.label}</label>
      <input
        type={field.type === "number" ? "number" : "text"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={field.placeholder ?? (field.unit ? `بالـ ${field.unit}` : "")}
        className={cls}
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function EquipmentMarketplace({ categorySlug }: { categorySlug?: string }) {
  const hasCategory = !!categorySlug;
  const schema      = getEquipmentFilterSchema(categorySlug);
  const isGrader    = categorySlug === "grader" || categorySlug === "graders" || categorySlug === "road-equipment";
  const targetCats  = categorySlug ? (SLUG_TO_CATEGORIES[categorySlug] ?? []) : [];

  // ── Filter values (schema-driven) ────────────────────────────────────────
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const setField = (key: string, val: string) => setFilterValues(prev => ({ ...prev, [key]: val }));

  // ── Grader-specific state ────────────────────────────────────────────────
  const [graderHp,       setGraderHp]       = useState("");
  const [graderBlade,    setGraderBlade]    = useState("");
  const [graderOperator, setGraderOperator] = useState(false);
  const [graderGps,      setGraderGps]      = useState(false);
  const [graderRipper,   setGraderRipper]   = useState(false);

  // ── UI state ─────────────────────────────────────────────────────────────
  const [showFilters, setShowFilters]   = useState(true);   // open by default on category pages
  const [hasSearched, setHasSearched]   = useState(!hasCategory); // auto-show results on main page
  const [sortBy,      setSortBy]        = useState("newest");
  const [currentPage, setCurrentPage]   = useState(1);

  // Generic state (main marketplace only)
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedCity,     setSelectedCity]      = useState("");
  const [availableOnly,    setAvailableOnly]     = useState(false);
  const [verifiedOnly,     setVerifiedOnly]      = useState(false);

  // ── Build result list (applied only after search) ─────────────────────────
  let filtered: EquipmentItem[] = isGrader
    ? [...graderItems]
    : targetCats.length > 0
      ? mockEquipment.filter(e => targetCats.includes(e.category))
      : [...mockEquipment];

  if (!hasCategory && selectedCategory !== "الكل")
    filtered = filtered.filter(e => e.category === selectedCategory);

  // City
  const cityVal = hasCategory ? (filterValues["city"] ?? "") : selectedCity;
  if (cityVal) filtered = filtered.filter(e => e.city === cityVal);

  // Grader-specific
  if (isGrader) {
    const hpRange = graderHp;
    if (hpRange) {
      filtered = filtered.filter(e => {
        const hp = e.horsepower ?? 0;
        if (hpRange === "حتى 120 HP")      return hp <= 120;
        if (hpRange === "120–160 HP")       return hp > 120 && hp <= 160;
        if (hpRange === "160–200 HP")       return hp > 160 && hp <= 200;
        if (hpRange === "200–250 HP")       return hp > 200 && hp <= 250;
        if (hpRange === "أكثر من 250 HP") return hp > 250;
        return true;
      });
    }
    const bladeRange = graderBlade;
    if (bladeRange) {
      filtered = filtered.filter(e => {
        const bw = parseFloat(e.bladeWidth ?? "0");
        if (bladeRange === "أقل من 3.5 متر")   return bw < 3.5;
        if (bladeRange === "3.5 – 3.7 متر")    return bw >= 3.5 && bw <= 3.7;
        if (bladeRange === "3.7 – 4.0 متر")    return bw > 3.7 && bw <= 4.0;
        if (bladeRange === "أكثر من 4.0 متر") return bw > 4.0;
        return true;
      });
    }
    if (graderOperator) filtered = filtered.filter(e => e.hasOperator === true);
    if (graderGps)      filtered = filtered.filter(e => e.gpsReady === true);
    if (graderRipper)   filtered = filtered.filter(e => e.ripperAvailable === true);
  }

  if (availableOnly) filtered = filtered.filter(e => e.available);
  if (verifiedOnly)  filtered = filtered.filter(e => e.verified);
  if (sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.dailyPrice - b.dailyPrice);

  const perPage    = 6;
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated  = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // ── Separate booleans from other fields for layout ────────────────────────
  const nonBoolFields = schema?.fields.filter(f => f.type !== "boolean") ?? [];
  const boolFields    = schema?.fields.filter(f => f.type === "boolean")  ?? [];

  // ── Handle search click ───────────────────────────────────────────────────
  function handleSearch() {
    setCurrentPage(1);
    setHasSearched(true);
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  function handleReset() {
    setFilterValues({});
    setGraderHp(""); setGraderBlade("");
    setGraderOperator(false); setGraderGps(false); setGraderRipper(false);
    setAvailableOnly(false); setVerifiedOnly(false);
    setSelectedCategory("الكل"); setSelectedCity("");
    setHasSearched(!hasCategory);
    setCurrentPage(1);
  }

  const pageTitle   = schema ? schema.title : hasCategory ? "المعدات المتاحة" : "جميع المعدات";
  const pageEyebrow = schema ? schema.title : "سوق المعدات";

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Page header ─────────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gold">{pageEyebrow}</p>
            <h2 className="text-2xl font-black text-navy">{pageTitle}</h2>
            {hasCategory && !hasSearched && (
              <p className="mt-1 text-sm text-steel">حدد الفلاتر المناسبة ثم اضغط على زر البحث</p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy shadow-sm transition hover:border-gold"
            >
              <SlidersHorizontal className="h-4 w-4" />
              الفلاتر
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
            </button>
            {hasSearched && (
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy shadow-sm"
              >
                <option value="newest">الأحدث</option>
                <option value="popular">الأكثر طلباً</option>
                <option value="price_asc">الأقل سعراً</option>
              </select>
            )}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            GRADER filter panel
        ══════════════════════════════════════════════════════════════════ */}
        {isGrader && showFilters && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gold/30 bg-white shadow-sm">
            <div className="border-b border-gold/20 bg-navy/3 px-5 py-3">
              <p className="text-xs font-black uppercase tracking-widest text-gold">فلاتر الجريدر</p>
            </div>
            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FieldControl
                  field={{ key: "city", label: "المدينة / الموقع", type: "city" }}
                  value={filterValues["city"] ?? ""}
                  onChange={v => setField("city", v)}
                  cities={ALL_CITIES}
                />
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">موديل الجريدر</label>
                  <select value={filterValues["model"] ?? ""} onChange={e => setField("model", e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                    <option value="">جميع الموديلات</option>
                    {["Grader 120", "Grader 140", "Grader 160", "14M", "16M", "24M"].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">القدرة الحصانية</label>
                  <select value={graderHp} onChange={e => setGraderHp(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                    <option value="">جميع القدرات</option>
                    {["حتى 120 HP", "120–160 HP", "160–200 HP", "200–250 HP", "أكثر من 250 HP"].map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">عرض الشفرة</label>
                  <select value={graderBlade} onChange={e => setGraderBlade(e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                    <option value="">جميع الأحجام</option>
                    {["أقل من 3.5 متر", "3.5 – 3.7 متر", "3.7 – 4.0 متر", "أكثر من 4.0 متر"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">سنة الصنع</label>
                  <input type="number" placeholder="مثال: 2020" value={filterValues["year"] ?? ""} onChange={e => setField("year", e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">سعر اليوم (حتى)</label>
                  <input type="number" placeholder="ر.س" value={filterValues["dailyRate"] ?? ""} onChange={e => setField("dailyRate", e.target.value)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none" />
                </div>
              </div>
              {/* Boolean toggles */}
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { label: "مع مشغل",       val: graderOperator, set: setGraderOperator },
                  { label: "GPS جاهز",        val: graderGps,      set: setGraderGps },
                  { label: "ريبر متوفر",     val: graderRipper,   set: setGraderRipper },
                  { label: "متاحة فقط",      val: availableOnly,  set: setAvailableOnly },
                  { label: "موردون معتمدون", val: verifiedOnly,   set: setVerifiedOnly }
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-navy transition hover:border-gold/50">
                    <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    {label}
                  </label>
                ))}
              </div>
              {/* Search + Reset */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-black text-navy shadow-md shadow-gold/25 transition hover:bg-[#d6aa4d] hover:shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  بحث عن المعدات المتوفرة
                </button>
                <button onClick={handleReset} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-steel transition hover:border-gold hover:text-navy">
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SCHEMA-DRIVEN filter panel (all non-grader categories)
        ══════════════════════════════════════════════════════════════════ */}
        {!isGrader && hasCategory && schema && showFilters && (
          <div className="mb-6 overflow-hidden rounded-xl border border-gold/30 bg-white shadow-sm">
            <div className="border-b border-gold/20 bg-navy/3 px-5 py-3">
              <p className="text-xs font-black uppercase tracking-widest text-gold">فلاتر {schema.title}</p>
            </div>
            <div className="p-5">
              {/* Select / text / number fields */}
              {nonBoolFields.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {nonBoolFields.map(field => (
                    <FieldControl
                      key={field.key}
                      field={field}
                      value={filterValues[field.key] ?? ""}
                      onChange={v => setField(field.key, v)}
                      cities={ALL_CITIES}
                    />
                  ))}
                </div>
              )}
              {/* Boolean toggles */}
              {boolFields.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {boolFields.map(field => (
                    <FieldControl
                      key={field.key}
                      field={field}
                      value={filterValues[field.key] ?? ""}
                      onChange={v => setField(field.key, v)}
                      cities={ALL_CITIES}
                    />
                  ))}
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-navy transition hover:border-gold/50">
                    <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    متاحة فقط
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-navy transition hover:border-gold/50">
                    <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    موردون معتمدون
                  </label>
                </div>
              )}
              {/* Search + Reset */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleSearch}
                  className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-black text-navy shadow-md shadow-gold/25 transition hover:bg-[#d6aa4d] hover:shadow-lg"
                >
                  <Search className="h-4 w-4" />
                  بحث عن المعدات المتوفرة
                </button>
                <button onClick={handleReset} className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-bold text-steel transition hover:border-gold hover:text-navy">
                  إعادة تعيين
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            GENERIC filter panel (main marketplace — no category selected)
        ══════════════════════════════════════════════════════════════════ */}
        {!hasCategory && showFilters && (
          <div className="mb-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">الفئة</label>
                  <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy">
                    {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black text-steel">المدينة</label>
                  <select value={selectedCity} onChange={e => { setSelectedCity(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy">
                    <option value="">كل المدن</option>
                    {ALL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-3 pt-6">
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-navy">
                    <input type="checkbox" checked={availableOnly} onChange={e => { setAvailableOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    متاحة فقط
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm font-bold text-navy">
                    <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    موردون معتمدون فقط
                  </label>
                </div>
                <div className="flex items-end">
                  <button onClick={handleReset} className="rounded-md border border-slate-200 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">إعادة تعيين</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            RESULTS AREA — only shown after search on category pages
        ══════════════════════════════════════════════════════════════════ */}
        {!hasSearched ? (
          /* Prompt to search */
          <div className="rounded-xl border-2 border-dashed border-gold/30 bg-gold/5 p-12 text-center">
            <Search className="mx-auto mb-4 h-10 w-10 text-gold/60" />
            <p className="text-base font-black text-navy">حدد الفلاتر المناسبة</p>
            <p className="mt-2 text-sm text-steel">ثم اضغط على &quot;بحث عن المعدات المتوفرة&quot; لعرض النتائج</p>
            <button
              onClick={handleSearch}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-7 py-3 text-sm font-black text-navy shadow-md shadow-gold/25 transition hover:bg-[#d6aa4d]"
            >
              <Search className="h-4 w-4" />
              بحث عن المعدات المتوفرة
            </button>
          </div>
        ) : paginated.length === 0 ? (
          /* No results */
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-7 w-7 text-slate-400" />
            </div>
            <p className="text-lg font-black text-navy">لا توجد معدات مطابقة حاليًا</p>
            <p className="mt-2 text-sm text-steel">جرّب تغيير الفلاتر أو أرسل طلبًا خاصًا وسنتواصل معك</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/request-equipment"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-black text-navy shadow-md shadow-gold/25 transition hover:bg-[#d6aa4d]"
              >
                <SendHorizontal className="h-4 w-4" />
                إرسال طلب خاص
              </Link>
              <a
                href={officialWhatsAppLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:border-gold"
              >
                <MessageSquare className="h-4 w-4" />
                تواصل واتساب
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Result count */}
            <p className="mb-4 text-sm text-steel">
              تم العثور على <span className="font-black text-navy">{filtered.length}</span> معدة مطابقة
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map(item =>
                isGrader
                  ? <GraderCard key={item.id} item={item} />
                  : <EquipmentCard key={item.id} item={item} />
              )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold disabled:opacity-40">السابق</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)} className={`rounded-md border px-4 py-2 text-sm font-bold transition ${currentPage === p ? "border-gold bg-gold text-navy" : "border-slate-200 text-navy hover:border-gold"}`}>{p}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold disabled:opacity-40">التالي</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Generic equipment card ───────────────────────────────────────────────────
function EquipmentCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md">
      <div className="relative h-48 bg-slate-200">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
        <Image src={item.image} alt={item.name} fill sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-black text-white ${item.available ? "bg-green-600" : "bg-slate-600"}`}>
            {item.available ? "متاحة" : "غير متاحة"}
          </span>
          {item.verified && (
            <span className="flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-xs font-black text-navy">
              <CheckCircle2 className="h-3.5 w-3.5" />معتمد
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-black leading-tight text-navy">{item.name}</h3>
        <p className="mt-1 text-xs text-steel">{item.supplier} · {item.city}</p>
        <div className="mt-3 flex items-center justify-between">
          <div><p className="text-xs text-steel">يومي</p><p className="font-black text-navy">{formatSar(item.dailyPrice)}</p></div>
          <div><p className="text-xs text-steel">شهري</p><p className="font-black text-navy">{formatSar(item.monthlyPrice)}</p></div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href="/request-equipment" className="flex items-center justify-center rounded-md bg-gold py-2.5 text-xs font-black text-navy transition hover:bg-[#d6aa4d]">طلب عرض</Link>
          <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-md bg-[#25D366]/10 py-2.5 text-xs font-black text-[#128C7E] transition hover:bg-[#25D366]/20">
            <MessageSquare className="h-3.5 w-3.5" />واتساب
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Grader card ──────────────────────────────────────────────────────────────
function GraderCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md">
      <div className="relative h-52 bg-slate-200">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
        <Image src={item.image} alt={item.name} fill sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw" className="object-cover transition duration-500 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/15 to-transparent" />
        <div className="absolute right-3 top-3">
          <span className="rounded-md bg-navy/80 px-2.5 py-1 text-xs font-black text-gold backdrop-blur">{item.brand}</span>
        </div>
        <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-black text-white ${item.available ? "bg-green-600" : "bg-slate-500"}`}>
            {item.available ? "متاحة" : "غير متاحة"}
          </span>
          {item.verified && (
            <span className="flex items-center gap-1 rounded-full bg-gold/90 px-2.5 py-1 text-xs font-black text-navy">
              <CheckCircle2 className="h-3.5 w-3.5" />معتمد
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-black leading-tight text-navy">{item.name}</h3>
        <p className="mt-0.5 text-xs text-steel">{item.supplier} · {item.city}</p>
        <div className="mt-3 grid grid-cols-3 divide-x divide-x-reverse divide-slate-200 rounded-lg border border-slate-200 bg-mist/60 py-2.5">
          <div className="px-2 text-center"><p className="text-[10px] font-bold text-steel">الشفرة</p><p className="mt-0.5 text-xs font-black text-navy">{item.bladeWidth} م</p></div>
          <div className="px-2 text-center"><p className="text-[10px] font-bold text-steel">القوة</p><p className="mt-0.5 text-xs font-black text-navy">{item.horsepower} HP</p></div>
          <div className="px-2 text-center"><p className="text-[10px] font-bold text-steel">الوزن</p><p className="mt-0.5 text-xs font-black text-navy">{item.operatingWeight}</p></div>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {item.hasOperator     && <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">مع مشغل</span>}
          {item.gpsReady        && <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">GPS جاهز</span>}
          {item.ripperAvailable && <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">ريبر متوفر</span>}
          {item.articulatedFrame && <span className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-0.5 text-[10px] font-bold text-purple-700">هيكل مفصلي</span>}
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
          <div><p className="text-[10px] font-semibold text-steel">يومي</p><p className="text-sm font-black text-navy">{formatSar(item.dailyPrice)}</p></div>
          <div className="h-8 w-px bg-slate-200" />
          <div><p className="text-[10px] font-semibold text-steel">شهري</p><p className="text-sm font-black text-navy">{formatSar(item.monthlyPrice)}</p></div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link href="/request-equipment" className="flex items-center justify-center rounded-md bg-gold py-2.5 text-xs font-black text-navy transition hover:bg-[#d6aa4d]">طلب عرض سعر</Link>
          <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 rounded-md bg-[#25D366]/10 py-2.5 text-xs font-black text-[#128C7E] transition hover:bg-[#25D366]/20">
            <MessageSquare className="h-3.5 w-3.5" />واتساب
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ChevronDown, SlidersHorizontal } from "lucide-react";
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
  "cranes": ["كرينات"],
  "excavators": ["حفارات"],
  "wheel-loaders": ["شيولات"],
  "trucks": ["قلابات", "سطحات"],
  "dump-trucks": ["قلابات"],
  "lowbeds": ["سطحات"],
  "skid-steers": ["بوبكات"],
  "forklifts": ["فوركلفت"],
  "compressors-generators": ["مولدات", "كمبروسرات"],
  "generators": ["مولدات"],
  "boom-lifts-manlifts": ["مان لفت", "رافعات بوم"],
  "manlifts": ["مان لفت"],
  "grader": ["جريدرات"],
  "road-equipment": ["جريدرات"]
};

// ─── Grader mock items ────────────────────────────────────────────────────────
const graderItems: EquipmentItem[] = [
  { id: "EQG001", name: "جريدر CAT 140 M3", category: "جريدرات", brand: "CAT", supplier: "معدات الطرق المتقدمة", city: "الرياض", available: true, dailyPrice: 2800, monthlyPrice: 68000, image: "/images/new-categories/grader.jpg", verified: true, bladeWidth: "3.70", horsepower: 155, operatingWeight: "14.7 طن", hasOperator: true, gpsReady: true, ripperAvailable: false, articulatedFrame: false },
  { id: "EQG002", name: "جريدر Komatsu GD555A", category: "جريدرات", brand: "Komatsu", supplier: "شركة الطرق والمشاريع", city: "جدة", available: true, dailyPrice: 3100, monthlyPrice: 75000, image: "/images/services/graders.jpg", verified: true, bladeWidth: "3.96", horsepower: 175, operatingWeight: "18.2 طن", hasOperator: true, gpsReady: true, ripperAvailable: true, articulatedFrame: false },
  { id: "EQG003", name: "جريدر Volvo G940", category: "جريدرات", brand: "Volvo", supplier: "مؤسسة الطرق الحديثة", city: "الدمام", available: false, dailyPrice: 2950, monthlyPrice: 71000, image: "/images/new-categories/grader.jpg", verified: true, bladeWidth: "3.66", horsepower: 167, operatingWeight: "15.7 طن", hasOperator: false, gpsReady: false, ripperAvailable: true, articulatedFrame: true },
  { id: "EQG004", name: "جريدر CAT 120 M3", category: "جريدرات", brand: "CAT", supplier: "معدات الطرق المتقدمة", city: "مكة المكرمة", available: true, dailyPrice: 2200, monthlyPrice: 53000, image: "/images/new-categories/grader.jpg", verified: false, bladeWidth: "3.66", horsepower: 125, operatingWeight: "12.9 طن", hasOperator: true, gpsReady: false, ripperAvailable: false, articulatedFrame: false },
  { id: "EQG005", name: "جريدر SDLG GR215", category: "جريدرات", brand: "SDLG", supplier: "التجهيزات الثقيلة السعودية", city: "الرياض", available: true, dailyPrice: 1700, monthlyPrice: 41000, image: "/images/services/graders.jpg", verified: true, bladeWidth: "3.70", horsepower: 138, operatingWeight: "13.9 طن", hasOperator: false, gpsReady: false, ripperAvailable: false, articulatedFrame: false },
  { id: "EQG006", name: "جريدر John Deere 672G", category: "جريدرات", brand: "John Deere", supplier: "معدات البناء الحديثة", city: "الخبر", available: true, dailyPrice: 2600, monthlyPrice: 63000, image: "/images/new-categories/grader.jpg", verified: true, bladeWidth: "3.96", horsepower: 158, operatingWeight: "15.3 طن", hasOperator: true, gpsReady: true, ripperAvailable: true, articulatedFrame: false }
];

// ─── General mock items ───────────────────────────────────────────────────────
const mockEquipment: EquipmentItem[] = [
  { id: "EQ001", name: "كرين 50 طن - Liebherr LTM 1050", category: "كرينات", supplier: "شركة الرياض للمعدات", city: "الرياض", available: true, dailyPrice: 3500, monthlyPrice: 85000, image: "/images/categories/cranes.jpg", verified: true },
  { id: "EQ002", name: "بوكلين CAT 320 - حفر وتحميل", category: "حفارات", supplier: "مؤسسة الشرق الأوسط", city: "جدة", available: true, dailyPrice: 2200, monthlyPrice: 52000, image: "/images/categories/excavators.jpg", verified: true },
  { id: "EQ003", name: "شيول Volvo L150H - تحميل ونقل", category: "شيولات", supplier: "شركة الخليج للمعدات الثقيلة", city: "الدمام", available: true, dailyPrice: 1900, monthlyPrice: 45000, image: "/images/categories/wheel-loaders.jpg", verified: true },
  { id: "EQ004", name: "قلاب 25 طن - Mercedes Actros", category: "قلابات", supplier: "مؤسسة النقل الحديث", city: "الرياض", available: false, dailyPrice: 1400, monthlyPrice: 33000, image: "/images/services/dump-trucks.jpg", verified: true },
  { id: "EQ005", name: "بوبكات Bobcat S650 - بكفرات", category: "بوبكات", supplier: "شركة الجزيرة للمعدات", city: "مكة المكرمة", available: true, dailyPrice: 950, monthlyPrice: 22000, image: "/images/categories/bobcats.jpg", verified: false },
  { id: "EQ006", name: "فوركلفت Toyota 7FG35 - 3.5 طن", category: "فوركلفت", supplier: "مستودعات السعودية", city: "جدة", available: true, dailyPrice: 850, monthlyPrice: 19000, image: "/images/categories/forklifts.jpg", verified: true },
  { id: "EQ007", name: "مولد CAT 500 KVA ديزل", category: "مولدات", supplier: "شركة القدرة للطاقة", city: "الرياض", available: true, dailyPrice: 1200, monthlyPrice: 28000, image: "/images/categories/generators.jpg", verified: true },
  { id: "EQ008", name: "مان لفت JLG 400S - 40 قدم", category: "مان لفت", supplier: "الرافعات السعودية", city: "الدمام", available: true, dailyPrice: 780, monthlyPrice: 18000, image: "/images/categories/manlifts.jpg", verified: true },
  { id: "EQ009", name: "كمبروسر Atlas Copco 185 cfm", category: "كمبروسرات", supplier: "معدات الهواء المضغوط", city: "الرياض", available: true, dailyPrice: 650, monthlyPrice: 15000, image: "/images/categories/compressors.jpg", verified: false },
  { id: "EQ010", name: "رصاصة تمهيد - Bomag BW 213", category: "رصاصات", supplier: "شركة الطرق والبناء", city: "جدة", available: true, dailyPrice: 1100, monthlyPrice: 26000, image: "/images/services/compaction.jpg", verified: true },
  { id: "EQ011", name: "سطحة 40 طن - Man TGA", category: "سطحات", supplier: "خدمات النقل الثقيل", city: "الدمام", available: false, dailyPrice: 2800, monthlyPrice: 65000, image: "/images/categories/lowbeds.jpg", verified: true },
  { id: "EQ012", name: "كرين برجي Liebherr 280 EC-H", category: "كرينات", supplier: "شركة البناء المتقدم", city: "الرياض", available: true, dailyPrice: 5500, monthlyPrice: 130000, image: "/images/categories/cranes.jpg", verified: true }
];

const ALL_CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الجبيل", "تبوك"];
const ALL_CATEGORIES = ["الكل", "كرينات", "حفارات", "شيولات", "قلابات", "بوبكات", "فوركلفت", "مولدات", "مان لفت", "كمبروسرات", "سطحات"];

const GRADER_BRANDS   = ["الكل", "CAT", "Komatsu", "Volvo", "John Deere", "CASE", "SDLG", "XCMG"];
const GRADER_HP       = ["الكل", "حتى 120 HP", "120–160 HP", "160–200 HP", "200–250 HP", "أكثر من 250 HP"];
const GRADER_BLADE    = ["الكل", "أقل من 3.5م", "3.5–3.7م", "3.7–4.0م", "أكثر من 4.0م"];
const GRADER_DURATION = ["يومي", "أسبوعي", "شهري", "ربع سنوي"];

function formatSar(n: number) { return n.toLocaleString("ar-SA") + " ر.س"; }

function hpInRange(hp: number, range: string): boolean {
  if (range === "الكل") return true;
  if (range === "حتى 120 HP") return hp <= 120;
  if (range === "120–160 HP") return hp > 120 && hp <= 160;
  if (range === "160–200 HP") return hp > 160 && hp <= 200;
  if (range === "200–250 HP") return hp > 200 && hp <= 250;
  if (range === "أكثر من 250 HP") return hp > 250;
  return true;
}
function bladeInRange(bw: number, range: string): boolean {
  if (range === "الكل") return true;
  if (range === "أقل من 3.5م") return bw < 3.5;
  if (range === "3.5–3.7م") return bw >= 3.5 && bw <= 3.7;
  if (range === "3.7–4.0م") return bw > 3.7 && bw <= 4.0;
  if (range === "أكثر من 4.0م") return bw > 4.0;
  return true;
}

// ─── Schema-driven filter field ───────────────────────────────────────────────
function SchemaFieldControl({
  field, value, onChange, cities
}: {
  field: EquipmentFilterField;
  value: string;
  onChange: (v: string) => void;
  cities: string[];
}) {
  const cls = "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

  if (field.type === "city") {
    return (
      <div>
        <label className="mb-2 block text-xs font-black text-steel">{field.label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className={cls}>
          <option value="">كل المدن</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
    );
  }
  if (field.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm font-bold text-navy">
        <input
          type="checkbox"
          checked={value === "true"}
          onChange={e => onChange(e.target.checked ? "true" : "")}
          className="h-4 w-4 rounded border-slate-300 accent-gold"
        />
        {field.label}
      </label>
    );
  }
  if (field.type === "select" && field.options) {
    return (
      <div>
        <label className="mb-2 block text-xs font-black text-steel">{field.label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className={cls}>
          <option value="">الكل</option>
          {field.options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    );
  }
  return (
    <div>
      <label className="mb-2 block text-xs font-black text-steel">{field.label}</label>
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
  const isGrader    = categorySlug === "grader" || categorySlug === "road-equipment";
  const hasCategory = !!categorySlug;
  const schema      = getEquipmentFilterSchema(categorySlug);
  const targetCats  = categorySlug ? (SLUG_TO_CATEGORIES[categorySlug] ?? []) : [];

  // ── General state ────────────────────────────────────────────────────────
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedCity,     setSelectedCity]     = useState("");
  const [availableOnly,    setAvailableOnly]    = useState(false);
  const [verifiedOnly,     setVerifiedOnly]     = useState(false);
  const [sortBy,           setSortBy]           = useState("newest");
  const [showFilters,      setShowFilters]      = useState(false);
  const [currentPage,      setCurrentPage]      = useState(1);

  // ── Schema-driven filter values (for non-grader schema categories) ───────
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const setFieldValue = (key: string, val: string) => {
    setFilterValues(prev => ({ ...prev, [key]: val }));
    setCurrentPage(1);
  };

  // ── Grader-specific state ────────────────────────────────────────────────
  const [graderBrand,    setGraderBrand]    = useState("الكل");
  const [graderHp,       setGraderHp]       = useState("الكل");
  const [graderBlade,    setGraderBlade]    = useState("الكل");
  const [graderDuration, setGraderDuration] = useState("يومي");
  const [graderOperator, setGraderOperator] = useState(false);
  const [graderGps,      setGraderGps]      = useState(false);
  const [graderRipper,   setGraderRipper]   = useState(false);

  // ── Build result list ────────────────────────────────────────────────────
  let filtered: EquipmentItem[] = isGrader
    ? [...graderItems]
    : targetCats.length > 0
      ? mockEquipment.filter(e => targetCats.includes(e.category))
      : [...mockEquipment];

  // Generic category filter (only when showing all)
  if (!hasCategory && selectedCategory !== "الكل")
    filtered = filtered.filter(e => e.category === selectedCategory);

  // City filter – uses schema field value for schema pages, else selectedCity
  const cityValue = hasCategory && schema ? (filterValues["city"] ?? "") : selectedCity;
  if (cityValue) filtered = filtered.filter(e => e.city === cityValue);

  if (availableOnly) filtered = filtered.filter(e => e.available);
  if (verifiedOnly)  filtered = filtered.filter(e => e.verified);

  // Grader-specific filters
  if (isGrader) {
    if (graderBrand !== "الكل")
      filtered = filtered.filter(e => e.brand === graderBrand);
    if (graderHp !== "الكل")
      filtered = filtered.filter(e => hpInRange(e.horsepower ?? 0, graderHp));
    if (graderBlade !== "الكل")
      filtered = filtered.filter(e => bladeInRange(parseFloat(e.bladeWidth ?? "0"), graderBlade));
    if (graderOperator) filtered = filtered.filter(e => e.hasOperator === true);
    if (graderGps)      filtered = filtered.filter(e => e.gpsReady === true);
    if (graderRipper)   filtered = filtered.filter(e => e.ripperAvailable === true);
  }

  if (sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.dailyPrice - b.dailyPrice);

  const perPage    = 6;
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated  = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // ── Reset helpers ────────────────────────────────────────────────────────
  const resetGeneric = () => {
    setSelectedCategory("الكل"); setSelectedCity("");
    setAvailableOnly(false); setVerifiedOnly(false); setCurrentPage(1);
  };
  const resetSchema = () => {
    setFilterValues({}); setAvailableOnly(false); setVerifiedOnly(false); setCurrentPage(1);
  };
  const resetGrader = () => {
    setGraderBrand("الكل"); setGraderHp("الكل"); setGraderBlade("الكل");
    setGraderOperator(false); setGraderGps(false); setGraderRipper(false);
    setFilterValues({}); setAvailableOnly(false); setVerifiedOnly(false); setCurrentPage(1);
  };

  // ── Separate boolean fields from other fields for layout ─────────────────
  const schemaFields       = schema?.fields.filter(f => f.key !== "availableNow" && f.key !== "transportAvailable") ?? [];
  const schemaBoolFields   = schemaFields.filter(f => f.type === "boolean");
  const schemaInputFields  = schemaFields.filter(f => f.type !== "boolean");

  // ── Page title ───────────────────────────────────────────────────────────
  const pageTitle = schema
    ? `${schema.title} متاحة للتأجير (${filtered.length})`
    : hasCategory
      ? `معدات متاحة (${filtered.length})`
      : `جميع المعدات (${filtered.length})`;
  const pageEyebrow = schema ? schema.title : "سوق المعدات";

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gold">{pageEyebrow}</p>
            <h2 className="text-2xl font-black text-navy">{pageTitle}</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowFilters(v => !v)}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy shadow-sm transition hover:border-gold"
            >
              <SlidersHorizontal className="h-4 w-4" />
              الفلاتر
              <ChevronDown className={`h-4 w-4 transition ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy shadow-sm"
            >
              <option value="newest">الأحدث</option>
              <option value="popular">الأكثر طلباً</option>
              <option value="price_asc">الأقل سعراً</option>
            </select>
          </div>
        </div>

        {/* ── Grader filter panel ──────────────────────────────────────────── */}
        {isGrader && showFilters && (
          <div className="mb-6 rounded-xl border border-gold/30 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-black uppercase tracking-wide text-gold">فلاتر الجريدر</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs font-black text-steel">المدينة / الموقع</label>
                <select value={filterValues["city"] ?? ""} onChange={e => setFieldValue("city", e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                  <option value="">كل المدن</option>
                  {ALL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black text-steel">الماركة</label>
                <select value={graderBrand} onChange={e => { setGraderBrand(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                  {GRADER_BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black text-steel">القدرة الحصانية</label>
                <select value={graderHp} onChange={e => { setGraderHp(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                  {GRADER_HP.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black text-steel">عرض الشفرة</label>
                <select value={graderBlade} onChange={e => { setGraderBlade(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                  {GRADER_BLADE.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black text-steel">مدة الإيجار</label>
                <select value={graderDuration} onChange={e => setGraderDuration(e.target.value)} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none">
                  {GRADER_DURATION.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 sm:col-span-2">
                {[
                  { label: "مع مشغل",     val: graderOperator, set: (v: boolean) => { setGraderOperator(v); setCurrentPage(1); } },
                  { label: "GPS جاهز",     val: graderGps,      set: (v: boolean) => { setGraderGps(v);      setCurrentPage(1); } },
                  { label: "ريبر متوفر",  val: graderRipper,   set: (v: boolean) => { setGraderRipper(v);   setCurrentPage(1); } },
                  { label: "متاحة فقط",   val: availableOnly,  set: (v: boolean) => { setAvailableOnly(v);  setCurrentPage(1); } },
                  { label: "موردون معتمدون", val: verifiedOnly, set: (v: boolean) => { setVerifiedOnly(v);   setCurrentPage(1); } }
                ].map(({ label, val, set }) => (
                  <label key={label} className="flex items-center gap-2 text-sm font-bold text-navy">
                    <input type="checkbox" checked={val} onChange={e => set(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    {label}
                  </label>
                ))}
              </div>
              <div className="flex items-end">
                <button onClick={resetGrader} className="rounded-md border border-slate-200 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">إعادة تعيين</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Schema-driven filter panel (non-grader categories) ───────────── */}
        {!isGrader && hasCategory && schema && showFilters && (
          <div className="mb-6 rounded-xl border border-gold/30 bg-white p-5 shadow-sm">
            <p className="mb-4 text-xs font-black uppercase tracking-wide text-gold">فلاتر {schema.title}</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Non-boolean schema fields */}
              {schemaInputFields.map(field => (
                <SchemaFieldControl
                  key={field.key}
                  field={field}
                  value={filterValues[field.key] ?? ""}
                  onChange={v => setFieldValue(field.key, v)}
                  cities={ALL_CITIES}
                />
              ))}
              {/* Boolean schema fields + global toggles */}
              {schemaBoolFields.length > 0 && (
                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 sm:col-span-2">
                  {schemaBoolFields.map(field => (
                    <SchemaFieldControl
                      key={field.key}
                      field={field}
                      value={filterValues[field.key] ?? ""}
                      onChange={v => setFieldValue(field.key, v)}
                      cities={ALL_CITIES}
                    />
                  ))}
                  <label className="flex items-center gap-2 text-sm font-bold text-navy">
                    <input type="checkbox" checked={availableOnly} onChange={e => { setAvailableOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    متاحة فقط
                  </label>
                  <label className="flex items-center gap-2 text-sm font-bold text-navy">
                    <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                    موردون معتمدون
                  </label>
                </div>
              )}
              <div className="flex items-end">
                <button onClick={resetSchema} className="rounded-md border border-slate-200 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">إعادة تعيين</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Generic filter panel (no specific category) ──────────────────── */}
        {!hasCategory && showFilters && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs font-black text-steel">الفئة</label>
                <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy">
                  {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black text-steel">المدينة</label>
                <select value={selectedCity} onChange={e => { setSelectedCity(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy">
                  <option value="">كل المدن</option>
                  {ALL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-3 pt-1">
                <label className="flex items-center gap-2 text-sm font-bold text-navy">
                  <input type="checkbox" checked={availableOnly} onChange={e => { setAvailableOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                  متاحة فقط
                </label>
                <label className="flex items-center gap-2 text-sm font-bold text-navy">
                  <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />
                  موردون معتمدون فقط
                </label>
              </div>
              <div className="flex items-end">
                <button onClick={resetGeneric} className="rounded-md border border-slate-200 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">إعادة تعيين</button>
              </div>
            </div>
          </div>
        )}

        {/* ── Results ─────────────────────────────────────────────────────── */}
        {paginated.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
            <p className="text-steel">لا توجد معدات تطابق الفلاتر المحددة</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map(item =>
              isGrader
                ? <GraderCard key={item.id} item={item} />
                : <EquipmentCard key={item.id} item={item} />
            )}
          </div>
        )}

        {/* ── Pagination ───────────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold disabled:opacity-40">السابق</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setCurrentPage(p)} className={`rounded-md border px-4 py-2 text-sm font-bold transition ${currentPage === p ? "border-gold bg-gold text-navy" : "border-slate-200 text-navy hover:border-gold"}`}>{p}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold disabled:opacity-40">التالي</button>
          </div>
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
        <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
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
        <p className="mt-1 text-xs text-steel">{item.supplier} - {item.city}</p>
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

// ─── Grader-specific card ─────────────────────────────────────────────────────
function GraderCard({ item }: { item: EquipmentItem }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md">
      <div className="relative h-52 bg-slate-200">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
        <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 hover:scale-105" />
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
          {item.hasOperator    && <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">مع مشغل</span>}
          {item.gpsReady       && <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">GPS جاهز</span>}
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

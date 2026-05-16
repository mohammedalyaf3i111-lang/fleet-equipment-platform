"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  PackageCheck, Truck, Search, SendHorizontal, MessageSquare,
  CheckCircle2, XCircle, Clock, MapPin, ChevronLeft
} from "lucide-react";
import type { ServiceCategory } from "@/lib/service-categories";
import {
  backfillingMaterialsSchema,
  backfillingMaterialSuppliers,
  type BackfillingMaterialSupplier
} from "@/constants/serviceFilterSchemas";

// ─── Sub-category cards ───────────────────────────────────────────────────────
const subCategories = [
  { label: "شيولات",          description: "تحميل وتسوية ونقل مواد الردم داخل الموقع.", image: "/images/services/loaders.jpg" },
  { label: "قلابات",          description: "نقل دفان ورمل وبحص بنقلات داخل وخارج المدينة.", image: "/images/services/dump-trucks.jpg" },
  { label: "حفارات",          description: "تجهيز وردم وحفر مساعد لمواقع البنية التحتية.", image: "/images/services/excavators.jpg" },
  { label: "بوبكات",          description: "تشغيل المواقع الضيقة والتنظيف والتسوية الخفيفة.", image: "/images/services/skid-steers.jpg" },
  { label: "مداحل / رصاصات", description: "دك التربة والطبقات للوصول إلى كثافة تشغيلية.", image: "/images/services/rollers.jpg" },
  { label: "جريدر",           description: "تسوية مسارات ومناسيب الردم بدقة تشغيلية.", image: "/images/services/graders.jpg" },
  { label: "رمل وبحص",       description: "توريد مواد إنشائية وفرش طبقات حسب المواصفات.", image: "/images/services/sand-gravel.jpg" },
  { label: "سبيس وردميات",   description: "مواد ردم ودفان للمشاريع والمخططات والمواقع.", image: "/images/services/backfilling.jpg" },
  { label: "تنكر ماء",       description: "رش وترطيب الموقع وتجهيز طبقات الدك.", image: "/images/services/water-tanker.jpg" },
  { label: "دك وتسوية",      description: "خدمة متكاملة للدك والتسوية وتجهيز السطح.", image: "/images/services/compaction.jpg" },
  { label: "نقل مخلفات",     description: "إزالة مخلفات الردم والإنشاء ونقلها من الموقع.", image: "/images/services/waste-hauling.jpg" },
  { label: "عمالة ومشغلين",  description: "مشغلون وعمالة ميدانية لأعمال الردم والتسوية.", image: "/images/services/operators.jpg" }
];

const ALL_CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الجبيل", "تبوك"];

// ─── Input helpers ────────────────────────────────────────────────────────────
const inputCls = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-navy focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20";

function SelF({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black text-steel">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className={inputCls}>
        <option value="">اختر</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function NumF({ label, placeholder, unit, value, onChange }: { label: string; placeholder?: string; unit?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black text-steel">{label}{unit && <span className="mr-1 font-normal text-slate-400">({unit})</span>}</label>
      <input type="number" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}

function TxtF({ label, placeholder, value, onChange }: { label: string; placeholder?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-black text-steel">{label}</label>
      <input type="text" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} className={inputCls} />
    </div>
  );
}

function BoolF({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-bold text-navy transition hover:border-gold/50">
      <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} className="h-4 w-4 rounded border-slate-300 accent-gold" />
      {label}
    </label>
  );
}

// ─── Supplier result card ─────────────────────────────────────────────────────
function SupplierCard({ s }: { s: BackfillingMaterialSupplier }) {
  const officialWhatsApp = "https://wa.me/966500000000";
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md">
      {/* Header strip */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-xs font-bold text-gold">{s.materialType}</p>
          <h3 className="font-black text-navy">{s.supplierName}</h3>
        </div>
        <span className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-black ${s.availableNow ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
          {s.availableNow ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
          {s.availableNow ? "متوفر الآن" : "حسب الجدولة"}
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <div>
            <p className="text-[10px] font-bold text-steel">المدينة</p>
            <p className="font-bold text-navy">{s.city}</p>
          </div>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <div>
            <p className="text-[10px] font-bold text-steel">طريقة التسعير</p>
            <p className="font-bold text-navy">{s.pricingMethod}</p>
          </div>
        </div>
        <div className="col-span-2 rounded-lg border border-gold/30 bg-gold/5 px-3 py-2.5 text-center">
          <p className="text-[10px] font-bold text-steel">السعر</p>
          <p className="text-base font-black text-navy">{s.priceDisplay}</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 shrink-0 text-gold" />
          <div>
            <p className="text-[10px] font-bold text-steel">النقل</p>
            <p className={`font-bold ${s.transportIncluded ? "text-green-700" : "text-red-600"}`}>
              {s.transportIncluded ? "مشمول" : "غير مشمول"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Truck className="h-4 w-4 shrink-0 text-gold" />
          <div>
            <p className="text-[10px] font-bold text-steel">قلابات</p>
            <p className={`font-bold ${s.trucksAvailable ? "text-green-700" : "text-slate-500"}`}>
              {s.trucksAvailable ? "متوفرة" : "غير متوفرة"}
            </p>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 px-4 pb-2">
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${s.includesSpreading ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-slate-50 text-slate-400"}`}>
          {s.includesSpreading ? <CheckCircle2 className="ml-1 inline h-3 w-3" /> : <XCircle className="ml-1 inline h-3 w-3" />}
          فرد وتسوية
        </span>
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${s.includesCompaction ? "border-amber-200 bg-amber-50 text-amber-700" : "border-slate-200 bg-slate-50 text-slate-400"}`}>
          {s.includesCompaction ? <CheckCircle2 className="ml-1 inline h-3 w-3" /> : <XCircle className="ml-1 inline h-3 w-3" />}
          دك
        </span>
        <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
          <Clock className="h-3 w-3" />{s.deliveryTime}
        </span>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 border-t border-slate-100 p-4">
        <Link href="/request-equipment" className="flex items-center justify-center rounded-lg bg-gold py-2.5 text-xs font-black text-navy transition hover:bg-[#d6aa4d]">
          طلب عرض
        </Link>
        <a
          href={officialWhatsApp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366]/10 py-2.5 text-xs font-black text-[#128C7E] transition hover:bg-[#25D366]/20"
        >
          <MessageSquare className="h-3.5 w-3.5" />واتساب
        </a>
      </div>
    </div>
  );
}

// ─── Backfilling Materials Filter Panel ──────────────────────────────────────
function BackfillingMaterialsPanel({ onClose }: { onClose: () => void }) {
  // Filter state
  const [city,               setCity]               = useState("");
  const [materialType,       setMaterialType]       = useState("");
  const [pricingMethod,      setPricingMethod]      = useState("");
  const [quantityTrips,      setQuantityTrips]      = useState("");
  const [quantityMeters,     setQuantityMeters]     = useState("");
  const [quantityTons,       setQuantityTons]       = useState("");
  const [truckType,          setTruckType]          = useState("");
  const [loadingLocation,    setLoadingLocation]    = useState("");
  const [unloadingAddress,   setUnloadingAddress]   = useState("");
  const [tripScope,          setTripScope]          = useState("");
  const [transportIncluded,  setTransportIncluded]  = useState(false);
  const [spreadingIncluded,  setSpreadingIncluded]  = useState(false);
  const [compactionIncluded, setCompactionIncluded] = useState(false);
  const [deliveryTiming,     setDeliveryTiming]     = useState("");
  const [deliveryDate,       setDeliveryDate]       = useState("");
  const [availability,       setAvailability]       = useState("");
  const [priceFrom,          setPriceFrom]          = useState("");
  const [priceTo,            setPriceTo]            = useState("");

  // Results state
  const [hasSearched, setHasSearched] = useState(false);
  const [results,     setResults]     = useState<BackfillingMaterialSupplier[]>([]);

  function handleSearch() {
    let filtered = [...backfillingMaterialSuppliers];

    if (city)         filtered = filtered.filter(s => s.city === city);
    if (materialType) filtered = filtered.filter(s => s.materialType === materialType);
    if (pricingMethod)filtered = filtered.filter(s => s.pricingMethod === pricingMethod);
    if (transportIncluded)  filtered = filtered.filter(s => s.transportIncluded);
    if (spreadingIncluded)  filtered = filtered.filter(s => s.includesSpreading);
    if (compactionIncluded) filtered = filtered.filter(s => s.includesCompaction);
    if (availability === "متوفر الآن") filtered = filtered.filter(s => s.availableNow);

    setResults(filtered);
    setHasSearched(true);
    // scroll to results
    setTimeout(() => {
      document.getElementById("bm-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleReset() {
    setCity(""); setMaterialType(""); setPricingMethod("");
    setQuantityTrips(""); setQuantityMeters(""); setQuantityTons("");
    setTruckType(""); setLoadingLocation(""); setUnloadingAddress("");
    setTripScope(""); setTransportIncluded(false); setSpreadingIncluded(false);
    setCompactionIncluded(false); setDeliveryTiming(""); setDeliveryDate("");
    setAvailability(""); setPriceFrom(""); setPriceTo("");
    setHasSearched(false); setResults([]);
  }

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-gold/40 bg-white shadow-lg">
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-gold/20 bg-navy px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-gold">{backfillingMaterialsSchema.title}</p>
          <p className="mt-0.5 text-sm text-white/70">{backfillingMaterialsSchema.description}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg border border-white/20 px-3 py-2 text-xs font-bold text-white/70 transition hover:border-white/50 hover:text-white"
        >
          إغلاق
        </button>
      </div>

      <div className="p-5">
        {/* ─── Filter grid ─────────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* 1. المدينة */}
          <div>
            <label className="mb-1.5 block text-xs font-black text-steel">المدينة</label>
            <select value={city} onChange={e => setCity(e.target.value)} className={inputCls}>
              <option value="">كل المدن</option>
              {ALL_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* 2. نوع المادة */}
          <SelF
            label="نوع المادة"
            options={["رمل", "بحص", "سبيس", "دفان", "تربة زراعية", "مواد تسوية"]}
            value={materialType}
            onChange={setMaterialType}
          />

          {/* 3. طريقة التسعير */}
          <SelF
            label="طريقة التسعير"
            options={["بالنقلة", "بالمتر", "بالطن", "بالمشروع"]}
            value={pricingMethod}
            onChange={setPricingMethod}
          />

          {/* 4. الكمية — conditional */}
          {pricingMethod === "بالنقلة" && (
            <NumF label="عدد النقلات" placeholder="مثال: 10" value={quantityTrips} onChange={setQuantityTrips} />
          )}
          {pricingMethod === "بالمتر" && (
            <NumF label="عدد الأمتار المكعبة" placeholder="مثال: 500" unit="م³" value={quantityMeters} onChange={setQuantityMeters} />
          )}
          {pricingMethod === "بالطن" && (
            <NumF label="عدد الأطنان" placeholder="مثال: 200" unit="طن" value={quantityTons} onChange={setQuantityTons} />
          )}

          {/* 5. نوع القلاب */}
          <SelF
            label="نوع القلاب المطلوب"
            options={["قلاب 6 متر", "قلاب 12 متر", "قلاب 18 متر", "قلاب 24 متر", "قلاب 32 متر", "تريلا"]}
            value={truckType}
            onChange={setTruckType}
          />

          {/* 6. موقع التحميل */}
          <SelF
            label="موقع التحميل"
            options={["من المورد", "من كسارة", "من موقع آخر"]}
            value={loadingLocation}
            onChange={setLoadingLocation}
          />

          {/* 7. موقع التفريغ */}
          <TxtF
            label="موقع التفريغ"
            placeholder="عنوان التفريغ أو اسم الحي"
            value={unloadingAddress}
            onChange={setUnloadingAddress}
          />

          {/* 8. داخل / خارج */}
          <SelF
            label="داخل / خارج المدينة"
            options={["داخل المدينة", "خارج المدينة"]}
            value={tripScope}
            onChange={setTripScope}
          />

          {/* 12. موعد التوريد */}
          <SelF
            label="موعد التوريد"
            options={["اليوم", "غدًا", "تاريخ مخصص"]}
            value={deliveryTiming}
            onChange={setDeliveryTiming}
          />

          {/* 12b. التاريخ المخصص */}
          {deliveryTiming === "تاريخ مخصص" && (
            <div>
              <label className="mb-1.5 block text-xs font-black text-steel">التاريخ</label>
              <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} className={inputCls} />
            </div>
          )}

          {/* 13. توفر الخدمة */}
          <SelF
            label="توفر الخدمة"
            options={["متوفر الآن", "خلال 24 ساعة", "حسب الجدولة"]}
            value={availability}
            onChange={setAvailability}
          />

          {/* 14. نطاق السعر */}
          <NumF label="السعر من" placeholder="ر.س" unit="ر.س" value={priceFrom} onChange={setPriceFrom} />
          <NumF label="السعر إلى"  placeholder="ر.س" unit="ر.س" value={priceTo}   onChange={setPriceTo} />
        </div>

        {/* ─── Boolean toggles ─────────────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap gap-3">
          <BoolF label="يشمل النقل"          value={transportIncluded}  onChange={setTransportIncluded} />
          <BoolF label="يشمل الفرد والتسوية" value={spreadingIncluded}  onChange={setSpreadingIncluded} />
          <BoolF label="يشمل الدك"           value={compactionIncluded} onChange={setCompactionIncluded} />
        </div>

        {/* ─── Search + Reset ───────────────────────────────────────────────── */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-7 py-3 text-sm font-black text-navy shadow-md shadow-gold/25 transition hover:bg-[#d6aa4d] hover:shadow-lg"
          >
            <Search className="h-4 w-4" />
            بحث عن الموردين المتاحين
          </button>
          <button
            onClick={handleReset}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-steel transition hover:border-gold hover:text-navy"
          >
            إعادة تعيين
          </button>
        </div>
      </div>

      {/* ─── Results area ─────────────────────────────────────────────────── */}
      <div id="bm-results" className="border-t border-slate-100">
        {!hasSearched ? null : results.length === 0 ? (
          /* Empty state */
          <div className="px-5 py-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search className="h-7 w-7 text-slate-400" />
            </div>
            <p className="text-lg font-black text-navy">لا توجد عروض مطابقة حاليًا</p>
            <p className="mt-2 max-w-md mx-auto text-sm leading-7 text-steel">
              يمكنك إرسال طلب خاص وسيقوم فريق فليت معدات بتوفير المورد المناسب لمتطلباتك.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/request-equipment"
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-black text-navy shadow-md shadow-gold/25 transition hover:bg-[#d6aa4d]"
              >
                <SendHorizontal className="h-4 w-4" />
                إرسال طلب خاص
              </Link>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-navy transition hover:border-gold"
              >
                <MessageSquare className="h-4 w-4" />
                تواصل واتساب
              </a>
            </div>
          </div>
        ) : (
          /* Supplier cards */
          <div className="p-5">
            <p className="mb-4 text-sm text-steel">
              تم العثور على <span className="font-black text-navy">{results.length}</span> مورد مطابق
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map(s => <SupplierCard key={s.id} s={s} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main BackfillingService component ───────────────────────────────────────
export function BackfillingService({ service }: { service: ServiceCategory }) {
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  function handleSubClick(label: string) {
    if (label === "سبيس وردميات") {
      setSelectedSub(prev => prev === "سبيس وردميات" ? null : "سبيس وردميات");
      setTimeout(() => {
        document.getElementById("bm-filter-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      // For other sub-categories: just highlight the selection (future expansion)
      setSelectedSub(prev => prev === label ? null : label);
    }
  }

  return (
    <div className="bg-[#f7f3ec]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <Image src={service.image} alt="خدمات الردم والتسوية" fill priority sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/95 via-[#1d2530]/84 to-[#6b4f2a]/42" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black text-gold">ردم · دك · تسوية · نقل مواد</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-black leading-tight md:text-6xl">خدمات الردم والتسوية ونقل المواد</h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-white/80">
              منصة متخصصة لتوفير معدات الردم والدك والقلابات والمواد الإنشائية للمشاريع والمواقع داخل المملكة.
            </p>
            <p className="mt-3 text-sm font-bold text-gold/80">
              اضغط على &quot;سبيس وردميات&quot; لعرض فلاتر توريد مواد الردم بالتفصيل
            </p>
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

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* ── Sub-category cards ─────────────────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subCategories.map((item) => {
              const isBackfilling = item.label === "سبيس وردميات";
              const isSelected    = selectedSub === item.label;
              return (
                <article
                  key={item.label}
                  onClick={() => handleSubClick(item.label)}
                  className={`group cursor-pointer overflow-hidden rounded-xl border shadow-sm transition hover:-translate-y-1 hover:shadow-xl
                    ${isSelected
                      ? "border-gold ring-2 ring-gold/40 hover:border-gold"
                      : "border-[#d9c7a3] bg-white hover:border-gold"
                    }`}
                >
                  <div className="relative h-40 overflow-hidden rounded-xl bg-navy">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="rounded-xl object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-t ${isSelected ? "from-gold/80 via-navy/20 to-transparent" : "from-navy/82 via-navy/20 to-transparent"}`} />
                    <h2 className="absolute bottom-4 right-4 text-lg font-black text-white">{item.label}</h2>
                    {/* "click here" indicator for سبيس وردميات */}
                    {isBackfilling && !isSelected && (
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-black text-navy">
                        <ChevronLeft className="h-3 w-3 -rotate-90" />
                        فلاتر مخصصة
                      </div>
                    )}
                    {isSelected && isBackfilling && (
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-1 text-[10px] font-black text-white">
                        <CheckCircle2 className="h-3 w-3" />
                        مفعّل
                      </div>
                    )}
                  </div>
                  <p className="px-4 py-3 text-sm leading-7 text-steel">{item.description}</p>
                </article>
              );
            })}
          </div>

          {/* ── سبيس وردميات filter panel ─────────────────────────────────── */}
          {selectedSub === "سبيس وردميات" && (
            <div id="bm-filter-panel">
              <BackfillingMaterialsPanel onClose={() => setSelectedSub(null)} />
            </div>
          )}

          {/* ── Quick filter strip (for other sub-categories) ──────────────── */}
          {selectedSub && selectedSub !== "سبيس وردميات" && (
            <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-gold">تصنيف مختار</p>
                  <p className="text-lg font-black text-navy">{selectedSub}</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/request-equipment" className="rounded-lg bg-gold px-5 py-2.5 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">
                    طلب عرض
                  </Link>
                  <button onClick={() => setSelectedSub(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

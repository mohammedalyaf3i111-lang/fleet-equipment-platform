"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PackageCheck, Truck } from "lucide-react";
import { CitySelectField } from "@/components/city-fields";
import type { ServiceCategory } from "@/lib/service-categories";

type BackfillingTab = "all" | "equipment" | "materials" | "transport" | "compaction";

type BackfillingOffer = {
  id: string;
  tab: Exclude<BackfillingTab, "all">;
  title: string;
  supplier: string;
  description: string;
  price: string;
  status: string;
  image: string;
};

type BackfillingCategory = {
  label: string;
  description: string;
  image: string;
};

const tabs: { id: BackfillingTab; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "equipment", label: "معدات" },
  { id: "materials", label: "مواد" },
  { id: "transport", label: "نقل" },
  { id: "compaction", label: "دك وتسوية" }
];

const subCategories: BackfillingCategory[] = [
  { label: "شيولات", description: "تحميل وتسوية ونقل مواد الردم داخل الموقع.", image: "/images/services/loaders.jpg" },
  { label: "قلابات", description: "نقل دفان ورمل وبحص بنقلات داخل وخارج المدينة.", image: "/images/services/dump-trucks.jpg" },
  { label: "حفارات", description: "تجهيز وردم وحفر مساعد لمواقع البنية التحتية.", image: "/images/services/excavators.jpg" },
  { label: "بوبكات", description: "تشغيل المواقع الضيقة والتنظيف والتسوية الخفيفة.", image: "/images/services/skid-steers.jpg" },
  { label: "مداحل / رصاصات", description: "دك التربة والطبقات للوصول إلى كثافة تشغيلية.", image: "/images/services/rollers.jpg" },
  { label: "جريدر", description: "تسوية مسارات ومناسيب الردم بدقة تشغيلية.", image: "/images/services/graders.jpg" },
  { label: "رمل وبحص", description: "توريد مواد إنشائية وفرش طبقات حسب المواصفات.", image: "/images/services/sand-gravel.jpg" },
  { label: "سبيس وردميات", description: "مواد ردم ودفان للمشاريع والمخططات والمواقع.", image: "/images/services/backfilling.jpg" },
  { label: "تنكر ماء", description: "رش وترطيب الموقع وتجهيز طبقات الدك.", image: "/images/services/water-tanker.jpg" },
  { label: "دك وتسوية", description: "خدمة متكاملة للدك والتسوية وتجهيز السطح.", image: "/images/services/compaction.jpg" },
  { label: "نقل مخلفات", description: "إزالة مخلفات الردم والإنشاء ونقلها من الموقع.", image: "/images/services/waste-hauling.jpg" },
  { label: "عمالة ومشغلين", description: "مشغلون وعمالة ميدانية لأعمال الردم والتسوية.", image: "/images/services/operators.jpg" }
];

const materialServices = ["رمل", "بحص", "سبيس", "دفان", "تربة زراعية", "مواد تسوية"];
const pricingMethods = ["بالنقلة", "بالمتر", "باليوم", "بالمشروع"];

const offers: BackfillingOffer[] = [
  {
    id: "BCK-01",
    tab: "transport",
    title: "قلابات دفان 18 متر",
    supplier: "مؤسسة ردم الرياض",
    description: "نقل رمل ودفان للمشاريع",
    price: "850 ر.س للنقلة",
    status: "متوفر الآن",
    image: "/images/services/dump-trucks.jpg"
  },
  {
    id: "BCK-02",
    tab: "equipment",
    title: "شيول CAT 966",
    supplier: "معدات التسوية الحديثة",
    description: "مع مشغل لأعمال الردم والتحميل",
    price: "2,500 ر.س / يوم",
    status: "متوفر الآن",
    image: "/images/services/loaders.jpg"
  },
  {
    id: "BCK-03",
    tab: "compaction",
    title: "رصاصة 12 طن",
    supplier: "جاهزة للدك وتسوية الطرق",
    description: "دك وردم وتسوية مواقع البنية التحتية",
    price: "1,100 ر.س / يوم",
    status: "متوفر الآن",
    image: "/images/services/rollers.jpg"
  },
  {
    id: "BCK-04",
    tab: "equipment",
    title: "بوبكات كفرات",
    supplier: "تشغيل مواقع ضيقة",
    description: "مناسب للتسوية داخل المواقع المحدودة",
    price: "900 ر.س / يوم",
    status: "حسب الجدولة",
    image: "/images/services/skid-steers.jpg"
  },
  {
    id: "BCK-05",
    tab: "materials",
    title: "توريد سبيس وردميات",
    supplier: "مواد الردم الشرقية",
    description: "سبيس وبحص ومواد تسوية حسب الكمية",
    price: "سعر بالمتر أو المشروع",
    status: "متوفر الآن",
    image: "/images/services/backfilling.jpg"
  },
  {
    id: "BCK-06",
    tab: "transport",
    title: "نقل مخلفات وردميات",
    supplier: "أسطول نقل المخلفات",
    description: "قلابات وحاويات لمخلفات الموقع",
    price: "حسب المشوار",
    status: "نقل متاح",
    image: "/images/services/waste-hauling.jpg"
  }
];

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="text-sm font-bold text-navy">
      {label}
      <select className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
        <option value="">اختر</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function NumberField({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="text-sm font-bold text-navy">
      {label}
      <input
        type="number"
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </label>
  );
}

function CheckField({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-md bg-white p-3 text-sm font-bold text-navy">
      <input type="checkbox" />
      {label}
    </label>
  );
}

export function BackfillingService({ service }: { service: ServiceCategory }) {
  const [activeTab, setActiveTab] = useState<BackfillingTab>("all");
  const [showProjectForm, setShowProjectForm] = useState(false);

  const visibleOffers = useMemo(() => {
    if (activeTab === "all") return offers;
    return offers.filter((offer) => offer.tab === activeTab);
  }, [activeTab]);

  return (
    <div className="bg-[#f7f3ec]">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subCategories.map((item) => (
              <article key={item.label} className="group overflow-hidden rounded-xl border border-[#d9c7a3] bg-white shadow-sm transition hover:-translate-y-1 hover:border-gold hover:shadow-xl">
                <div className="relative h-40 overflow-hidden rounded-xl bg-navy">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="rounded-xl object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-navy/82 via-navy/20 to-transparent" />
                  <h2 className="absolute bottom-4 right-4 text-lg font-black text-white">{item.label}</h2>
                </div>
                <p className="px-4 py-3 text-sm leading-7 text-steel">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-[#d9c7a3] bg-white p-5 shadow-soft">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-gold">فلاتر الردم</p>
                <h2 className="text-2xl font-black text-navy">حدد المواد والمعدات ونطاق النقل</h2>
              </div>
              <button
                type="button"
                onClick={() => setShowProjectForm((value) => !value)}
                className="rounded-md bg-gold px-5 py-3 text-sm font-black text-navy shadow-lg transition hover:-translate-y-0.5"
              >
                طلب ردم كامل للمشروع
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-4">
              <SelectField label="نوع الردم" options={["رمل", "سبيس", "بحص", "دفان", "مخلفات", "تربة"]} />
              <SelectField label="نوع المعدة" options={["شيول", "قلاب", "حفار", "بوبكات", "رصاصة", "جريدر", "تنكر ماء"]} />
              <SelectField label="حجم الشيول" options={["شيول صغير", "950", "966", "980"]} />
              <SelectField label="حجم القلاب" options={["6 متر", "12 متر", "18 متر"]} />
              <NumberField label="عدد القلابات" placeholder="مثال: 10" />
              <SelectField label="نوع الحركة" options={["جنزير", "كفرات"]} />
              <SelectField label="النطاق" options={["داخل المدينة", "خارج المدينة"]} />
              <NumberField label="سعر النقلة" placeholder="ريال" />
              <NumberField label="سعر اليوم" placeholder="ريال" />
              <NumberField label="سعر المشروع" placeholder="ريال" />
              <CheckField label="مع مشغل" />
              <CheckField label="متوفر الآن" />
              <CheckField label="نقل متاح" />
            </div>
          </div>

          {showProjectForm ? (
            <div className="mt-6 rounded-lg border border-gold/40 bg-white p-5 shadow-soft">
              <h2 className="text-xl font-black text-navy">طلب ردم كامل للمشروع</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <NumberField label="مساحة المشروع" placeholder="م²" />
                <SelectField label="نوع الردم" options={["رمل", "سبيس", "بحص", "دفان", "مخلفات", "تربة"]} />
                <NumberField label="الكمية التقريبية" placeholder="م³ أو عدد نقلات" />
                <CitySelectField label="المدينة" required={false} placeholder="اختر المدينة" />
                <CheckField label="هل يوجد رفع مساحي؟" />
                <CheckField label="هل المطلوب دك وتسوية؟" />
                <label className="text-sm font-bold text-navy">
                  تاريخ البدء
                  <input type="date" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                  activeTab === tab.id ? "border-gold bg-gold text-navy" : "border-[#d9c7a3] bg-white text-steel hover:border-gold"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleOffers.map((offer) => (
              <article key={offer.id} className="overflow-hidden rounded-xl border border-[#d9c7a3] bg-white shadow-soft transition hover:-translate-y-1 hover:border-gold">
                <div className="relative h-48 overflow-hidden rounded-xl bg-navy">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="rounded-xl object-cover transition duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-navy/75 via-navy/15 to-transparent" />
                  <span className="absolute right-4 top-4 rounded-md bg-white/90 px-3 py-1 text-xs font-black text-navy">{offer.status}</span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold text-gold">{offer.supplier}</p>
                  <h3 className="mt-2 text-xl font-black text-navy">{offer.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-steel">{offer.description}</p>
                  <div className="mt-4 grid gap-2 text-sm text-steel">
                    <span className="inline-flex items-center gap-2"><PackageCheck className="h-4 w-4 text-gold" /> {offer.price}</span>
                    <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> طرق التسعير: {pricingMethods.join(" · ")}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                    <Link href="/request-equipment" className="rounded-md bg-gold px-4 py-2 text-sm font-black text-navy">طلب عرض</Link>
                    <Link href="/contact" className="rounded-md border border-navy/15 px-4 py-2 text-sm font-black text-navy">تفاصيل المورد</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-[#d9c7a3] bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black text-navy">خدمات مواد الردم</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {materialServices.map((item) => (
                <span key={item} className="rounded-full border border-gold/30 bg-[#f7f3ec] px-4 py-2 text-sm font-bold text-navy">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

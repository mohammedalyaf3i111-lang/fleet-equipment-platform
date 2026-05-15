"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PackageCheck, Truck } from "lucide-react";
import type { ServiceCategory } from "@/lib/service-categories";

type ProductMode = "block" | "brick";
type TabMode = "all" | "block" | "brick" | "materials" | "transport";

type MaterialOffer = {
  id: string;
  mode: ProductMode | "materials" | "transport";
  supplier: string;
  title: string;
  price: string;
  details: string;
  delivery: string;
  image: string;
};

const tabs: { id: TabMode; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "block", label: "بلك" },
  { id: "brick", label: "طوب" },
  { id: "materials", label: "مواد بناء" },
  { id: "transport", label: "نقل وتحميل" }
];

const blockTypes = ["بلك عادي", "بلك عازل", "بلك بركاني", "بلك أسمنتي", "بلك أبيض"];
const blockSizes = ["10", "15", "20", "25"];
const blockSaleMethods = ["بالحبة", "بالشدة", "بالمتر", "بالمشروع"];
const brickTypes = ["طوب أحمر", "طوب حراري", "طوب ديكوري", "طوب واجهات", "طوب تراثي"];
const brickSaleMethods = ["بالحبة", "بالربطة", "بالمتر", "بالمشروع"];
const brickColors = ["أحمر", "طيني", "رملي", "أبيض", "رمادي"];

const offers: MaterialOffer[] = [
  {
    id: "BLK-01",
    mode: "block",
    supplier: "مصنع بلوك الرياض",
    title: "بلك عازل 20 سم",
    price: "0.95 ر.س للحبة",
    details: "240 حبة بالشدة",
    delivery: "نقل متاح",
    image: "/images/blocks-bricks/insulated-block-20cm.jpg"
  },
  {
    id: "BLK-02",
    mode: "block",
    supplier: "مصنع البناء الحديث",
    title: "بلك أسمنتي 15 سم",
    price: "0.72 ر.س للحبة",
    details: "توريد بالشدة أو بالمشروع",
    delivery: "تحميل بالفوركلفت",
    image: "/images/blocks-bricks/cement-block-15cm.jpg"
  },
  {
    id: "BRK-01",
    mode: "brick",
    supplier: "مؤسسة طوب الجزيرة",
    title: "طوب أحمر واجهات",
    price: "1.20 ر.س للحبة",
    details: "توريد وتركيب متاح",
    delivery: "نقل مجدول",
    image: "/images/blocks-bricks/red-brick-facade.jpg"
  },
  {
    id: "BRK-02",
    mode: "brick",
    supplier: "مواد الواجهة السعودية",
    title: "طوب ديكوري واجهات",
    price: "حسب المتر",
    details: "ألوان واجهات وخيارات تراثية",
    delivery: "توريد مع تركيب",
    image: "/images/blocks-bricks/decorative-brick.jpg"
  },
  {
    id: "MAT-01",
    mode: "materials",
    supplier: "مستودعات مواد البناء",
    title: "رمل وبحص مع مواد مساندة",
    price: "حسب الكمية",
    details: "توريد للمواقع والمشاريع",
    delivery: "نقل متاح",
    image: "/images/blocks-bricks/sand-gravel-materials.jpg"
  },
  {
    id: "TRN-01",
    mode: "transport",
    supplier: "أسطول تحميل مواد",
    title: "تحميل بلوك بالفوركلفت",
    price: "سعر مشوار",
    details: "تحميل وتنزيل داخل الموقع",
    delivery: "فوري حسب المدينة",
    image: "/images/blocks-bricks/forklift-block-loading.jpg"
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

function CheckField({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-md bg-white p-3 text-sm font-bold text-navy">
      <input type="checkbox" />
      {label}
    </label>
  );
}

export function BrickBlockService({ service }: { service: ServiceCategory }) {
  const [productMode, setProductMode] = useState<ProductMode>("block");
  const [activeTab, setActiveTab] = useState<TabMode>("all");

  const visibleOffers = useMemo(() => {
    if (activeTab === "all") return offers;
    return offers.filter((offer) => offer.mode === activeTab);
  }, [activeTab]);

  return (
    <div>
      <section className="relative isolate overflow-hidden bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <Image src={service.image} alt={service.arabicName} fill priority sizes="100vw" className="object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/95 via-navy/82 to-navy/35" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
          <div>
            <p className="text-sm font-black text-gold">مواد بناء متخصصة</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">قسم الطوب والبلك</h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-white/80">
              اختر بين الطوب والبلك، وحدد المقاس وطريقة البيع والتوريد أو التركيب، مع تجربة مخصصة لمواد البناء فقط.
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

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                  activeTab === tab.id ? "border-gold bg-gold text-navy" : "border-slate-200 bg-white text-steel hover:border-gold/60"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
            <aside className="rounded-lg border border-slate-200 bg-mist p-5 shadow-soft">
              <h2 className="text-xl font-black text-navy">نوع المنتج</h2>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  ["block", "بلك"],
                  ["brick", "طوب"]
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setProductMode(value as ProductMode)}
                    className={`rounded-md border px-4 py-3 text-sm font-black transition ${
                      productMode === value ? "border-gold bg-gold text-navy" : "border-slate-200 bg-white text-navy"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid gap-3">
                {productMode === "block" ? (
                  <>
                    <SelectField label="نوع البلك" options={blockTypes} />
                    <SelectField label="المقاس" options={blockSizes} />
                    <SelectField label="طريقة البيع" options={blockSaleMethods} />
                  </>
                ) : (
                  <>
                    <SelectField label="نوع الطوب" options={brickTypes} />
                    <SelectField label="لون الطوب" options={brickColors} />
                    <SelectField label="طريقة البيع" options={brickSaleMethods} />
                    <CheckField label="مقاوم حرارة" />
                    <SelectField label="الاستخدام" options={["داخلي", "خارجي"]} />
                    <CheckField label="توريد فقط" />
                    <CheckField label="توريد مع تركيب" />
                  </>
                )}
              </div>
            </aside>

            <div className="grid gap-4 md:grid-cols-2">
              {visibleOffers.map((offer) => (
                <article key={offer.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-xl">
                  <div className="relative h-48 overflow-hidden rounded-xl bg-slate-200">
                    <Image src={offer.image} alt={offer.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="rounded-xl object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-navy/72 via-navy/16 to-transparent" />
                    <span className="absolute right-4 top-4 rounded-md bg-white/90 px-3 py-1 text-xs font-black text-navy">
                      {offer.mode === "block" ? "بلك" : offer.mode === "brick" ? "طوب" : "خدمة"}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-bold text-gold">{offer.supplier}</p>
                    <h3 className="mt-2 text-xl font-black text-navy">{offer.title}</h3>
                    <div className="mt-4 grid gap-2 text-sm text-steel">
                      <span className="inline-flex items-center gap-2"><PackageCheck className="h-4 w-4 text-gold" /> {offer.price}</span>
                      <span>{offer.details}</span>
                      <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> {offer.delivery}</span>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                      <Link href="/request-equipment" className="rounded-md bg-gold px-4 py-2 text-sm font-black text-navy">طلب عرض</Link>
                      <Link href="/contact" className="rounded-md border border-navy/15 px-4 py-2 text-sm font-black text-navy">تفاصيل المورد</Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

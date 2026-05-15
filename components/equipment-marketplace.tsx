"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageSquare, Filter, ChevronDown } from "lucide-react";
import { officialWhatsAppLink } from "@/lib/contact";

type EquipmentItem = {
  id: string; name: string; category: string; supplier: string; city: string;
  available: boolean; dailyPrice: number; monthlyPrice: number; image: string; verified: boolean;
};

const mockEquipment: EquipmentItem[] = [
  { id: "EQ001", name: "كرين 50 طن - Liebherr LTM 1050", category: "كرينات", supplier: "شركة الرياض للمعدات", city: "الرياض", available: true, dailyPrice: 3500, monthlyPrice: 85000, image: "/images/categories/cranes.jpg", verified: true },
  { id: "EQ002", name: "بوكلين CAT 320 - حفر وتحميل", category: "حفارات", supplier: "مؤسسة الشرق الأوسط", city: "جدة", available: true, dailyPrice: 2200, monthlyPrice: 52000, image: "/images/categories/excavators.jpg", verified: true },
  { id: "EQ003", name: "شيول Volvo L150H - تحميل ونقل", category: "شيولات", supplier: "شركة الخليج للمعدات الثقيلة", city: "الدمام", available: true, dailyPrice: 1900, monthlyPrice: 45000, image: "/images/categories/wheel-loaders.jpg", verified: true },
  { id: "EQ004", name: "قلاب 25 طن - Mercedes Actros", category: "قلابات", supplier: "مؤسسة النقل الحديث", city: "الرياض", available: false, dailyPrice: 1400, monthlyPrice: 33000, image: "/images/categories/lowbeds.jpg", verified: true },
  { id: "EQ005", name: "بوبكات Bobcat S650 - بكفرات", category: "بوبكات", supplier: "شركة الجزيرة للمعدات", city: "مكة المكرمة", available: true, dailyPrice: 950, monthlyPrice: 22000, image: "/images/categories/bobcats.jpg", verified: false },
  { id: "EQ006", name: "فوركلفت Toyota 7FG35 - 3.5 طن", category: "فوركلفت", supplier: "مستودعات السعودية", city: "جدة", available: true, dailyPrice: 850, monthlyPrice: 19000, image: "/images/categories/forklifts.jpg", verified: true },
  { id: "EQ007", name: "مولد CAT 500 KVA ديزل", category: "مولدات", supplier: "شركة القدرة للطاقة", city: "الرياض", available: true, dailyPrice: 1200, monthlyPrice: 28000, image: "/images/categories/generators.jpg", verified: true },
  { id: "EQ008", name: "مان لفت JLG 400S - 40 قدم", category: "مان لفت", supplier: "الرافعات السعودية", city: "الدمام", available: true, dailyPrice: 780, monthlyPrice: 18000, image: "/images/categories/manlifts.jpg", verified: true },
  { id: "EQ009", name: "كمبروسر Atlas Copco 185 cfm", category: "كمبروسرات", supplier: "معدات الهواء المضغوط", city: "الرياض", available: true, dailyPrice: 650, monthlyPrice: 15000, image: "/images/categories/compressors.jpg", verified: false },
  { id: "EQ010", name: "رصاصة تمهيد - Bomag BW 213", category: "رصاصات", supplier: "شركة الطرق والبناء", city: "جدة", available: true, dailyPrice: 1100, monthlyPrice: 26000, image: "/images/categories/heavy-transport.jpg", verified: true },
  { id: "EQ011", name: "سطحة 40 طن - Man TGA", category: "سطحات", supplier: "خدمات النقل الثقيل", city: "الدمام", available: false, dailyPrice: 2800, monthlyPrice: 65000, image: "/images/categories/lowbeds.jpg", verified: true },
  { id: "EQ012", name: "كرين برجي Liebherr 280 EC-H", category: "كرينات", supplier: "شركة البناء المتقدم", city: "الرياض", available: true, dailyPrice: 5500, monthlyPrice: 130000, image: "/images/categories/cranes.jpg", verified: true }
];

const cities = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الجبيل", "تبوك"];
const categories = ["الكل", "كرينات", "حفارات", "شيولات", "قلابات", "بوبكات", "فوركلفت", "مولدات", "مان لفت", "كمبروسرات", "سطحات"];

function formatSar(amount: number) { return amount.toLocaleString("ar-SA") + " ر.س"; }

export function EquipmentMarketplace({ categorySlug }: { categorySlug?: string }) {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  void categorySlug;

  let filtered = mockEquipment;
  if (selectedCategory !== "الكل") filtered = filtered.filter(e => e.category === selectedCategory);
  if (selectedCity) filtered = filtered.filter(e => e.city === selectedCity);
  if (availableOnly) filtered = filtered.filter(e => e.available);
  if (verifiedOnly) filtered = filtered.filter(e => e.verified);
  if (sortBy === "price_asc") filtered = [...filtered].sort((a, b) => a.dailyPrice - b.dailyPrice);

  const perPage = 6;
  const totalPages = Math.ceil(filtered.length / perPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-gold">سوق المعدات</p>
            <h2 className="text-2xl font-black text-navy">المعدات المتاحة ({filtered.length})</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy shadow-sm transition hover:border-gold">
              <Filter className="h-4 w-4" />الفلاتر<ChevronDown className={`h-4 w-4 transition ${showFilters ? "rotate-180" : ""}`} />
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy shadow-sm">
              <option value="newest">الأحدث</option>
              <option value="popular">الأكثر طلباً</option>
              <option value="price_asc">الأقل سعراً</option>
            </select>
          </div>
        </div>
        {showFilters && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-2 block text-xs font-black text-steel">الفئة</label>
                <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black text-steel">المدينة</label>
                <select value={selectedCity} onChange={e => { setSelectedCity(e.target.value); setCurrentPage(1); }} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-navy">
                  <option value="">كل المدن</option>
                  {cities.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-3 pt-1">
                <label className="flex items-center gap-2 text-sm font-bold text-navy">
                  <input type="checkbox" checked={availableOnly} onChange={e => { setAvailableOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />متاحة فقط
                </label>
                <label className="flex items-center gap-2 text-sm font-bold text-navy">
                  <input type="checkbox" checked={verifiedOnly} onChange={e => { setVerifiedOnly(e.target.checked); setCurrentPage(1); }} className="h-4 w-4 rounded border-slate-300 accent-gold" />موردون معتمدون فقط
                </label>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setSelectedCategory("الكل"); setSelectedCity(""); setAvailableOnly(false); setVerifiedOnly(false); setCurrentPage(1); }} className="rounded-md border border-slate-200 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">إعادة تعيين</button>
              </div>
            </div>
          </div>
        )}
        {paginated.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center"><p className="text-steel">لا توجد معدات تطابق الفلاتر المحددة</p></div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((item) => <EquipmentCard key={item.id} item={item} formatSar={formatSar} />)}
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold disabled:opacity-40">السابق</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`rounded-md border px-4 py-2 text-sm font-bold transition ${currentPage === page ? "border-gold bg-gold text-navy" : "border-slate-200 text-navy hover:border-gold"}`}>{page}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-md border border-slate-200 px-4 py-2 text-sm font-bold text-navy transition hover:border-gold disabled:opacity-40">التالي</button>
          </div>
        )}
      </div>
    </div>
  );
}

function EquipmentCard({ item, formatSar }: { item: EquipmentItem; formatSar: (n: number) => string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md">
      <div className="relative h-48 bg-slate-200">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300" />
        <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 left-3 flex items-end justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-black text-white ${item.available ? "bg-green-600" : "bg-slate-600"}`}>{item.available ? "متاحة" : "غير متاحة"}</span>
          {item.verified && <span className="flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-xs font-black text-navy"><CheckCircle2 className="h-3.5 w-3.5" />معتمد</span>}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-black text-navy leading-tight">{item.name}</h3>
        <p className="mt-1 text-xs text-steel">{item.supplier} - {item.city}</p>
        <div className="mt-3 flex items-center justify-between">
          <div><p className="text-xs text-steel">يومي</p><p className="font-black text-navy">{formatSar(item.dailyPrice)}</p></div>
          <div className="text-left rtl:text-right"><p className="text-xs text-steel">شهري</p><p className="font-black text-navy">{formatSar(item.monthlyPrice)}</p></div>
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

"use client";

import Link from "next/link";
import { MapPin, Truck, Phone, CheckCircle, ChevronLeft, Star, Clock, Shield } from "lucide-react";
import { PublicShell } from "@/components/shell";
import { ButtonLink } from "@/components/ui";
import type { CityData, EquipmentCityContent } from "@/lib/cities";
import { EQUIPMENT_ARABIC_NAMES } from "@/lib/cities";

const CITY_EQUIPMENT_SLUGS = ["cranes", "excavators", "wheel-loaders", "dump-trucks", "generators", "forklifts", "bulldozers"];

// ── City landing page ────────────────────────────────────────────────────────

export function CityLandingPage({ city }: { city: CityData }) {
  return (
    <PublicShell>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gold text-sm font-bold mb-4">
            <MapPin className="h-4 w-4" />
            <span>{city.region}</span>
            <ChevronLeft className="h-3 w-3 opacity-50" />
            <span>{city.arabicName}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            تأجير معدات ثقيلة<br />
            <span className="text-gold">في {city.arabicName}</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl leading-8 mb-8">
            {city.localContext} — فليت معدات توفر أكبر شبكة مزودين معتمدين في {city.arabicName} مع عقود رقمية وأسعار شفافة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/request-equipment">اطلب معدة الآن في {city.arabicName}</ButtonLink>
            <ButtonLink href="/equipment" variant="secondary">تصفح جميع المعدات</ButtonLink>
          </div>
          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: "مزود معتمد", value: "+50" },
              { label: "نوع معدة متاح", value: "+30" },
              { label: "مشروع منجز", value: "+200" },
              { label: "توصيل (ساعة)", value: "24" }
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black text-gold">{s.value}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment grid */}
      <section className="py-16 bg-mist">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-navy mb-3">المعدات المتاحة في {city.arabicName}</h2>
          <p className="text-steel mb-10">اختر نوع المعدة للاطلاع على التفاصيل والأسعار في {city.arabicName}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {CITY_EQUIPMENT_SLUGS.map(slug => (
              <Link
                key={slug}
                href={`/cities/${city.slug}/${slug}`}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/40 hover:shadow-md"
              >
                <div className="mb-3 inline-flex rounded-lg bg-gold/10 p-3">
                  <Truck className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-black text-navy text-lg mb-1">
                  تأجير {EQUIPMENT_ARABIC_NAMES[slug]}
                </h3>
                <p className="text-sm text-steel mb-3">
                  في {city.arabicName} — أسعار تنافسية
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-gold group-hover:gap-2 transition-all">
                  عرض التفاصيل <ChevronLeft className="h-3 w-3 rotate-180" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key projects */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-3xl font-black text-navy mb-4">المشاريع الكبرى في {city.arabicName}</h2>
              <p className="text-steel leading-7 mb-6">
                {city.arabicName} تشهد مشاريع ضخمة تتطلب معدات ثقيلة متخصصة. فليت معدات جاهز لخدمة جميع هذه المشاريع.
              </p>
              <ul className="grid gap-3">
                {city.keyProjects.map(p => (
                  <li key={p} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span className="font-bold text-navy">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-black text-navy mb-4">لماذا فليت معدات في {city.arabicName}؟</h2>
              <div className="grid gap-4">
                {[
                  { icon: Clock, title: "توصيل خلال 24 ساعة", desc: `نوصّل المعدات لأي موقع في ${city.arabicName} خلال 24 ساعة من تأكيد الطلب.` },
                  { icon: Shield, title: "عقود رقمية موثقة", desc: "جميع التعاملات بعقود رقمية واضحة تحمي حقوقك كمستأجر." },
                  { icon: Star, title: "مزودون معتمدون", desc: `أكثر من 50 مزود معتمد في ${city.arabicName} بتقييمات موثوقة.` },
                  { icon: Phone, title: "دعم 24/7 عبر واتساب", desc: "فريق دعم متاح على مدار الساعة للمساعدة والطوارئ." }
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 rounded-lg border border-slate-100 bg-mist p-4">
                    <div className="shrink-0 rounded-lg bg-gold/10 p-2.5">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-black text-navy text-sm">{title}</h3>
                      <p className="text-xs text-steel mt-1 leading-5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      {city.nearbyAreas.length > 0 && (
        <section className="py-12 bg-mist">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-black text-navy mb-6">نخدم أيضاً المناطق المجاورة لـ{city.arabicName}</h2>
            <div className="flex flex-wrap gap-3">
              {city.nearbyAreas.map(area => (
                <span key={area} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-navy">
                  <MapPin className="h-3.5 w-3.5 text-gold" />{area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-black mb-4">جاهز لتأجير معداتك في {city.arabicName}؟</h2>
          <p className="text-white/70 mb-8 leading-7">
            أرسل طلبك الآن وسيتواصل معك أقرب مزود معتمد في {city.arabicName} خلال ساعات.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink href="/request-equipment">اطلب معدة الآن</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">تواصل معنا</ButtonLink>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}

// ── Equipment + City page ────────────────────────────────────────────────────

export function EquipmentCityPage({
  city,
  equipmentSlug,
  content
}: {
  city: CityData;
  equipmentSlug: string;
  content: EquipmentCityContent;
}) {
  const equipmentName = EQUIPMENT_ARABIC_NAMES[equipmentSlug] ?? equipmentSlug;

  return (
    <PublicShell>
      {/* Hero */}
      <section className="bg-navy text-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition">الرئيسية</Link>
            <ChevronLeft className="h-3 w-3" />
            <Link href={`/cities/${city.slug}`} className="hover:text-white transition">
              معدات {city.arabicName}
            </Link>
            <ChevronLeft className="h-3 w-3" />
            <span className="text-gold font-bold">تأجير {equipmentName}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
            تأجير {equipmentName}<br />
            <span className="text-gold">في {city.arabicName}</span>
          </h1>
          <p className="text-lg text-white/80 max-w-3xl leading-8 mb-8">{content.intro}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ButtonLink href="/request-equipment">اطلب {equipmentName} الآن</ButtonLink>
            <ButtonLink href={`/cities/${city.slug}`} variant="secondary">كل معدات {city.arabicName}</ButtonLink>
          </div>
        </div>
      </section>

      {/* Price range banner */}
      <div className="border-y border-gold/20 bg-gold/5 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-3">
          <span className="text-sm font-black text-navy">نطاق الأسعار في {city.arabicName}:</span>
          <span className="font-bold text-gold">{content.priceRange}</span>
        </div>
      </div>

      {/* Why here + tips */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-black text-navy mb-6">
                لماذا تستأجر {equipmentName} في {city.arabicName} من فليت معدات؟
              </h2>
              <ul className="grid gap-4">
                {content.whyHere.map((w, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-navy leading-6">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black text-navy mb-6">نصائح قبل التأجير</h2>
              <ul className="grid gap-4">
                {content.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-lg border border-slate-100 bg-mist p-4">
                    <span className="shrink-0 rounded-full bg-gold text-navy font-black text-xs h-6 w-6 flex items-center justify-center">{i + 1}</span>
                    <span className="text-navy text-sm leading-6">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="py-16 bg-mist">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-black text-navy mb-10 text-center">
              أسئلة شائعة — تأجير {equipmentName} في {city.arabicName}
            </h2>
            <div className="grid gap-4">
              {content.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="font-black text-navy mb-3">{faq.q}</h3>
                  <p className="text-steel leading-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related cities */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy mb-6">تأجير {equipmentName} في مدن أخرى</h2>
          <div className="flex flex-wrap gap-3">
            {["riyadh", "jeddah", "dammam", "makkah", "madinah", "khobar", "jubail", "yanbu"]
              .filter(s => s !== city.slug)
              .map(s => {
                const cityNames: Record<string, string> = {
                  riyadh: "الرياض", jeddah: "جدة", dammam: "الدمام",
                  makkah: "مكة المكرمة", madinah: "المدينة المنورة",
                  khobar: "الخبر", jubail: "الجبيل", yanbu: "ينبع"
                };
                return (
                  <Link
                    key={s}
                    href={`/cities/${s}/${equipmentSlug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-mist px-4 py-2 text-sm font-bold text-navy hover:border-gold/50 hover:bg-gold/5 transition"
                  >
                    <MapPin className="h-3.5 w-3.5 text-gold" />
                    تأجير {equipmentName} في {cityNames[s]}
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy text-white text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-black mb-4">ابدأ تأجير {equipmentName} في {city.arabicName} الآن</h2>
          <p className="text-white/70 mb-8">أرسل طلبك وسيتواصل معك مزود معتمد خلال ساعات. عقد رقمي وسعر شفاف.</p>
          <ButtonLink href="/request-equipment">اطلب الآن — مجاناً</ButtonLink>
        </div>
      </section>
    </PublicShell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, FileCheck, MapPin, Headphones, BadgeCheck, Zap, ChevronDown, ChevronUp, Construction, Truck, Forklift, Factory, Container, Route, Gauge, Waves } from "lucide-react";
import { officialWhatsAppLink } from "@/lib/contact";

export function HomeHero() {
  const stats = [
    { value: "+500", label: "معدة متاحة" },
    { value: "+80", label: "مورد معتمد" },
    { value: "12+", label: "مدينة التشغيل" },
    { value: "+1200", label: "طلب منجز" }
  ];
  const trustBadges = ["شهادة فحص موثقة", "عقود رسمية", "دفع آمن"];
  return (
    <section className="relative isolate min-h-[700px] overflow-hidden bg-navy text-white md:min-h-[780px]">
      <div className="absolute inset-0">
        <Image src="/images/services/backfilling.jpg" alt="معدات ثقيلة" fill priority sizes="100vw" className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-l from-navy/95 via-navy/75 to-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/80" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[700px] max-w-7xl flex-col justify-center px-4 pb-36 pt-24 sm:px-6 md:min-h-[780px] lg:px-8">
        <div className="max-w-3xl text-right">
          <p className="mb-5 inline-flex rounded-md border border-gold/45 bg-white/10 px-4 py-2 text-sm font-semibold text-gold shadow-xl backdrop-blur">
            منصة سعودية معتمدة لتأجير المعدات الثقيلة
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.2] text-white drop-shadow-2xl sm:text-5xl lg:text-6xl">
            منصة تأجير المعدات الثقيلة في السعودية
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-9 text-white/84">
            نربط أصحاب المشاريع بموردي المعدات المعتمدين. طلب فوري، تسعير شفاف، توثيق رسمي.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/request-equipment" className="inline-flex items-center gap-2 rounded-md bg-gold px-7 py-3.5 text-base font-black text-navy shadow-xl shadow-gold/25 transition hover:-translate-y-0.5 hover:bg-[#d6aa4d]">اطلب معدة الآن</Link>
            <Link href="/equipment" className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition hover:border-white/70 hover:bg-white/15">تصفح المعدات</Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {trustBadges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90 backdrop-blur">
                <ShieldCheck className="h-4 w-4 text-gold" />{badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-5 z-10 mx-auto max-w-7xl sm:bottom-8 sm:px-2">
        <div className="grid overflow-hidden rounded-2xl border border-white/16 bg-white/[0.13] shadow-2xl shadow-black/30 backdrop-blur-2xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="border-white/12 px-5 py-5 text-right transition hover:bg-white/[0.08] sm:border-l">
              <p className="text-3xl font-extrabold text-gold">{value}</p>
              <p className="mt-1 text-sm font-semibold text-white/82">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const equipmentCategories = [
  { name: "كرينات", desc: "كرينات تلسكوبية ومتنقلة بسعات متعددة", icon: Construction, href: "/equipment/cranes" },
  { name: "بوكلينات", desc: "حفارات وبوكلينات بأحجام تشغيلية مختلفة", icon: Construction, href: "/equipment/excavators" },
  { name: "شيولات", desc: "شيولات تحميل ونقل داخل المواقع", icon: Construction, href: "/equipment/wheel-loaders" },
  { name: "قلابات", desc: "شاحنات قلاب لنقل الأتربة والمواد", icon: Truck, href: "/equipment/trucks" },
  { name: "بوبكات", desc: "بوبكات كفرات وجنزير مع ملحقات متنوعة", icon: Construction, href: "/equipment/skid-steers" },
  { name: "فوركلفت", desc: "رافعات شوكية ديزل وكهرباء للمستودعات", icon: Forklift, href: "/equipment/forklifts" },
  { name: "مولدات", desc: "مولدات طاقة للمشاريع والمواقع المؤقتة", icon: Gauge, href: "/equipment/compressors-generators" },
  { name: "مان لفت", desc: "منصات رفع أشخاص للعمل الداخلي والخارجي", icon: Waves, href: "/equipment/boom-lifts-manlifts" }
];

export function EquipmentCategoriesSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-bold text-gold">كتالوج شامل</p>
        <h2 className="max-w-3xl text-2xl font-bold text-navy md:text-4xl">أنواع المعدات</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {equipmentCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link key={cat.name} href={cat.href} className="group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-gold/60 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold transition group-hover:bg-gold group-hover:text-navy">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-black text-navy">{cat.name}</h3>
                <p className="mt-2 text-sm leading-6 text-steel">{cat.desc}</p>
                <span className="mt-4 inline-block text-sm font-bold text-gold transition group-hover:text-navy">تصفح</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const services = [
  { name: "ردم وتجهيز المواقع", desc: "معدات ومواد الردم والدك وتجهيز مواقع البناء بالكامل.", icon: Truck, color: "#D6A23A", href: "/services/backfilling" },
  { name: "خدمات الخرسانة", desc: "مضخات خرسانة، خلاطات، وميكسرات لجميع أحجام المشاريع.", icon: Factory, color: "#7C5E3C", href: "/services/concrete" },
  { name: "مخلفات البناء", desc: "حاويات ونقل مخلفات البناء والهدم مع التخلص المنظم.", icon: Container, color: "#475569", href: "/services/construction-waste" },
  { name: "أسفلت وطرق", desc: "معدات وخدمات رصف الأسفلت وإعادة تأهيل الطرق.", icon: Route, color: "#374151", href: "/services/asphalt" },
  { name: "نقل ثقيل", desc: "سطحات ولوبدات وتريلات لنقل المعدات والحمولات الضخمة.", icon: Truck, color: "#1F2937", href: "/services/heavy-transport" },
  { name: "رفع ومناولة", desc: "كرينات ورافعات وحلول رفع آمنة لجميع أنواع المشاريع.", icon: Construction, color: "#D8A31E", href: "/services/lifting" }
];

export function PopularServicesSection() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-bold text-gold">حلول متكاملة</p>
        <h2 className="max-w-3xl text-2xl font-bold text-navy md:text-4xl">خدمات التشغيل الميداني</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <Link key={svc.name} href={svc.href} className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-md">
                <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: svc.color + "18", color: svc.color }}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-navy">{svc.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-steel">{svc.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { num: "01", title: "أرسل طلبك", desc: "صف المعدة المطلوبة ومواصفات المشروع وموقع التشغيل وتاريخ البدء." },
  { num: "02", title: "احصل على عروض", desc: "يتنافس الموردون المعتمدون بتقديم أسعارهم وشروط التشغيل في وقت قصير." },
  { num: "03", title: "اعتمد المورد", desc: "راجع وثائق المورد وتقييماته وسجله، ثم اختر العرض الأنسب لك." },
  { num: "04", title: "ابدأ التشغيل", desc: "تصل المعدة مع عقد رسمي، توثيق استلام وتسليم، ودعم طوال مدة التشغيل." }
];

export function HowItWorksSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-bold text-gold">عملية بسيطة</p>
        <h2 className="max-w-3xl text-2xl font-bold text-navy md:text-4xl">كيف تعمل المنصة؟</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div key={step.num} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-sm font-black text-gold">{step.num}</span>
              <h3 className="mt-5 font-black text-navy">{step.title}</h3>
              <p className="mt-3 leading-7 text-steel">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WasteHighlightSection() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-8 text-white md:p-12">
          <div className="absolute inset-0 opacity-20">
            <Image src="/images/categories/waste.jpg" alt="مخلفات البناء" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 via-slate-800/60 to-slate-900/80" />
          <div className="absolute right-0 top-0 h-full w-1 bg-gold" />
          <div className="relative">
            <p className="text-sm font-bold text-gold">خدمة متكاملة</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black md:text-4xl">حلول مخلفات البناء والهدم</h2>
            <p className="mt-4 max-w-xl leading-8 text-white/75">حاويات بأحجام متعددة، نقل منظم، ترحيل شامل - خدمة سريعة تشمل طوارئ على مدار 24 ساعة.</p>
            <div className="mt-6 flex flex-wrap gap-6">
              {[{ val: "14", label: "خدمة متاحة" }, { val: "7", label: "أحجام حاويات" }, { val: "24/7", label: "استجابة طوارئ" }].map(({ val, label }) => (
                <div key={label}><p className="text-3xl font-black text-gold">{val}</p><p className="text-sm text-white/65">{label}</p></div>
              ))}
            </div>
            <Link href="/services/construction-waste" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">استعرض الخدمة</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const valueProps = [
  { icon: ShieldCheck, title: "موردون معتمدون", desc: "كل مورد يخضع لمراجعة وثائق وتحقق قبل الإدراج في المنصة." },
  { icon: FileCheck, title: "عقود رسمية", desc: "عقود رقمية موثقة مع إثبات استلام وتسليم لكل طلب." },
  { icon: MapPin, title: "تتبع مباشر", desc: "تتبع موقع المعدة وحالة التشغيل في الوقت الفعلي." },
  { icon: Headphones, title: "دعم 24 ساعة", desc: "فريق دعم متاح على مدار الساعة لحل أي مشكلة تشغيلية." },
  { icon: BadgeCheck, title: "تسعير شفاف", desc: "أسعار واضحة بدون رسوم مخفية مع ضريبة القيمة المضافة." },
  { icon: Zap, title: "خدمة طوارئ", desc: "استجابة سريعة للطلبات العاجلة خلال ساعات من الإرسال." }
];

export function WhyChooseUsSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="mb-3 text-sm font-bold text-gold">الفرق الحقيقي</p>
        <h2 className="max-w-3xl text-2xl font-bold text-navy md:text-4xl">لماذا فليت معدات؟</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold"><Icon className="h-6 w-6" /></div>
                <h3 className="font-black text-navy">{item.title}</h3>
                <p className="mt-3 leading-7 text-steel">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function StatsStripSection() {
  const stats = [{ value: "500+", label: "معدة" }, { value: "80+", label: "مورد" }, { value: "12", label: "مدينة" }, { value: "1200+", label: "طلب" }];
  return (
    <section className="bg-navy px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-5xl font-black text-gold">{value}</p>
              <p className="mt-2 text-sm font-semibold text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SupplierCtaSection() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-navy px-8 py-12 text-center text-white md:px-16">
          <h2 className="text-3xl font-black">هل تملك معدات؟</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-white/70">سجل كمورد معتمد في المنصة، أضف معداتك ووثائقك، واستقبل طلبات تشغيل من عملاء موثوقين.</p>
          <Link href="/become-supplier" className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-4 text-base font-black text-navy transition hover:bg-[#d6aa4d]">سجل كمورد الآن</Link>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "كيف أطلب معدة عبر المنصة؟", a: "أرسل طلبك من صفحة اطلب معدة مع تفاصيل المعدة والمشروع، وسيتواصل معك الموردون المعتمدون بعروض خلال ساعات قليلة." },
  { q: "هل الأسعار شاملة ضريبة القيمة المضافة؟", a: "تعرض الأسعار دون ضريبة القيمة المضافة بشكل افتراضي، ويحسب المبلغ النهائي مع الضريبة 15% في عرض السعر الرسمي." },
  { q: "ما هي مدة التسليم المتوقعة للمعدة؟", a: "تتراوح مدة التسليم عادةً بين 4 إلى 24 ساعة من اعتماد العرض، وتعتمد على نوع المعدة والمدينة." },
  { q: "هل يوجد عقود رسمية لكل طلب؟", a: "نعم، لكل أمر تشغيل عقد رقمي مع إثبات تسليم واستلام يشمل الصور والوقت والموقع الجغرافي." },
  { q: "كيف أنضم كمورد معدات؟", a: "سجل عبر صفحة سجل كمورد، ارفع السجل التجاري والوثائق المطلوبة، وسيراجع فريقنا طلبك ويفعل حسابك." },
  { q: "ما المناطق والمدن التي تغطيها المنصة؟", a: "نغطي حالياً الرياض، جدة، الدمام، مكة المكرمة، المدينة المنورة، الخبر، الجبيل، ينبع، تبوك، أبها، القصيم، وحائل." }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold text-gold">أسئلة شائعة</p>
        <h2 className="text-2xl font-bold text-navy md:text-4xl">الأسئلة الأكثر شيوعاً</h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="flex w-full items-center justify-between gap-4 p-5 text-right text-sm font-black text-navy transition hover:bg-mist">
                <span>{faq.q}</span>
                {openIndex === idx ? <ChevronUp className="h-5 w-5 shrink-0 text-gold" /> : <ChevronDown className="h-5 w-5 shrink-0 text-steel" />}
              </button>
              {openIndex === idx && <div className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-steel">{faq.a}</div>}
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-xl border border-green-100 bg-green-50 p-6 text-center">
          <p className="font-black text-navy">لم تجد إجابتك؟</p>
          <p className="mt-2 text-sm text-steel">تواصل معنا مباشرة عبر واتساب وسنجيبك فوراً</p>
          <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-black text-white transition hover:bg-[#1ebe5d]">تواصل عبر واتساب</a>
        </div>
      </div>
    </section>
  );
}

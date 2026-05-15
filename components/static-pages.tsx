"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, FileCheck, TrendingUp, Mail, Phone, MapPin, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { brand } from "@/lib/brand";
import { officialWhatsAppDisplay, officialWhatsAppLink } from "@/lib/contact";

export function AboutPageContent() {
  const pillars = [
    { icon: ShieldCheck, title: "الشفافية", desc: "أسعار واضحة، عقود موثقة، وتقييمات حقيقية من العملاء والموردين. لا رسوم مخفية." },
    { icon: FileCheck, title: "الاعتماد", desc: "كل مورد يخضع لمراجعة وثائق ومعدات قبل الإدراج. كل طلب موثق بعقد رقمي." },
    { icon: TrendingUp, title: "الكفاءة", desc: "طلبك يصل للموردين المناسبين فوراً، وتحصل على عروض منافسة في ساعات قليلة." }
  ];
  return (
    <div>
      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-3 text-sm font-bold text-gold">من نحن</p>
              <h2 className="text-3xl font-black text-navy">منصة سعودية لتأجير المعدات الثقيلة</h2>
              <p className="mt-5 leading-8 text-steel">{brand.arabicName} منصة تشغيل وسوق رقمية للمعدات الثقيلة، مملوكة لـ {brand.legalOwner}، مصممة للسوق السعودي أولاً ثم التوسع الخليجي. نربط أصحاب المشاريع بموردي المعدات المعتمدين بطريقة سريعة وشفافة ورسمية.</p>
              <p className="mt-4 leading-8 text-steel">نؤمن بأن عملية تأجير المعدات يجب أن تكون سهلة، موثقة، ومحمية قانونياً للطرفين.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-mist p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {[{ val: "500+", label: "معدة مسجلة" }, { val: "80+", label: "مورد معتمد" }, { val: "12+", label: "مدينة تشغيل" }, { val: "1200+", label: "طلب منجز" }].map(({ val, label }) => (
                  <div key={label} className="rounded-xl bg-white p-5 shadow-sm text-center">
                    <p className="text-3xl font-black text-gold">{val}</p>
                    <p className="mt-1 text-sm text-steel">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold text-gold">قيمنا الأساسية</p>
          <h2 className="mb-8 text-2xl font-black text-navy md:text-4xl">ثلاثة مبادئ تحكم عملنا</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold"><Icon className="h-6 w-6" /></div>
                  <h3 className="text-xl font-black text-navy">{pillar.title}</h3>
                  <p className="mt-3 leading-7 text-steel">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-navy px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-bold text-gold">السوق السعودي</p>
          <h2 className="mb-5 text-2xl font-black md:text-4xl">قطاع البناء في المملكة العربية السعودية</h2>
          <p className="max-w-3xl leading-8 text-white/75">يقدر حجم سوق تأجير المعدات الثقيلة في المملكة بأكثر من <strong className="text-gold">5 مليار ريال</strong> سنوياً، مدفوعاً بمشاريع رؤية 2030 والنمو في قطاعات البناء والبنية التحتية. تهدف {brand.arabicName} إلى رقمنة هذا القطاع وتوثيق معاملاته بشكل احترافي.</p>
        </div>
      </section>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
              <h3 className="text-xl font-black text-navy">هل تبحث عن معدة؟</h3>
              <p className="mt-3 text-steel">أرسل طلبك وسنوصلك بأفضل الموردين</p>
              <Link href="/request-equipment" className="mt-5 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">اطلب معدة الآن</Link>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
              <h3 className="text-xl font-black text-navy">هل تملك معدات؟</h3>
              <p className="mt-3 text-steel">انضم كمورد وابدأ استقبال الطلبات</p>
              <Link href="/become-supplier" className="mt-5 inline-flex items-center gap-2 rounded-md border border-navy bg-white px-6 py-3 text-sm font-black text-navy transition hover:bg-navy hover:text-white">سجل كمورد</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ContactPageContent() {
  const inquiryTypes = ["استفسار عن تأجير معدة", "طلب عرض سعر", "التسجيل كمورد", "شراكة تجارية", "مشكلة تقنية", "أخرى"];
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black text-navy">راسلنا</h2>
            <p className="mt-2 text-sm text-steel">سنرد عليك خلال ساعتين في أوقات الدوام</p>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-bold text-navy">الاسم الكامل *<input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="اسمك الكامل" /></label>
                <label className="block text-sm font-bold text-navy">الشركة<input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="اسم الشركة (اختياري)" /></label>
                <label className="block text-sm font-bold text-navy">رقم الجوال *<input type="tel" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="05xxxxxxxx" /></label>
                <label className="block text-sm font-bold text-navy">المدينة<input className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="مدينتك" /></label>
              </div>
              <label className="block text-sm font-bold text-navy">نوع الاستفسار<select className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"><option value="">اختر</option>{inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}</select></label>
              <label className="block text-sm font-bold text-navy">رسالتك *<textarea rows={4} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" placeholder="اكتب رسالتك هنا..." /></label>
              <button type="submit" className="rounded-md bg-navy py-3 text-sm font-black text-white transition hover:bg-[#0c2040]">إرسال الرسالة</button>
            </form>
          </div>
          <div className="grid gap-5 content-start">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-black text-navy">معلومات التواصل</h3>
              <div className="mt-5 grid gap-4">
                {[{ Icon: Phone, bg: "bg-[#25D366]/10", color: "text-[#25D366]", label: "واتساب", value: officialWhatsAppDisplay, href: officialWhatsAppLink }, { Icon: Mail, bg: "bg-gold/10", color: "text-gold", label: "البريد الإلكتروني", value: brand.supportEmail, href: null }, { Icon: MapPin, bg: "bg-navy/10", color: "text-navy", label: "الموقع", value: "المملكة العربية السعودية", href: null }, { Icon: Clock, bg: "bg-blue-50", color: "text-blue-600", label: "أوقات الدوام", value: "الأحد - الخميس، 8ص - 6م", href: null }].map(({ Icon, bg, color, label, value, href }) => (
                  <div key={label} className="flex gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}><Icon className="h-5 w-5" /></div>
                    <div>
                      <p className="text-xs font-bold text-steel">{label}</p>
                      {href ? <a href={href} target="_blank" rel="noreferrer" className="font-black text-navy hover:text-gold">{value}</a> : <p className="font-black text-navy">{value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-4 text-sm font-black text-white transition hover:bg-[#1ebe5d]">تواصل عبر واتساب الآن</a>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-black text-navy">روابط سريعة</h3>
              <div className="mt-3 grid gap-2">
                {[["اطلب معدة", "/request-equipment"], ["سجل كمورد", "/become-supplier"], ["النماذج القانونية", "/legal-forms"]].map(([label, href]) => (
                  <Link key={href} href={href} className="flex items-center justify-between rounded-md border border-slate-100 px-4 py-2.5 text-sm font-bold text-navy transition hover:border-gold">
                    {label}<span className="text-gold">←</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const termsSections = [
  { title: "مسؤوليات العملاء", content: "يلتزم العميل بتقديم بيانات صحيحة عند الطلب، والالتزام بشروط عقد التشغيل. العميل مسؤول عن توفير موقع العمل الآمن والحصول على التصاريح اللازمة من الجهات المختصة." },
  { title: "التزامات الموردين", content: "يلتزم المورد بتسليم معدة مطابقة للمواصفات المتفق عليها، بحالة تشغيلية ممتازة، مع مشغل مؤهل إن اشترط العقد ذلك. يجب أن تكون جميع المعدات مرخصة ومؤمنة وذات فحص سنوي سارٍ." },
  { title: "الدفع والضرائب", content: "تحسب جميع الأسعار دون ضريبة القيمة المضافة (15%)، وتضاف عند إصدار عرض السعر النهائي. الدفع عبر التحويل البنكي أو الطرق المتفق عليها." },
  { title: "الأضرار والتلف", content: "أي ضرر يحدث للمعدة خلال فترة التأجير يكون مسؤولية العميل، ما لم يثبت أنه بسبب خلل مسبق. يوثق الاستلام والتسليم بالصور والتوقيع الإلكتروني كإثبات قانوني." },
  { title: "الإلغاء والتعديل", content: "يحق للعميل إلغاء الطلب قبل 48 ساعة من موعد التشغيل دون رسوم. الإلغاء المتأخر يخضع لسياسة التعويض المتفق عليها في العقد." },
  { title: "تسوية النزاعات", content: "تحل النزاعات أولاً بالتواصل المباشر بين الأطراف عبر المنصة. وفي حال تعذر الحل، يحال النزاع للتحكيم وفق الأنظمة السعودية المعمول بها." }
];

export function TermsPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold text-gold">آخر تحديث: 2025</p>
        <div className="grid gap-3">
          {termsSections.map((section, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="flex w-full items-center justify-between gap-4 p-5 text-right font-black text-navy transition hover:bg-mist">
                <span>{section.title}</span>
                {openIndex === idx ? <ChevronUp className="h-5 w-5 shrink-0 text-gold" /> : <ChevronDown className="h-5 w-5 shrink-0 text-steel" />}
              </button>
              {openIndex === idx && <div className="border-t border-slate-100 px-5 py-4 text-sm leading-8 text-steel">{section.content}</div>}
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
          <strong>تنبيه:</strong> هذه الشروط مسودة أولية وتتطلب مراجعة قانونية متخصصة قبل الاستخدام الرسمي.
        </div>
      </div>
    </div>
  );
}

const privacySections = [
  { title: "البيانات التي نجمعها", content: "نجمع بيانات الاسم والجوال والبريد الإلكتروني عند التسجيل، وبيانات الطلبات والمعدات والعقود. كما نجمع بيانات الجهاز والمتصفح لأغراض الأمان والتحليل." },
  { title: "ملفات الكوكيز", content: "نستخدم ملفات كوكيز ضرورية لتشغيل الموقع وتذكر جلسة الدخول. لا نستخدم كوكيز تتبع إعلاني دون موافقتك المسبقة." },
  { title: "استخدام البيانات", content: "تستخدم بياناتك لتقديم خدمات المنصة، التواصل معك بشأن طلباتك، وتحسين تجربة الاستخدام. لا نبيع بياناتك لأطراف ثالثة تحت أي ظرف." },
  { title: "الملفات والمستندات المرفوعة", content: "تخزن المستندات المرفوعة بأمان وتستخدم لأغراض التحقق الرسمي فقط. لا يشارك أي مستند مع أطراف غير مفوضة." },
  { title: "موقع الجهاز", content: "نطلب الوصول لموقع الجهاز فقط عند الضرورة وبموافقتك الصريحة. يمكنك إلغاء هذا الإذن في إعدادات جهازك في أي وقت." },
  { title: "التحليلات والإحصاء", content: "نستخدم أدوات تحليل مجهولة الهوية لفهم كيفية استخدام المنصة وتحسينها. لا ترتبط هذه البيانات بهويتك الشخصية." }
];

export function PrivacyPageContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-bold text-gold">آخر تحديث: 2025</p>
        <div className="grid gap-3">
          {privacySections.map((section, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="flex w-full items-center justify-between gap-4 p-5 text-right font-black text-navy transition hover:bg-mist">
                <span>{section.title}</span>
                {openIndex === idx ? <ChevronUp className="h-5 w-5 shrink-0 text-gold" /> : <ChevronDown className="h-5 w-5 shrink-0 text-steel" />}
              </button>
              {openIndex === idx && <div className="border-t border-slate-100 px-5 py-4 text-sm leading-8 text-steel">{section.content}</div>}
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-steel">
          <strong className="text-navy">حقوقك:</strong> يحق لك طلب تصحيح بياناتك أو حذفها في أي وقت عبر التواصل معنا على <a href={"mailto:" + brand.supportEmail} className="text-gold">{brand.supportEmail}</a>.
        </div>
      </div>
    </div>
  );
}

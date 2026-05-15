"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft } from "lucide-react";

const STEPS = [{ num: 1, label: "بيانات الشركة" }, { num: 2, label: "التغطية الجغرافية" }, { num: 3, label: "الأسطول والمعدات" }, { num: 4, label: "رفع الوثائق" }, { num: 5, label: "مراجعة وإرسال" }];
const CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الجبيل", "ينبع", "تبوك", "أبها", "القصيم", "حائل", "الطائف", "بريدة", "نجران", "جازان", "سكاكا", "عرعر"];
const EQUIPMENT_TYPES = ["كرينات", "حفارات / بوكلينات", "شيولات", "قلابات", "بوبكات", "فوركلفت", "مولدات", "مان لفت", "كمبروسرات", "سطحات / لوبدات", "رصاصات تمهيد", "جريدرات", "بلدوزرات", "مضخات خرسانة", "أخرى"];

const ic = "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";
const lc = "block text-sm font-bold text-navy";

export function SupplierStepper() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const toggleCity = (city: string) => setSelectedCities(prev => prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]);
  const toggleEquipment = (eq: string) => setSelectedEquipment(prev => prev.includes(eq) ? prev.filter(e => e !== eq) : [...prev, eq]);

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h2 className="mt-5 text-2xl font-black text-navy">تم تقديم طلب التسجيل!</h2>
        <p className="mt-3 leading-7 text-steel">سيراجع فريقنا طلبك وبياناتك خلال <strong className="text-navy">48 ساعة</strong> ويتواصل معك لإتمام الاعتماد.</p>
        <button onClick={() => { setSubmitted(false); setStep(1); setSelectedCities([]); setSelectedEquipment([]); setAgreed(false); }} className="mt-6 inline-flex items-center gap-2 rounded-md border border-navy/15 px-6 py-3 text-sm font-bold text-navy transition hover:border-gold">تسجيل جديد</button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex min-w-max items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black transition ${step >= s.num ? "bg-gold text-navy" : "bg-slate-200 text-slate-500"}`}>
                  {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                </div>
                <p className={`mt-1 text-xs font-bold whitespace-nowrap ${step >= s.num ? "text-navy" : "text-steel"}`}>{s.label}</p>
              </div>
              {i < STEPS.length - 1 && <div className={`mx-3 h-1 w-12 rounded-full transition ${step > s.num ? "bg-gold" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-black text-navy">بيانات الشركة</h2>
          <p className="mt-1 text-sm text-steel">أدخل البيانات الرسمية للشركة أو المؤسسة</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className={lc}>اسم الشركة / المؤسسة *<input className={ic} placeholder="مؤسسة ... للمعدات" /></label>
            <label className={lc}>رقم السجل التجاري *<input className={ic} placeholder="1010XXXXXXX" /></label>
            <label className={lc}>الرقم الضريبي (VAT) *<input className={ic} placeholder="3XXXXXXXXXXXXXXX" /></label>
            <label className={lc}>رقم الجوال للتواصل *<input type="tel" className={ic} placeholder="05xxxxxxxx" /></label>
            <label className={lc}>البريد الإلكتروني *<input type="email" className={ic} placeholder="info@company.sa" /></label>
            <label className={lc}>المدينة الرئيسية *<select className={ic}><option value="">اختر</option>{CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></label>
            <div className="md:col-span-2"><label className={lc}>عنوان المقر الرئيسي *<input className={ic} placeholder="الحي، الشارع، المبنى" /></label></div>
            <div className="md:col-span-2"><label className={lc}>اسم مسؤول التواصل<input className={ic} placeholder="الاسم الكامل" /></label></div>
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">التالي <ChevronLeft className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-black text-navy">التغطية الجغرافية</h2>
          <p className="mt-1 text-sm text-steel">حدد المدن التي تستطيع تقديم الخدمة فيها</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 md:grid-cols-4">
            {CITIES.map(city => (
              <button key={city} onClick={() => toggleCity(city)} className={`rounded-lg border px-4 py-3 text-sm font-bold transition ${selectedCities.includes(city) ? "border-gold bg-gold/10 text-navy" : "border-slate-200 bg-white text-navy hover:border-gold/40"}`}>
                {city}{selectedCities.includes(city) && <span className="mr-2 text-gold">v</span>}
              </button>
            ))}
          </div>
          {selectedCities.length > 0 && <p className="mt-4 text-sm font-bold text-gold">المدن المختارة: {selectedCities.join(" - ")}</p>}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className={lc}>نطاق التغطية (كم)<input type="number" className={ic} placeholder="مثال: 50" /></label>
            <label className={lc}>ملاحظات التغطية<input className={ic} placeholder="أي تفاصيل إضافية" /></label>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">التالي <ChevronLeft className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-black text-navy">الأسطول والمعدات</h2>
          <p className="mt-1 text-sm text-steel">اختر أنواع المعدات التي تمتلكها</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {EQUIPMENT_TYPES.map(eq => (
              <button key={eq} onClick={() => toggleEquipment(eq)} className={`rounded-lg border px-4 py-3 text-sm font-bold text-right transition ${selectedEquipment.includes(eq) ? "border-gold bg-gold/10 text-navy" : "border-slate-200 bg-white text-navy hover:border-gold/40"}`}>
                {selectedEquipment.includes(eq) && <span className="ml-2 text-gold">v</span>}{eq}
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className={lc}>إجمالي عدد المعدات<input type="number" className={ic} placeholder="مثال: 15" /></label>
            <label className={lc}>حالة المعدات<select className={ic}><option value="">اختر</option><option value="new">جديدة (أقل من 3 سنوات)</option><option value="good">جيدة (3-7 سنوات)</option><option value="mixed">مختلطة</option></select></label>
            <div className="md:col-span-2"><label className={lc}>وصف الأسطول والتفاصيل<textarea className={ic} rows={3} placeholder="اذكر الأنواع والموديلات والأعداد..." /></label></div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <button onClick={() => setStep(4)} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">التالي <ChevronLeft className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-black text-navy">رفع الوثائق</h2>
          <p className="mt-1 text-sm text-steel">ارفع الوثائق المطلوبة لإتمام الاعتماد</p>
          <div className="mt-6 grid gap-5">
            {[{ label: "السجل التجاري (PDF أو صورة) *", required: true }, { label: "وثيقة التأمين على المعدات *", required: true }, { label: "شهادات فحص المعدات", required: false }, { label: "وثائق إضافية (اختياري)", required: false }].map(({ label, required }) => (
              <div key={label}>
                <label className={lc}>{label}<input type="file" required={required} accept=".pdf,.jpg,.jpeg,.png" className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-gold/10 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-navy" /></label>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(3)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <button onClick={() => setStep(5)} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">التالي <ChevronLeft className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-xl font-black text-navy">مراجعة وإرسال</h2>
          <p className="mt-1 text-sm text-steel">راجع بياناتك وأقر بالشروط قبل الإرسال</p>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid gap-3 text-sm">
              {[["المدن المختارة", selectedCities.length > 0 ? selectedCities.join(" - ") : "لم يتم الاختيار"], ["أنواع المعدات", selectedEquipment.length > 0 ? selectedEquipment.join(" - ") : "لم يتم الاختيار"]].map(([label, value]) => (
                <div key={label} className="rounded-md bg-mist p-3"><p className="text-xs font-black text-steel">{label}</p><p className="mt-1 font-bold text-navy">{value}</p></div>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5 text-sm leading-7 text-amber-800">
            <p className="font-black">إقرار وتنبيه</p>
            <p className="mt-2">بإرسال هذا الطلب، تقر بأن جميع البيانات والوثائق المرفقة صحيحة وحقيقية، وتوافق على شروط الانضمام كمورد معتمد في منصة فليت معدات.</p>
          </div>
          <div className="mt-5">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="h-5 w-5 accent-gold" />
              <span className="text-sm font-bold text-navy">أوافق على شروط الانضمام وسياسة المنصة</span>
            </label>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(4)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <button onClick={() => agreed && setSubmitted(true)} disabled={!agreed} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d] disabled:opacity-40">إرسال الطلب<CheckCircle2 className="h-4 w-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

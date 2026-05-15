"use client";

import { useState } from "react";
import { Construction, Truck, Forklift, Gauge, Waves, Factory, Route, Container, Droplets, Mountain, CheckCircle2, ChevronLeft } from "lucide-react";
import { officialWhatsAppLink } from "@/lib/contact";

const CATEGORIES = [
  { id: "cranes", name: "كرينات", icon: Construction },
  { id: "excavators", name: "حفارات", icon: Construction },
  { id: "loaders", name: "شيولات", icon: Construction },
  { id: "trucks", name: "قلابات", icon: Truck },
  { id: "power", name: "مولدات", icon: Gauge },
  { id: "concrete", name: "خرسانة", icon: Factory },
  { id: "road", name: "أسفلت وطرق", icon: Route },
  { id: "waste", name: "مخلفات بناء", icon: Container },
  { id: "water", name: "تنكر ماء", icon: Droplets },
  { id: "generators", name: "ضواغط هواء", icon: Gauge },
  { id: "forklifts", name: "فوركلفت", icon: Forklift },
  { id: "compactors", name: "رصاصة", icon: Mountain },
  { id: "scaffolding", name: "سقالات", icon: Waves },
  { id: "transport", name: "نقل ثقيل", icon: Truck },
  { id: "lifting", name: "رفع ومناولة", icon: Waves },
  { id: "other", name: "أخرى", icon: Construction }
];

const CITIES = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة", "الخبر", "الجبيل", "ينبع", "تبوك", "أبها", "القصيم", "حائل", "أخرى"];
const STEPS = [{ num: 1, label: "نوع المعدة" }, { num: 2, label: "تفاصيل الطلب" }, { num: 3, label: "مستندات" }, { num: 4, label: "تأكيد" }];

type FormData = {
  category: string; customerName: string; company: string; phone: string; city: string;
  address: string; startDate: string; endDate: string; durationType: string;
  quantity: string; requirements: string; urgent: boolean; notes: string;
};

const ic = "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";
const lc = "block text-sm font-bold text-navy";

export function RequestEquipmentForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<FormData>({ category: "", customerName: "", company: "", phone: "", city: "", address: "", startDate: "", endDate: "", durationType: "daily", quantity: "1", requirements: "", urgent: false, notes: "" });
  const set = (key: keyof FormData, value: string | boolean) => setForm(prev => ({ ...prev, [key]: value }));
  const selectedCategory = CATEGORIES.find(c => c.id === form.category);
  const durationLabels: Record<string, string> = { daily: "يومي", weekly: "أسبوعي", monthly: "شهري" };

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-10 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h2 className="mt-5 text-2xl font-black text-navy">تم إرسال طلبك بنجاح!</h2>
        <p className="mt-3 text-steel">سيتواصل معك فريقنا وموردو المعدات خلال <strong className="text-navy">4 ساعات</strong> على الأكثر.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-black text-white transition hover:bg-[#1ebe5d]">إرسال تفاصيل الطلب عبر واتساب</a>
          <button onClick={() => { setSubmitted(false); setStep(1); }} className="inline-flex items-center gap-2 rounded-md border border-navy/15 px-6 py-3 text-sm font-bold text-navy transition hover:border-gold">طلب جديد</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black transition ${step >= s.num ? "bg-gold text-navy" : "bg-slate-200 text-slate-500"}`}>
                  {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
                </div>
                <p className={`mt-1 hidden text-xs font-bold sm:block ${step >= s.num ? "text-navy" : "text-steel"}`}>{s.label}</p>
              </div>
              {i < STEPS.length - 1 && <div className={`mx-2 h-1 flex-1 rounded-full transition ${step > s.num ? "bg-gold" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div>
          <h2 className="text-xl font-black text-navy">اختر نوع المعدة</h2>
          <p className="mt-2 text-sm text-steel">اختر الفئة الأقرب لاحتياجك</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button key={cat.id} onClick={() => set("category", cat.id)} className={`flex flex-col items-center rounded-xl border p-4 text-sm font-bold transition hover:-translate-y-0.5 ${form.category === cat.id ? "border-gold bg-gold/10 text-navy shadow-md" : "border-slate-200 bg-white text-navy hover:border-gold/50 hover:shadow-sm"}`}>
                  <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${form.category === cat.id ? "bg-gold text-navy" : "bg-navy text-gold"}`}><Icon className="h-5 w-5" /></div>
                  {cat.name}
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex justify-end">
            <button onClick={() => form.category && setStep(2)} disabled={!form.category} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d] disabled:opacity-40">
              التالي<ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-xl font-black text-navy">تفاصيل الطلب</h2>
          <p className="mt-1 text-sm text-steel">الفئة المختارة: <strong className="text-gold">{selectedCategory?.name}</strong></p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className={lc}>الاسم الكامل *<input className={ic} value={form.customerName} onChange={e => set("customerName", e.target.value)} placeholder="عبدالله محمد" /></label>
            <label className={lc}>الشركة أو المؤسسة<input className={ic} value={form.company} onChange={e => set("company", e.target.value)} placeholder="اسم الشركة (اختياري)" /></label>
            <label className={lc}>رقم الجوال *<input className={ic} type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="05xxxxxxxx" /></label>
            <label className={lc}>المدينة *
              <select className={ic} value={form.city} onChange={e => set("city", e.target.value)}>
                <option value="">اختر المدينة</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <div className="md:col-span-2"><label className={lc}>عنوان الموقع<input className={ic} value={form.address} onChange={e => set("address", e.target.value)} placeholder="حي / شارع / إحداثيات" /></label></div>
            <label className={lc}>تاريخ البدء *<input className={ic} type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} /></label>
            <label className={lc}>تاريخ الانتهاء<input className={ic} type="date" value={form.endDate} onChange={e => set("endDate", e.target.value)} /></label>
            <label className={lc}>نوع مدة الإيجار
              <select className={ic} value={form.durationType} onChange={e => set("durationType", e.target.value)}>
                <option value="daily">يومي</option><option value="weekly">أسبوعي</option><option value="monthly">شهري</option>
              </select>
            </label>
            <label className={lc}>الكمية المطلوبة<input className={ic} type="number" min="1" value={form.quantity} onChange={e => set("quantity", e.target.value)} /></label>
            <div className="md:col-span-2"><label className={lc}>متطلبات ومواصفات خاصة<textarea className={ic} rows={3} value={form.requirements} onChange={e => set("requirements", e.target.value)} placeholder="صف احتياجاتك بالتفصيل..." /></label></div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <input type="checkbox" checked={form.urgent} onChange={e => set("urgent", e.target.checked)} className="h-5 w-5 accent-gold" />
                <div><p className="font-black text-navy">طلب عاجل</p><p className="text-xs text-steel">أحتاج المعدة خلال 24 ساعة أو أقل</p></div>
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(1)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <button onClick={() => form.customerName && form.phone && form.city && setStep(3)} disabled={!form.customerName || !form.phone || !form.city} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d] disabled:opacity-40">
              التالي<ChevronLeft className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-black text-navy">رفع مستندات (اختياري)</h2>
          <p className="mt-2 text-sm text-steel">يمكنك تخطي هذه الخطوة وإرسال المستندات لاحقاً عبر واتساب</p>
          <div className="mt-6 grid gap-4">
            <label className={lc}>صور موقع المشروع<input type="file" accept="image/*" multiple className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-gold/10 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-navy" /></label>
            <label className={lc}>مستندات المشروع (PDF)<input type="file" accept=".pdf,.doc,.docx" className="mt-2 block w-full text-sm text-slate-500 file:mr-4 file:rounded-md file:border-0 file:bg-gold/10 file:px-4 file:py-2.5 file:text-sm file:font-bold file:text-navy" /></label>
            <label className={lc}>ملاحظات إضافية<textarea className={ic} rows={3} value={form.notes} onChange={e => set("notes", e.target.value)} placeholder="أي معلومات إضافية..." /></label>
          </div>
          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep(2)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <button onClick={() => setStep(4)} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">التالي<ChevronLeft className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-xl font-black text-navy">مراجعة وإرسال الطلب</h2>
          <p className="mt-2 text-sm text-steel">تأكد من صحة البيانات قبل الإرسال</p>
          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              {[["نوع المعدة", selectedCategory?.name ?? "-"], ["الاسم", form.customerName], ["الشركة", form.company || "لا يوجد"], ["الجوال", form.phone], ["المدينة", form.city], ["تاريخ البدء", form.startDate], ["نوع الإيجار", durationLabels[form.durationType] ?? form.durationType], ["الكمية", form.quantity], ["طلب عاجل", form.urgent ? "نعم" : "لا"]].map(([label, value]) => (
                <div key={label} className="flex justify-between rounded-md bg-mist px-4 py-2.5">
                  <span className="text-steel">{label}</span><strong className="text-navy">{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm">
            <p className="font-black text-navy">وقت الاستجابة المتوقع</p>
            <p className="mt-1 text-steel">سيتواصل معك موردو المعدات المعتمدون خلال <strong>4 ساعات</strong> من استلام طلبك</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <button onClick={() => setStep(3)} className="rounded-md border border-slate-200 px-5 py-2.5 text-sm font-bold text-navy transition hover:border-gold">السابق</button>
            <div className="flex gap-3">
              <a href={officialWhatsAppLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-black text-white transition hover:bg-[#1ebe5d]">إرسال عبر واتساب</a>
              <button onClick={() => setSubmitted(true)} className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-2.5 text-sm font-black text-navy transition hover:bg-[#d6aa4d]">إرسال الطلب<CheckCircle2 className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

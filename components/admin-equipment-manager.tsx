"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X, Upload, Truck, Wrench } from "lucide-react";

type EquipmentEntry = {
  id: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  city: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  operatorIncluded: boolean;
  transportIncluded: boolean;
  capacity: string;
  description: string;
  imageUrl: string;
  specs: { key: string; value: string }[];
  status: "معتمد ومتاح" | "قيد المراجعة" | "موقوف";
  supplier: string;
  createdAt: string;
};

type ServiceEntry = {
  id: string;
  name: string;
  category: string;
  description: string;
  coverageAreas: string;
  priceFrom: number;
  imageUrl: string;
  status: "نشط" | "موقوف";
  createdAt: string;
};

const EQUIPMENT_CATEGORIES = [
  "كرينات", "رافعات بوم", "رافعات شوكية", "بوبكات", "شيولات",
  "حفارات", "سطحات", "مولدات", "كمبروسرات", "مان لفت",
  "معدات نقل ثقيل", "قلابات", "خلاطات خرسانة", "ضخ خرسانة", "رصاصات أسفلت"
];

const SERVICE_CATEGORIES = [
  "أعمال الخرسانة", "ردم وتجهيز مواقع", "مخلفات بناء وهدم",
  "رفع ومناولة", "نقل ثقيل", "أعمال الأسفلت", "تأجير معدات"
];

const CITIES = [
  "الرياض", "جدة", "الدمام", "الخبر", "مكة المكرمة",
  "المدينة المنورة", "الجبيل", "ينبع", "تبوك", "أبها", "القصيم", "حائل"
];

const EMPTY_EQ = {
  category: "", brand: "", model: "", year: new Date().getFullYear(),
  city: "", dailyPrice: 0, weeklyPrice: 0, monthlyPrice: 0,
  operatorIncluded: false, transportIncluded: false,
  capacity: "", description: "", imageUrl: "", supplier: "",
  specs: [] as { key: string; value: string }[],
  status: "قيد المراجعة" as "معتمد ومتاح" | "قيد المراجعة" | "موقوف"
};

const EMPTY_SVC = {
  name: "", category: "", description: "",
  coverageAreas: "", priceFrom: 0, imageUrl: "", status: "نشط" as "نشط" | "موقوف"
};

export function AdminEquipmentManager() {
  const [equipment, setEquipment] = useState<EquipmentEntry[]>([]);
  const [services, setServices]   = useState<ServiceEntry[]>([]);
  const [tab, setTab]             = useState<"equipment" | "services">("equipment");
  const [showEqForm, setShowEqForm]   = useState(false);
  const [showSvcForm, setShowSvcForm] = useState(false);
  const [eqForm, setEqForm]   = useState<Omit<EquipmentEntry, "id" | "createdAt">>({ ...EMPTY_EQ });
  const [svcForm, setSvcForm] = useState<Omit<ServiceEntry, "id" | "createdAt">>({ ...EMPTY_SVC });

  const imgRef    = useRef<HTMLInputElement>(null);
  const svcImgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const eq = localStorage.getItem("fm_equipment");
      const sv = localStorage.getItem("fm_services");
      if (eq) setEquipment(JSON.parse(eq));
      if (sv) setServices(JSON.parse(sv));
    } catch {}
  }, []);

  const saveEq = (items: EquipmentEntry[]) => {
    setEquipment(items);
    localStorage.setItem("fm_equipment", JSON.stringify(items));
  };
  const saveSvc = (items: ServiceEntry[]) => {
    setServices(items);
    localStorage.setItem("fm_services", JSON.stringify(items));
  };

  const toBase64 = (file: File, cb: (url: string) => void) => {
    const r = new FileReader();
    r.onload = e => cb(e.target?.result as string);
    r.readAsDataURL(file);
  };

  const addSpec    = () => setEqForm(f => ({ ...f, specs: [...f.specs, { key: "", value: "" }] }));
  const removeSpec = (i: number) => setEqForm(f => ({ ...f, specs: f.specs.filter((_, idx) => idx !== i) }));
  const updateSpec = (i: number, field: "key" | "value", val: string) =>
    setEqForm(f => ({ ...f, specs: f.specs.map((s, idx) => idx === i ? { ...s, [field]: val } : s) }));

  const submitEq = (e: React.FormEvent) => {
    e.preventDefault();
    saveEq([{ ...eqForm, id: `EQ-${Date.now()}`, createdAt: new Date().toLocaleDateString("ar-SA") }, ...equipment]);
    setShowEqForm(false);
    setEqForm({ ...EMPTY_EQ, specs: [] });
  };

  const submitSvc = (e: React.FormEvent) => {
    e.preventDefault();
    saveSvc([{ ...svcForm, id: `SVC-${Date.now()}`, createdAt: new Date().toLocaleDateString("ar-SA") }, ...services]);
    setShowSvcForm(false);
    setSvcForm({ ...EMPTY_SVC });
  };

  const toggleEqStatus = (id: string) =>
    saveEq(equipment.map(e => e.id === id ? { ...e, status: e.status === "معتمد ومتاح" ? "موقوف" : "معتمد ومتاح" } : e));
  const toggleSvcStatus = (id: string) =>
    saveSvc(services.map(s => s.id === id ? { ...s, status: s.status === "نشط" ? "موقوف" : "نشط" } : s));

  const deleteEq  = (id: string) => saveEq(equipment.filter(e => e.id !== id));
  const deleteSvc = (id: string) => saveSvc(services.filter(s => s.id !== id));

  const statusColor = (s: string) =>
    s === "معتمد ومتاح" || s === "نشط"
      ? "bg-emerald-50 text-emerald-700"
      : s === "موقوف"
      ? "bg-red-50 text-red-700"
      : "bg-amber-50 text-amber-700";

  return (
    <div className="grid gap-6">

      {/* ── Tabs ─────────────────────────────────────────────────── */}
      <div className="flex gap-3 border-b border-slate-200 pb-1">
        {(["equipment", "services"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-t-lg px-6 py-2.5 text-sm font-black transition ${
              tab === t ? "bg-navy text-white" : "text-steel hover:text-navy"
            }`}
          >
            {t === "equipment" ? `المعدات (${equipment.length})` : `الخدمات (${services.length})`}
          </button>
        ))}
      </div>

      {/* ══════════════════════ EQUIPMENT TAB ══════════════════════ */}
      {tab === "equipment" && (
        <div className="grid gap-5">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-navy">إدارة المعدات</h2>
              <p className="text-sm text-steel">{equipment.length} معدة مسجلة</p>
            </div>
            <button
              onClick={() => { setShowEqForm(v => !v); setShowSvcForm(false); }}
              className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-black text-navy transition hover:bg-gold/90"
            >
              <Plus className="h-4 w-4" />
              إضافة معدة
            </button>
          </div>

          {/* ── Equipment Form ──────────────────────────────────── */}
          {showEqForm && (
            <form onSubmit={submitEq} className="rounded-xl border-2 border-gold/40 bg-white p-6 shadow-lg">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-black text-navy">نموذج إضافة معدة جديدة</h3>
                <button type="button" onClick={() => setShowEqForm(false)}><X className="h-5 w-5 text-steel" /></button>
              </div>

              {/* ─ Basic fields ─ */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Category */}
                <div>
                  <label className="field-label">فئة المعدة *</label>
                  <select required value={eqForm.category} onChange={e => setEqForm(f => ({ ...f, category: e.target.value }))} className="field-input">
                    <option value="">اختر الفئة</option>
                    {EQUIPMENT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {/* Brand */}
                <div>
                  <label className="field-label">الماركة *</label>
                  <input required type="text" placeholder="مثال: CAT, Liebherr" value={eqForm.brand}
                    onChange={e => setEqForm(f => ({ ...f, brand: e.target.value }))} className="field-input" />
                </div>
                {/* Model */}
                <div>
                  <label className="field-label">الموديل *</label>
                  <input required type="text" placeholder="مثال: 966M" value={eqForm.model}
                    onChange={e => setEqForm(f => ({ ...f, model: e.target.value }))} className="field-input" />
                </div>
                {/* Year */}
                <div>
                  <label className="field-label">سنة الصنع</label>
                  <input type="number" min="1990" max="2030" value={eqForm.year}
                    onChange={e => setEqForm(f => ({ ...f, year: +e.target.value }))} className="field-input" />
                </div>
                {/* City */}
                <div>
                  <label className="field-label">المدينة *</label>
                  <select required value={eqForm.city} onChange={e => setEqForm(f => ({ ...f, city: e.target.value }))} className="field-input">
                    <option value="">اختر المدينة</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                {/* Capacity */}
                <div>
                  <label className="field-label">الطاقة / الحمولة</label>
                  <input type="text" placeholder="مثال: 50 طن، 500 KVA" value={eqForm.capacity}
                    onChange={e => setEqForm(f => ({ ...f, capacity: e.target.value }))} className="field-input" />
                </div>
                {/* Daily price */}
                <div>
                  <label className="field-label">السعر اليومي (ر.س) *</label>
                  <input required type="number" min="0" placeholder="0" value={eqForm.dailyPrice || ""}
                    onChange={e => setEqForm(f => ({ ...f, dailyPrice: +e.target.value }))} className="field-input" />
                </div>
                {/* Weekly */}
                <div>
                  <label className="field-label">السعر الأسبوعي (ر.س)</label>
                  <input type="number" min="0" placeholder="0" value={eqForm.weeklyPrice || ""}
                    onChange={e => setEqForm(f => ({ ...f, weeklyPrice: +e.target.value }))} className="field-input" />
                </div>
                {/* Monthly */}
                <div>
                  <label className="field-label">السعر الشهري (ر.س)</label>
                  <input type="number" min="0" placeholder="0" value={eqForm.monthlyPrice || ""}
                    onChange={e => setEqForm(f => ({ ...f, monthlyPrice: +e.target.value }))} className="field-input" />
                </div>
                {/* Supplier */}
                <div>
                  <label className="field-label">اسم المزود / الشركة</label>
                  <input type="text" placeholder="اسم الشركة أو المؤسسة" value={eqForm.supplier}
                    onChange={e => setEqForm(f => ({ ...f, supplier: e.target.value }))} className="field-input" />
                </div>
                {/* Status */}
                <div>
                  <label className="field-label">الحالة</label>
                  <select value={eqForm.status} onChange={e => setEqForm(f => ({ ...f, status: e.target.value as "معتمد ومتاح" | "قيد المراجعة" | "موقوف" }))} className="field-input">
                    <option value="معتمد ومتاح">معتمد ومتاح</option>
                    <option value="قيد المراجعة">قيد المراجعة</option>
                    <option value="موقوف">موقوف</option>
                  </select>
                </div>
              </div>

              {/* ─ Checkboxes ─ */}
              <div className="mt-4 flex flex-wrap gap-5">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={eqForm.operatorIncluded}
                    onChange={e => setEqForm(f => ({ ...f, operatorIncluded: e.target.checked }))}
                    className="h-4 w-4 rounded accent-gold" />
                  <span className="text-sm font-bold text-navy">يشمل مشغل</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={eqForm.transportIncluded}
                    onChange={e => setEqForm(f => ({ ...f, transportIncluded: e.target.checked }))}
                    className="h-4 w-4 rounded accent-gold" />
                  <span className="text-sm font-bold text-navy">يشمل نقل</span>
                </label>
              </div>

              {/* ─ Description ─ */}
              <div className="mt-4">
                <label className="field-label">الوصف</label>
                <textarea rows={3} placeholder="وصف تفصيلي للمعدة، حالتها، مميزاتها..."
                  value={eqForm.description} onChange={e => setEqForm(f => ({ ...f, description: e.target.value }))}
                  className="field-input resize-none" />
              </div>

              {/* ─ Specifications ─ */}
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-black text-navy">المواصفات التفصيلية</label>
                  <button type="button" onClick={addSpec}
                    className="flex items-center gap-1 text-xs font-black text-gold transition hover:text-navy">
                    <Plus className="h-3.5 w-3.5" /> إضافة مواصفة
                  </button>
                </div>
                <div className="grid gap-2">
                  {eqForm.specs.map((spec, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="text" placeholder="اسم المواصفة" value={spec.key}
                        onChange={e => updateSpec(i, "key", e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                      <input type="text" placeholder="القيمة" value={spec.value}
                        onChange={e => updateSpec(i, "value", e.target.value)}
                        className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                      <button type="button" onClick={() => removeSpec(i)} className="text-red-400 hover:text-red-600">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─ Image Upload ─ */}
              <div className="mt-4">
                <label className="field-label mb-1.5 block">صورة المعدة</label>
                <div
                  onClick={() => imgRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-gold hover:bg-gold/5"
                >
                  {eqForm.imageUrl
                    ? <img src={eqForm.imageUrl} alt="preview" className="h-36 w-full rounded-lg object-contain" />
                    : <>
                        <Upload className="h-8 w-8 text-slate-400" />
                        <p className="text-sm font-bold text-steel">اضغط لرفع صورة المعدة</p>
                        <p className="text-xs text-slate-400">PNG, JPG — حتى 5MB</p>
                      </>
                  }
                </div>
                <input ref={imgRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && toBase64(e.target.files[0], url => setEqForm(f => ({ ...f, imageUrl: url })))} />
              </div>

              {/* ─ Actions ─ */}
              <div className="mt-6 flex gap-3">
                <button type="submit" className="flex-1 rounded-lg bg-navy py-3 text-sm font-black text-white transition hover:bg-navy/90">
                  حفظ المعدة ✓
                </button>
                <button type="button" onClick={() => setShowEqForm(false)}
                  className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-bold text-steel transition hover:bg-mist">
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {/* ── Equipment Cards ─────────────────────────────────── */}
          {equipment.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-14 text-center">
              <Truck className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 font-bold text-steel">لا توجد معدات مضافة بعد</p>
              <p className="mt-1 text-sm text-slate-400">اضغط "إضافة معدة" لإدراج أول معدة</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {equipment.map(eq => (
                <div key={eq.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
                  {eq.imageUrl
                    ? <img src={eq.imageUrl} alt={eq.model} className="h-44 w-full object-cover" />
                    : <div className="flex h-44 items-center justify-center bg-mist"><Truck className="h-14 w-14 text-slate-300" /></div>
                  }
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-black text-navy">{eq.brand} {eq.model}</p>
                        <p className="text-sm text-steel">{eq.category} · {eq.city} · {eq.year}</p>
                        {eq.supplier && <p className="text-xs text-steel/70">{eq.supplier}</p>}
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${statusColor(eq.status)}`}>
                        {eq.status}
                      </span>
                    </div>

                    {eq.capacity && <p className="mt-1.5 text-xs text-steel">الطاقة: <strong>{eq.capacity}</strong></p>}

                    <div className="mt-2 flex flex-wrap gap-2">
                      {eq.operatorIncluded && <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-xs font-bold text-navy">مع مشغل</span>}
                      {eq.transportIncluded && <span className="rounded-full bg-navy/8 px-2.5 py-0.5 text-xs font-bold text-navy">مع نقل</span>}
                    </div>

                    <p className="mt-2 text-xl font-black text-gold">{eq.dailyPrice.toLocaleString("ar-SA")} <span className="text-sm font-bold">ر.س/يوم</span></p>
                    {(eq.weeklyPrice > 0 || eq.monthlyPrice > 0) && (
                      <div className="mt-0.5 flex gap-3 text-xs text-steel">
                        {eq.weeklyPrice > 0 && <span>أسبوعي: {eq.weeklyPrice.toLocaleString("ar-SA")} ر.س</span>}
                        {eq.monthlyPrice > 0 && <span>شهري: {eq.monthlyPrice.toLocaleString("ar-SA")} ر.س</span>}
                      </div>
                    )}

                    {eq.specs.length > 0 && (
                      <div className="mt-3 grid gap-1 border-t border-slate-100 pt-3">
                        {eq.specs.slice(0, 4).map((s, i) => (
                          <p key={i} className="text-xs text-steel">{s.key}: <strong className="text-navy">{s.value}</strong></p>
                        ))}
                      </div>
                    )}

                    {eq.description && <p className="mt-2 line-clamp-2 text-xs leading-5 text-steel">{eq.description}</p>}

                    <p className="mt-3 text-xs text-slate-400">{eq.id} · أُضيف {eq.createdAt}</p>

                    <div className="mt-3 flex gap-2">
                      <button onClick={() => toggleEqStatus(eq.id)}
                        className={`flex-1 rounded-lg py-2 text-xs font-black transition ${
                          eq.status === "معتمد ومتاح"
                            ? "bg-red-50 text-red-700 hover:bg-red-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}>
                        {eq.status === "معتمد ومتاح" ? "إيقاف" : "تفعيل"}
                      </button>
                      <button onClick={() => deleteEq(eq.id)}
                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════ SERVICES TAB ══════════════════════ */}
      {tab === "services" && (
        <div className="grid gap-5">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-navy">إدارة الخدمات</h2>
              <p className="text-sm text-steel">{services.length} خدمة مسجلة</p>
            </div>
            <button
              onClick={() => { setShowSvcForm(v => !v); setShowEqForm(false); }}
              className="flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-sm font-black text-navy transition hover:bg-gold/90"
            >
              <Plus className="h-4 w-4" />
              إضافة خدمة
            </button>
          </div>

          {/* ── Service Form ──────────────────────────────────────── */}
          {showSvcForm && (
            <form onSubmit={submitSvc} className="rounded-xl border-2 border-gold/40 bg-white p-6 shadow-lg">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-black text-navy">نموذج إضافة خدمة جديدة</h3>
                <button type="button" onClick={() => setShowSvcForm(false)}><X className="h-5 w-5 text-steel" /></button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">اسم الخدمة *</label>
                  <input required type="text" placeholder="مثال: خدمات الخرسانة الجاهزة" value={svcForm.name}
                    onChange={e => setSvcForm(f => ({ ...f, name: e.target.value }))} className="field-input" />
                </div>
                <div>
                  <label className="field-label">فئة الخدمة *</label>
                  <select required value={svcForm.category} onChange={e => setSvcForm(f => ({ ...f, category: e.target.value }))} className="field-input">
                    <option value="">اختر الفئة</option>
                    {SERVICE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="field-label">السعر ابتداءً من (ر.س)</label>
                  <input type="number" min="0" placeholder="0" value={svcForm.priceFrom || ""}
                    onChange={e => setSvcForm(f => ({ ...f, priceFrom: +e.target.value }))} className="field-input" />
                </div>
                <div>
                  <label className="field-label">مناطق التغطية</label>
                  <input type="text" placeholder="مثال: الرياض، جدة، الدمام" value={svcForm.coverageAreas}
                    onChange={e => setSvcForm(f => ({ ...f, coverageAreas: e.target.value }))} className="field-input" />
                </div>
                <div>
                  <label className="field-label">الحالة</label>
                  <select value={svcForm.status} onChange={e => setSvcForm(f => ({ ...f, status: e.target.value as "نشط" | "موقوف" }))} className="field-input">
                    <option value="نشط">نشط</option>
                    <option value="موقوف">موقوف</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="field-label">وصف الخدمة</label>
                <textarea rows={3} placeholder="وصف تفصيلي للخدمة وما تشمله..."
                  value={svcForm.description} onChange={e => setSvcForm(f => ({ ...f, description: e.target.value }))}
                  className="field-input resize-none" />
              </div>

              <div className="mt-4">
                <label className="field-label mb-1.5 block">صورة الخدمة</label>
                <div
                  onClick={() => svcImgRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 p-8 transition hover:border-gold hover:bg-gold/5"
                >
                  {svcForm.imageUrl
                    ? <img src={svcForm.imageUrl} alt="preview" className="h-36 w-full rounded-lg object-contain" />
                    : <>
                        <Upload className="h-8 w-8 text-slate-400" />
                        <p className="text-sm font-bold text-steel">اضغط لرفع صورة الخدمة</p>
                        <p className="text-xs text-slate-400">PNG, JPG — حتى 5MB</p>
                      </>
                  }
                </div>
                <input ref={svcImgRef} type="file" accept="image/*" className="hidden"
                  onChange={e => e.target.files?.[0] && toBase64(e.target.files[0], url => setSvcForm(f => ({ ...f, imageUrl: url })))} />
              </div>

              <div className="mt-6 flex gap-3">
                <button type="submit" className="flex-1 rounded-lg bg-navy py-3 text-sm font-black text-white transition hover:bg-navy/90">
                  حفظ الخدمة ✓
                </button>
                <button type="button" onClick={() => setShowSvcForm(false)}
                  className="rounded-lg border border-slate-200 px-6 py-3 text-sm font-bold text-steel transition hover:bg-mist">
                  إلغاء
                </button>
              </div>
            </form>
          )}

          {/* ── Services Cards ───────────────────────────────────── */}
          {services.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-14 text-center">
              <Wrench className="mx-auto h-10 w-10 text-slate-300" />
              <p className="mt-3 font-bold text-steel">لا توجد خدمات مضافة بعد</p>
              <p className="mt-1 text-sm text-slate-400">اضغط "إضافة خدمة" لإدراج أول خدمة</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {services.map(svc => (
                <div key={svc.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
                  {svc.imageUrl
                    ? <img src={svc.imageUrl} alt={svc.name} className="h-44 w-full object-cover" />
                    : <div className="flex h-44 items-center justify-center bg-mist"><Wrench className="h-14 w-14 text-slate-300" /></div>
                  }
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-black text-navy">{svc.name}</p>
                        <p className="text-sm text-steel">{svc.category}</p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-black ${statusColor(svc.status)}`}>
                        {svc.status}
                      </span>
                    </div>
                    {svc.coverageAreas && <p className="mt-1.5 text-xs text-steel">التغطية: <strong>{svc.coverageAreas}</strong></p>}
                    {svc.priceFrom > 0 && (
                      <p className="mt-2 text-xl font-black text-gold">من {svc.priceFrom.toLocaleString("ar-SA")} <span className="text-sm font-bold">ر.س</span></p>
                    )}
                    {svc.description && <p className="mt-2 line-clamp-2 text-xs leading-5 text-steel">{svc.description}</p>}
                    <p className="mt-3 text-xs text-slate-400">{svc.id} · أُضيف {svc.createdAt}</p>
                    <div className="mt-3 flex gap-2">
                      <button onClick={() => toggleSvcStatus(svc.id)}
                        className={`flex-1 rounded-lg py-2 text-xs font-black transition ${
                          svc.status === "نشط"
                            ? "bg-red-50 text-red-700 hover:bg-red-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}>
                        {svc.status === "نشط" ? "إيقاف" : "تفعيل"}
                      </button>
                      <button onClick={() => deleteSvc(svc.id)}
                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50">
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Inline Tailwind helpers ── */}
      <style>{`
        .field-label  { display:block; margin-bottom:6px; font-size:.8125rem; font-weight:700; color:#122033; }
        .field-input  { width:100%; border-radius:.5rem; border:1px solid #e2e8f0; padding:.625rem .75rem; font-size:.875rem; }
        .field-input:focus { outline:none; border-color:#C9A84C; box-shadow:0 0 0 1px #C9A84C; }
      `}</style>
    </div>
  );
}

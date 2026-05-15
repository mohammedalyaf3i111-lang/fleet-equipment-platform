"use client";

import { useId, useMemo, useState } from "react";
import { MapPin, Plus, Trash2 } from "lucide-react";
import { saudiMvpCities } from "@/constants/cities";

type SupplierEquipmentRow = {
  id: string;
  equipmentType: string;
  spec: string;
  quantity: number;
  movementType: string;
  operatorIncluded: "YES" | "NO";
  city: string;
  notes: string;
};

const equipmentTypeOptions = [
  "شيول",
  "كرين",
  "حفار / بوكلين",
  "رافعة شوكية",
  "بوبكات",
  "بوم لفت",
  "مان لفت",
  "سطحه / لوبد",
  "قلاب",
  "مولد",
  "كمبروسر",
  "تنكر ماء",
  "تنكر ديزل",
  "مضخة خرسانة",
  "خلاطة خرسانة",
  "معدات طرق",
  "أخرى"
];

const exampleItems = [
  "1 شيول",
  "6 كرين 20 طن",
  "2 كرين 100 طن",
  "6 حفارات جنزير أو كفرات",
  "مولدات 500 KVA"
];

function createEquipmentRow(): SupplierEquipmentRow {
  return {
    id: crypto.randomUUID(),
    equipmentType: "",
    spec: "",
    quantity: 1,
    movementType: "",
    operatorIncluded: "NO",
    city: "",
    notes: ""
  };
}

export function SupplierEquipmentListFields() {
  const cityListId = useId();
  const [rows, setRows] = useState<SupplierEquipmentRow[]>([]);

  const validRows = useMemo(
    () =>
      rows
        .filter((row) => row.equipmentType.trim() && Number(row.quantity) > 0)
        .map(({ id: _id, ...row }) => row),
    [rows]
  );

  const updateRow = <K extends keyof SupplierEquipmentRow>(id: string, key: K, value: SupplierEquipmentRow[K]) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, [key]: value } : row)));
  };

  return (
    <section className="md:col-span-2 rounded-lg border border-gold/25 bg-gradient-to-br from-white to-amber-50/40 p-4 shadow-soft">
      <input type="hidden" name="preliminaryEquipmentList" value={JSON.stringify(validRows)} />
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-black text-navy">معدات المزود المتوفرة</h3>
          <p className="mt-1 text-sm leading-7 text-steel">
            أضف ملخصًا سريعًا لأنواع وعدد المعدات التي تملكها أو تديرها ليتمكن فريق الإدارة من مراجعة القدرة التشغيلية قبل الاعتماد.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRows((current) => [...current, createEquipmentRow()])}
          className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-black text-navy shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <Plus className="h-4 w-4" />
          إضافة معدة
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        {rows.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-steel">
            لم تتم إضافة معدات بعد. اضغط زر إضافة معدة لتسجيل الأنواع الرئيسية المتوفرة لدى المزود.
          </div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 md:grid-cols-2 xl:grid-cols-6">
              <label className="block text-sm font-bold text-navy">
                نوع المعدة
                <select
                  required
                  value={row.equipmentType}
                  onChange={(event) => updateRow(row.id, "equipmentType", event.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm"
                >
                  <option value="">اختر نوع المعدة</option>
                  {equipmentTypeOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-bold text-navy">
                السعة / الموديل / المقاس
                <input
                  value={row.spec}
                  onChange={(event) => updateRow(row.id, "spec", event.target.value)}
                  placeholder="مثال: كرين 20 طن"
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm"
                />
              </label>

              <label className="block text-sm font-bold text-navy">
                عدد الوحدات
                <input
                  required
                  min={1}
                  type="number"
                  value={row.quantity}
                  onChange={(event) => updateRow(row.id, "quantity", Number(event.target.value))}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm"
                />
              </label>

              <label className="block text-sm font-bold text-navy">
                نوع الحركة إن وجدت
                <input
                  value={row.movementType}
                  onChange={(event) => updateRow(row.id, "movementType", event.target.value)}
                  placeholder="جنزير / كفرات / كهربائي"
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm"
                />
              </label>

              <label className="block text-sm font-bold text-navy">
                مع مشغل؟
                <select
                  value={row.operatorIncluded}
                  onChange={(event) => updateRow(row.id, "operatorIncluded", event.target.value as "YES" | "NO")}
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm"
                >
                  <option value="YES">نعم</option>
                  <option value="NO">لا</option>
                </select>
              </label>

              <label className="block text-sm font-bold text-navy">
                المدينة الرئيسية
                <span className="relative block">
                  <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden />
                  <input
                    list={cityListId}
                    value={row.city}
                    onChange={(event) => updateRow(row.id, "city", event.target.value)}
                    placeholder="اختر المدينة"
                    className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 pr-10 text-sm"
                    autoComplete="off"
                  />
                </span>
              </label>

              <label className="block text-sm font-bold text-navy md:col-span-2 xl:col-span-5">
                ملاحظات اختيارية
                <input
                  value={row.notes}
                  onChange={(event) => updateRow(row.id, "notes", event.target.value)}
                  placeholder="أي تفاصيل تشغيلية أو توفر موسمي"
                  className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm"
                />
              </label>

              <button
                type="button"
                onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-red-200 px-3 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 xl:self-end"
                aria-label="حذف صف المعدة"
              >
                <Trash2 className="h-4 w-4" />
                حذف
              </button>
            </div>
          ))
        )}
      </div>

      <datalist id={cityListId}>
        {saudiMvpCities.map((city) => (
          <option key={city.slug} value={city.arabicName} />
        ))}
      </datalist>

      <div className="mt-4 rounded-lg bg-navy/5 p-3">
        <p className="text-sm font-black text-navy">أمثلة سريعة</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {exampleItems.map((example) => (
            <span key={example} className="rounded-full border border-gold/30 bg-white px-3 py-1 text-xs font-bold text-steel">
              {example}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

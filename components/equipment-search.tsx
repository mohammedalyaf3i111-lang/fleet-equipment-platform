"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { CitySelectField } from "@/components/city-fields";
import { getEquipmentFilterSchema, type EquipmentFilterField } from "@/constants/equipmentFilterSchemas";
import type { EquipmentCategoryDefinition, SpecField } from "@/lib/equipment-catalog";

type SearchItem = {
  id: string;
  category: string;
  brand: string;
  model: string;
  city: string;
  status: string;
  dailyPrice: number;
  supplier: string;
};

type EquipmentSearchProps = {
  category?: EquipmentCategoryDefinition;
  categorySlug?: string;
  items: SearchItem[];
  allTypes: { slug: string; arabicName: string }[];
  fieldSchema: SpecField[];
};

const commonFilterClass =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";

function DynamicFilterControl({
  field,
  city,
  maxPrice,
  onCityChange,
  onMaxPriceChange,
  onBooleanChange
}: {
  field: EquipmentFilterField;
  city: string;
  maxPrice: string;
  onCityChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onBooleanChange: (key: string, value: boolean) => void;
}) {
  if (field.type === "city") {
    return (
      <CitySelectField
        label={field.label}
        required={false}
        value={city}
        onValueChange={onCityChange}
        placeholder="كل المدن"
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <label className="flex min-h-[48px] items-center gap-2 rounded-md bg-slate-50 px-3 text-sm font-bold text-navy">
        <input type="checkbox" name={field.key} onChange={(event) => onBooleanChange(field.key, event.target.checked)} />
        {field.label}
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="text-sm font-bold text-navy">
        {field.label}
        <select name={field.key} className={commonFilterClass}>
          <option value="">اختر</option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }

  const isPriceField = field.key.toLowerCase().includes("price") || field.key.toLowerCase().includes("rate");

  return (
    <label className="text-sm font-bold text-navy">
      {field.label}
      <input
        name={field.key}
        type={field.type === "number" ? "number" : "text"}
        value={isPriceField ? maxPrice : undefined}
        onChange={isPriceField ? (event) => onMaxPriceChange(event.target.value) : undefined}
        placeholder={field.placeholder ?? (field.unit ? `بالـ ${field.unit}` : field.label)}
        className={commonFilterClass}
      />
    </label>
  );
}

export function EquipmentSearch({ category, categorySlug, items, allTypes }: EquipmentSearchProps) {
  const schema = getEquipmentFilterSchema(categorySlug ?? category?.slug);
  const typeOptions = schema?.typeOptions ?? (category ? category.types : allTypes);
  const [selectedTypeSlug, setSelectedTypeSlug] = useState(schema?.defaultTypeSlug ?? typeOptions[0]?.slug ?? "");
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [booleanFilters, setBooleanFilters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setSelectedTypeSlug(schema?.defaultTypeSlug ?? typeOptions[0]?.slug ?? "");
    setSearched(false);
    setCity("");
    setMaxPrice("");
    setBooleanFilters({});
  }, [schema?.defaultTypeSlug, typeOptions]);

  const selectedType = typeOptions.find((type) => type.slug === selectedTypeSlug) ?? typeOptions[0];
  const dynamicFields = schema?.fields ?? [];
  const availableNow = Boolean(booleanFilters.availableNow);
  const transportAvailable = Boolean(booleanFilters.transportAvailable);
  const withOperator = Boolean(booleanFilters.withOperator || booleanFilters.driverIncluded);

  const results = useMemo(() => {
    const keywords = schema?.resultKeywords ?? (category ? [category.arabicName] : []);

    return items
      .filter((item) => {
        if (!keywords.length) return true;
        const haystack = `${item.category} ${item.brand} ${item.model}`;
        return keywords.some((keyword) => haystack.includes(keyword));
      })
      .map((item, index) => ({
        ...item,
        image: "/a_wide_cinematic_construction_site_scene_at_sunse.png",
        typeAndCapacity: selectedType?.arabicName ?? `${item.category} · ${item.model}`,
        operatorIncluded: index % 2 === 0 || category?.slug === "cranes" || withOperator,
        transportIncluded: index % 3 !== 1 || transportAvailable,
        availableNow: item.status.includes("متاح") || item.status.includes("معتمد")
      }))
      .filter((item) => (!city ? true : item.city === city))
      .filter((item) => (!maxPrice ? true : item.dailyPrice <= Number(maxPrice)))
      .filter((item) => (!availableNow ? true : item.availableNow))
      .filter((item) => (!transportAvailable ? true : item.transportIncluded))
      .filter((item) => (!withOperator ? true : item.operatorIncluded));
  }, [availableNow, category, city, items, maxPrice, schema, selectedType, transportAvailable, withOperator]);

  const handleSearch = () => {
    setIsLoading(true);
    setSearched(false);
    window.setTimeout(() => {
      setSearched(true);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        className="mb-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4"
      >
        <label className="text-sm font-bold text-navy">
          {schema?.typeLabel ?? "نوع المعدة"}
          <select value={selectedTypeSlug} onChange={(event) => setSelectedTypeSlug(event.target.value)} name="equipmentType" className={commonFilterClass}>
            {!schema && !category ? <option value="">كل الأنواع</option> : null}
            {typeOptions.map((type) => (
              <option key={type.slug} value={type.slug}>
                {type.arabicName}
              </option>
            ))}
          </select>
        </label>

        {dynamicFields.map((field) => (
          <DynamicFilterControl
            key={field.key}
            field={field}
            city={city}
            maxPrice={maxPrice}
            onCityChange={setCity}
            onMaxPriceChange={setMaxPrice}
            onBooleanChange={(key, value) => setBooleanFilters((current) => ({ ...current, [key]: value }))}
          />
        ))}

        <div className="sm:col-span-2 lg:col-span-4">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-6 py-4 text-base font-black text-white shadow-lg shadow-navy/20 transition hover:-translate-y-0.5 hover:bg-ink hover:shadow-xl sm:w-auto"
          >
            <Search className="h-5 w-5" />
            بحث عن المعدات المتوفرة
          </button>
        </div>
      </form>

      {isLoading ? (
        <div className="rounded-lg border border-gold/30 bg-gold/10 p-5 text-sm font-black text-navy shadow-soft">
          جاري البحث عن المعدات المتوفرة...
        </div>
      ) : null}

      {!isLoading && searched && results.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-soft">
          <h3 className="text-lg font-black text-navy">لا توجد معدات مطابقة حاليًا.</h3>
          <p className="mx-auto mt-2 max-w-2xl leading-7 text-steel">
            يمكنك إرسال طلب خاص وسيقوم فريق فليت معدات بتوفير أفضل عرض مناسب.
          </p>
          <Link href="/request-equipment" className="mt-5 inline-flex rounded-md bg-gold px-5 py-3 text-sm font-black text-navy">
            إرسال طلب خاص
          </Link>
        </div>
      ) : null}

      {!isLoading && searched && results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
              <div className="relative h-48 bg-navy">
                <Image src={item.image} alt={item.typeAndCapacity} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <span className="absolute right-4 top-4 rounded-md bg-white/90 px-3 py-1 text-xs font-black text-navy">
                  {item.availableNow ? "متوفر الآن" : "قيد التأجير"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black text-navy">
                  {item.brand} {item.model}
                </h3>
                <p className="mt-2 text-sm font-bold text-steel">{item.typeAndCapacity}</p>
                <div className="mt-4 grid gap-2 text-sm text-steel sm:grid-cols-2">
                  <span>
                    المدينة: <strong className="text-navy">{item.city}</strong>
                  </span>
                  <span>
                    المزود: <strong className="text-navy">{item.supplier}</strong>
                  </span>
                  <span>
                    المشغل: <strong className="text-navy">{item.operatorIncluded ? "متوفر" : "غير مرفق"}</strong>
                  </span>
                  <span>
                    النقل: <strong className="text-navy">{item.transportIncluded ? "متاح" : "حسب الطلب"}</strong>
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                  <strong className="text-lg text-navy">{item.dailyPrice.toLocaleString("ar-SA")} ر.س / يوم</strong>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/request-equipment" className="rounded-md bg-gold px-4 py-2 text-sm font-black text-navy">
                      طلب عرض سعر
                    </Link>
                    <Link href={`/equipment/${categorySlug ?? category?.slug ?? "details"}`} className="rounded-md border border-navy/15 px-4 py-2 text-sm font-black text-navy">
                      عرض التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}

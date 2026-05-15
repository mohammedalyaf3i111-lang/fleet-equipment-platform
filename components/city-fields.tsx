"use client";

import { useId, useState } from "react";
import { MapPin, Plus, X } from "lucide-react";
import { saudiMvpCities } from "@/constants/cities";

const inputClassName =
  "mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 pr-10 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";

export function CitySelectField({
  label,
  name,
  required = true,
  value,
  onValueChange,
  placeholder = "اختر المدينة"
}: {
  label: string;
  name?: string;
  required?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
}) {
  const listId = useId();

  return (
    <label className="block text-sm font-bold text-navy">
      {label}
      <span className="relative block">
        <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 text-gold" aria-hidden />
        <input
          name={name}
          list={listId}
          required={required}
          value={value}
          onChange={(event) => onValueChange?.(event.target.value)}
          placeholder={placeholder}
          className={inputClassName}
          autoComplete="off"
        />
      </span>
      <datalist id={listId}>
        {saudiMvpCities.map((city) => (
          <option key={city.slug} value={city.arabicName} />
        ))}
      </datalist>
    </label>
  );
}

export function CoverageAreasField({ name = "coverageAreas" }: { name?: string }) {
  const listId = useId();
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [draftCity, setDraftCity] = useState("");

  const addCity = () => {
    const city = draftCity.trim();
    const isAllowed = saudiMvpCities.some((item) => item.arabicName === city);
    if (!city || !isAllowed || selectedCities.includes(city)) return;
    setSelectedCities((current) => [...current, city]);
    setDraftCity("");
  };

  const removeCity = (city: string) => {
    setSelectedCities((current) => current.filter((item) => item !== city));
  };

  return (
    <div className="md:col-span-2">
      <input type="hidden" name={name} value={selectedCities.join("، ")} required />
      <label className="block text-sm font-bold text-navy">
        المدن التي يخدمها المزود
        <div className="mt-2 flex flex-col gap-2 sm:flex-row">
          <span className="relative flex-1">
            <MapPin className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" aria-hidden />
            <input
              list={listId}
              value={draftCity}
              onChange={(event) => setDraftCity(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addCity();
                }
              }}
              placeholder="ابحث واختر مدينة"
              className={inputClassName}
              autoComplete="off"
            />
          </span>
          <button
            type="button"
            onClick={addCity}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-gold/50 bg-gold/10 px-4 py-3 text-sm font-black text-navy transition hover:bg-gold/20"
          >
            <Plus className="h-4 w-4" />
            إضافة
          </button>
        </div>
      </label>
      <datalist id={listId}>
        {saudiMvpCities.map((city) => (
          <option key={city.slug} value={city.arabicName} />
        ))}
      </datalist>
      <div className="mt-3 flex min-h-9 flex-wrap gap-2">
        {selectedCities.length === 0 ? (
          <p className="text-xs font-bold text-steel">اختر مدينة واحدة على الأقل من المدن الرئيسية المعتمدة للـ MVP.</p>
        ) : (
          selectedCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => removeCity(city)}
              className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-3 py-1.5 text-xs font-bold text-navy shadow-sm"
            >
              {city}
              <X className="h-3.5 w-3.5 text-red-500" aria-hidden />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

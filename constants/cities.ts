export type SaudiCity = {
  arabicName: string;
  englishName: string;
  slug: string;
  region: string;
};

export const saudiMvpCities: SaudiCity[] = [
  { arabicName: "الرياض", englishName: "Riyadh", slug: "riyadh", region: "منطقة الرياض" },
  { arabicName: "جدة", englishName: "Jeddah", slug: "jeddah", region: "منطقة مكة المكرمة" },
  { arabicName: "الدمام", englishName: "Dammam", slug: "dammam", region: "المنطقة الشرقية" },
  { arabicName: "الخبر", englishName: "Khobar", slug: "khobar", region: "المنطقة الشرقية" },
  { arabicName: "الظهران", englishName: "Dhahran", slug: "dhahran", region: "المنطقة الشرقية" },
  { arabicName: "مكة المكرمة", englishName: "Makkah", slug: "makkah", region: "منطقة مكة المكرمة" },
  { arabicName: "المدينة المنورة", englishName: "Madinah", slug: "madinah", region: "منطقة المدينة المنورة" },
  { arabicName: "الطائف", englishName: "Taif", slug: "taif", region: "منطقة مكة المكرمة" },
  { arabicName: "القصيم", englishName: "Qassim", slug: "qassim", region: "منطقة القصيم" },
  { arabicName: "بريدة", englishName: "Buraydah", slug: "buraydah", region: "منطقة القصيم" },
  { arabicName: "حائل", englishName: "Hail", slug: "hail", region: "منطقة حائل" },
  { arabicName: "أبها", englishName: "Abha", slug: "abha", region: "منطقة عسير" },
  { arabicName: "خميس مشيط", englishName: "Khamis Mushait", slug: "khamis-mushait", region: "منطقة عسير" },
  { arabicName: "جازان", englishName: "Jazan", slug: "jazan", region: "منطقة جازان" },
  { arabicName: "نجران", englishName: "Najran", slug: "najran", region: "منطقة نجران" },
  { arabicName: "الجبيل", englishName: "Jubail", slug: "jubail", region: "المنطقة الشرقية" },
  { arabicName: "ينبع", englishName: "Yanbu", slug: "yanbu", region: "منطقة المدينة المنورة" },
  { arabicName: "الأحساء", englishName: "Al Ahsa", slug: "al-ahsa", region: "المنطقة الشرقية" },
  { arabicName: "تبوك", englishName: "Tabuk", slug: "tabuk", region: "منطقة تبوك" },
  { arabicName: "سكاكا", englishName: "Sakaka", slug: "sakaka", region: "منطقة الجوف" }
];

export const cityArabicNames = saudiMvpCities.map((city) => city.arabicName);
export const cityNameSet = new Set(cityArabicNames);

export const hiddenCityExtensionOption = {
  arabicName: "إضافة مدينة أخرى",
  englishName: "Add another city",
  slug: "add-another-city",
  region: "خيار مستقبلي",
  isVisible: false
};

export type EquipmentFilterFieldType = "city" | "select" | "text" | "number" | "boolean";

export type EquipmentFilterOption = {
  slug: string;
  arabicName: string;
};

export type EquipmentFilterField = {
  key: string;
  label: string;
  type: EquipmentFilterFieldType;
  placeholder?: string;
  unit?: string;
  options?: string[];
};

export type EquipmentFilterSchema = {
  slug: string;
  title: string;
  typeLabel: string;
  defaultTypeSlug: string;
  typeOptions: EquipmentFilterOption[];
  fields: EquipmentFilterField[];
  resultKeywords: string[];
};

const commonAvailability: EquipmentFilterField[] = [
  { key: "availableNow", label: "متوفر الآن", type: "boolean" },
  { key: "transportAvailable", label: "نقل متاح", type: "boolean" }
];

export const equipmentFilterSchemas: Record<string, EquipmentFilterSchema> = {
  grader: {
    slug: "grader",
    title: "جريدر",
    typeLabel: "موديل الجريدر",
    defaultTypeSlug: "cat-140-m3",
    typeOptions: [
      { slug: "cat-120-m3", arabicName: "CAT 120 M3" },
      { slug: "cat-140-m3", arabicName: "CAT 140 M3" },
      { slug: "cat-160-m3", arabicName: "CAT 160 M3" },
      { slug: "cat-14m3", arabicName: "CAT 14M3" },
      { slug: "cat-16m3", arabicName: "CAT 16M3" },
      { slug: "cat-24m", arabicName: "CAT 24M" },
      { slug: "komatsu-gd405", arabicName: "Komatsu GD405A" },
      { slug: "komatsu-gd555", arabicName: "Komatsu GD555A" },
      { slug: "komatsu-gd655", arabicName: "Komatsu GD655A" },
      { slug: "volvo-g930", arabicName: "Volvo G930" },
      { slug: "volvo-g940", arabicName: "Volvo G940" },
      { slug: "john-deere-672g", arabicName: "John Deere 672G" },
      { slug: "case-865b", arabicName: "CASE 865B" },
      { slug: "sdlg-gr215", arabicName: "SDLG GR215" },
      { slug: "xcmg-gr215", arabicName: "XCMG GR215" }
    ],
    fields: [
      { key: "city", label: "المدينة / الموقع", type: "city" },
      { key: "brand", label: "الماركة", type: "select", options: ["CAT", "Komatsu", "Volvo", "John Deere", "CASE", "SDLG", "XCMG"] },
      { key: "bladeWidth", label: "عرض الشفرة", type: "select", options: ["أقل من 3.5 متر", "3.5 – 3.7 متر", "3.7 – 4.0 متر", "أكثر من 4.0 متر"] },
      { key: "horsepower", label: "القدرة الحصانية", type: "select", options: ["حتى 120 HP", "120 – 160 HP", "160 – 200 HP", "200 – 250 HP", "أكثر من 250 HP"] },
      { key: "operatingWeight", label: "الوزن التشغيلي", type: "select", options: ["حتى 12 طن", "12 – 15 طن", "15 – 20 طن", "أكثر من 20 طن"] },
      { key: "year", label: "سنة الصنع", type: "number", placeholder: "مثال: 2020" },
      { key: "rentalDuration", label: "مدة الإيجار", type: "select", options: ["يومي", "أسبوعي", "شهري", "ربع سنوي"] },
      { key: "articulatedFrame", label: "هيكل مفصلي", type: "boolean" },
      { key: "ripperAvailable", label: "ريبر متوفر", type: "boolean" },
      { key: "gpsReady", label: "GPS جاهز", type: "boolean" },
      { key: "withOperator", label: "مع مشغل", type: "boolean" },
      { key: "availableNow", label: "متوفر الآن", type: "boolean" }
    ],
    resultKeywords: ["جريدر", "Grader", "موتور جريدر"]
  },
  cranes: {
    slug: "cranes",
    title: "كرينات",
    typeLabel: "نوع الكرين",
    defaultTypeSlug: "crane-20-ton",
    typeOptions: [
      { slug: "crane-7-ton", arabicName: "كرين 7 طن" },
      { slug: "crane-10-ton", arabicName: "كرين 10 طن" },
      { slug: "crane-15-ton", arabicName: "كرين 15 طن" },
      { slug: "crane-20-ton", arabicName: "كرين 20 طن" },
      { slug: "crane-25-ton", arabicName: "كرين 25 طن" },
      { slug: "crane-30-ton", arabicName: "كرين 30 طن" },
      { slug: "crane-50-ton", arabicName: "كرين 50 طن" },
      { slug: "crane-70-ton", arabicName: "كرين 70 طن" },
      { slug: "crane-100-ton", arabicName: "كرين 100 طن" },
      { slug: "crane-150-ton", arabicName: "كرين 150 طن" },
      { slug: "crane-200-ton", arabicName: "كرين 200 طن" },
      { slug: "telescopic-crane", arabicName: "كرين تلسكوبي" },
      { slug: "truck-crane", arabicName: "شاحنة كرين" },
      { slug: "crawler-crane", arabicName: "كرين مجنزّر" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "capacityTon", label: "السعة بالطن", type: "select", options: ["7 طن", "10 طن", "15 طن", "20 طن", "25 طن", "30 طن", "50 طن", "70 طن", "100 طن", "150 طن", "200 طن"] },
      { key: "boomLength", label: "طول البوم", type: "text", placeholder: "مثال: 42 متر" },
      { key: "liftingHeight", label: "ارتفاع الرفع", type: "text", placeholder: "مثال: 55 متر" },
      { key: "workRadius", label: "نصف قطر العمل", type: "text", placeholder: "مثال: 18 متر" },
      { key: "craneType", label: "نوع الكرين", type: "select", options: ["تلسكوبي", "شاحنة كرين", "رافعة متنقلة", "رافعة مجنزرة"] },
      { key: "withOperator", label: "مع مشغل", type: "boolean" },
      { key: "inspectionCertificate", label: "شهادة فحص متوفرة", type: "boolean" },
      { key: "transportAvailable", label: "نقل متاح", type: "boolean" }
    ],
    resultKeywords: ["كرينات", "كرين", "رافعات"]
  },
  excavators: {
    slug: "excavators",
    title: "حفارات / بوكلينات",
    typeLabel: "موديل الحفار",
    defaultTypeSlug: "excavator-320",
    typeOptions: [
      { slug: "mini-excavator", arabicName: "بوكلين صغير" },
      { slug: "excavator-120", arabicName: "بوكلين 120" },
      { slug: "excavator-200", arabicName: "بوكلين 200" },
      { slug: "excavator-220", arabicName: "بوكلين 220" },
      { slug: "excavator-300", arabicName: "بوكلين 300" },
      { slug: "excavator-320", arabicName: "بوكلين 320" },
      { slug: "excavator-330", arabicName: "بوكلين 330" },
      { slug: "excavator-400", arabicName: "بوكلين 400" },
      { slug: "crawler-excavator", arabicName: "حفار جنزير" },
      { slug: "wheeled-excavator", arabicName: "حفار كفرات" },
      { slug: "excavator-with-breaker", arabicName: "حفار مع بريكر" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "movementType", label: "نوع الحركة", type: "select", options: ["جنزير", "كفرات"] },
      { key: "bucketSize", label: "حجم البكت", type: "text", placeholder: "مثال: 1.2 م³" },
      { key: "diggingDepth", label: "عمق الحفر", type: "text", placeholder: "مثال: 6 متر" },
      { key: "hydraulicBreaker", label: "بريكر متوفر", type: "boolean" },
      { key: "withOperator", label: "مع مشغل", type: "boolean" },
      { key: "availableNow", label: "متوفر الآن", type: "boolean" }
    ],
    resultKeywords: ["حفارات", "بوكلين", "حفار"]
  },
  trucks: {
    slug: "trucks",
    title: "قلابات",
    typeLabel: "حجم القلاب",
    defaultTypeSlug: "dump-truck-18m",
    typeOptions: [
      { slug: "dump-truck-3m", arabicName: "قلاب 3 متر" },
      { slug: "dump-truck-6m", arabicName: "قلاب 6 متر" },
      { slug: "dump-truck-8m", arabicName: "قلاب 8 متر" },
      { slug: "dump-truck-12m", arabicName: "قلاب 12 متر" },
      { slug: "dump-truck-18m", arabicName: "قلاب 18 متر" },
      { slug: "dump-truck-24m", arabicName: "قلاب 24 متر" },
      { slug: "rock-dump-truck", arabicName: "قلاب صخور" },
      { slug: "waste-dump-truck", arabicName: "قلاب مخلفات بناء" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "loadType", label: "نوع الحمولة", type: "select", options: ["رمل", "بحص", "دفان", "مخلفات بناء", "صخور", "مواد بناء"] },
      { key: "tripPrice", label: "سعر النقلة", type: "number", placeholder: "حتى 850 ر.س" },
      { key: "tripScope", label: "النطاق", type: "select", options: ["داخل المدينة", "خارج المدينة"] },
      { key: "driverIncluded", label: "مع سائق", type: "boolean" },
      { key: "availableNow", label: "متوفر الآن", type: "boolean" }
    ],
    resultKeywords: ["قلابات", "قلاب", "سطحات", "نقل"]
  },
  "wheel-loaders": {
    slug: "wheel-loaders",
    title: "شيولات",
    typeLabel: "موديل الشيول",
    defaultTypeSlug: "wheel-loader-966",
    typeOptions: [
      { slug: "small-wheel-loader", arabicName: "شيول صغير" },
      { slug: "wheel-loader-950", arabicName: "شيول 950" },
      { slug: "wheel-loader-966", arabicName: "شيول 966" },
      { slug: "wheel-loader-980", arabicName: "شيول 980" },
      { slug: "wheel-loader-988", arabicName: "شيول 988" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "bucketSize", label: "حجم البكت", type: "text", placeholder: "مثال: 3.5 م³" },
      { key: "horsepower", label: "القدرة", type: "number", placeholder: "مثال: 270 حصان" },
      { key: "dumpHeight", label: "ارتفاع التفريغ", type: "text", placeholder: "مثال: 3.1 متر" },
      { key: "tireType", label: "نوع الإطارات", type: "select", options: ["عادية", "صخرية", "رملية"] },
      { key: "withOperator", label: "مع مشغل", type: "boolean" },
      { key: "availableNow", label: "متوفر الآن", type: "boolean" },
      { key: "dailyRate", label: "سعر اليوم", type: "number", placeholder: "حتى 3000 ر.س" },
      { key: "transportAvailable", label: "نقل متاح", type: "boolean" }
    ],
    resultKeywords: ["شيولات", "شيول"]
  },
  "skid-steers": {
    slug: "skid-steers",
    title: "بوبكات",
    typeLabel: "نوع البوبكات",
    defaultTypeSlug: "bobcat-s650",
    typeOptions: [
      { slug: "small-skid-steer", arabicName: "بوبكات صغير" },
      { slug: "bobcat-s130", arabicName: "بوبكات S130" },
      { slug: "bobcat-s450", arabicName: "بوبكات S450" },
      { slug: "bobcat-s570", arabicName: "بوبكات S570" },
      { slug: "bobcat-s650", arabicName: "بوبكات S650" },
      { slug: "bobcat-s770", arabicName: "بوبكات S770" },
      { slug: "tracked-skid-steer", arabicName: "بوبكات جنزير" },
      { slug: "skid-steer-with-breaker", arabicName: "بوبكات مع بريكر" },
      { slug: "skid-steer-with-sweeper", arabicName: "بوبكات مع مكنسة" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "movementType", label: "نوع الحركة", type: "select", options: ["كفرات", "جنزير"] },
      { key: "attachments", label: "الملحقات", type: "select", options: ["بكت", "شوك", "مكنسة", "بريكر"] },
      { key: "liftCapacity", label: "قدرة الرفع", type: "text", placeholder: "مثال: 1 طن" },
      { key: "operatingWeight", label: "الوزن التشغيلي", type: "text", placeholder: "مثال: 3.7 طن" },
      { key: "withOperator", label: "مع مشغل", type: "boolean" },
      { key: "availableNow", label: "متوفر الآن", type: "boolean" }
    ],
    resultKeywords: ["بوبكات"]
  },
  forklifts: {
    slug: "forklifts",
    title: "رافعات شوكية",
    typeLabel: "نوع الفوركلفت",
    defaultTypeSlug: "forklift-5-ton",
    typeOptions: [
      { slug: "forklift-2-ton", arabicName: "فوركلفت 2 طن" },
      { slug: "forklift-3-ton", arabicName: "فوركلفت 3 طن" },
      { slug: "forklift-5-ton", arabicName: "فوركلفت 5 طن" },
      { slug: "forklift-7-ton", arabicName: "فوركلفت 7 طن" },
      { slug: "forklift-10-ton", arabicName: "فوركلفت 10 طن" },
      { slug: "forklift-15-ton", arabicName: "فوركلفت 15 طن" },
      { slug: "electric-forklift", arabicName: "فوركلفت كهربائي" },
      { slug: "diesel-forklift", arabicName: "فوركلفت ديزل" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "liftCapacity", label: "سعة الرفع", type: "select", options: ["2 طن", "3 طن", "5 طن", "7 طن", "10 طن", "15 طن"] },
      { key: "liftingHeight", label: "ارتفاع الرفع", type: "text", placeholder: "مثال: 4.5 متر" },
      { key: "fuelType", label: "نوع الوقود", type: "select", options: ["ديزل", "كهرباء", "غاز"] },
      { key: "tireType", label: "نوع الإطارات", type: "select", options: ["هوائية", "صلبة", "داخلية"] },
      { key: "forkLength", label: "طول الشوك", type: "text", placeholder: "مثال: 1.2 متر" },
      { key: "withOperator", label: "مع مشغل", type: "boolean" }
    ],
    resultKeywords: ["رافعات شوكية", "فوركلفت"]
  },
  "boom-lifts-manlifts": {
    slug: "boom-lifts-manlifts",
    title: "مان لفت / بوم لفت",
    typeLabel: "نوع المنصة",
    defaultTypeSlug: "manlift-40ft",
    typeOptions: [
      { slug: "manlift-20ft", arabicName: "مان لفت 20 قدم" },
      { slug: "manlift-40ft", arabicName: "مان لفت 40 قدم" },
      { slug: "manlift-60ft", arabicName: "مان لفت 60 قدم" },
      { slug: "manlift-80ft", arabicName: "مان لفت 80 قدم" },
      { slug: "boom-lift-60ft", arabicName: "بوم لفت 60 قدم" },
      { slug: "boom-lift-80ft", arabicName: "بوم لفت 80 قدم" },
      { slug: "boom-lift-120ft", arabicName: "بوم لفت 120 قدم" },
      { slug: "articulated-boom", arabicName: "بوم مفصلي" },
      { slug: "telescopic-boom", arabicName: "بوم تلسكوبي" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "liftType", label: "نوع المنصة", type: "select", options: ["مان لفت عمودي", "بوم لفت مفصلي", "بوم لفت تلسكوبي", "مقص"] },
      { key: "workingHeight", label: "ارتفاع العمل", type: "select", options: ["حتى 10 م", "10 – 15 م", "15 – 20 م", "20 – 30 م", "أكثر من 30 م"] },
      { key: "powerSource", label: "مصدر الطاقة", type: "select", options: ["كهربائي", "ديزل", "هجين"] },
      { key: "platformCapacity", label: "سعة المنصة", type: "select", options: ["شخص واحد", "شخصان", "أكثر من شخصين"] },
      { key: "indoor", label: "استخدام داخلي", type: "boolean" },
      { key: "withOperator", label: "مع مشغل", type: "boolean" },
      { key: "availableNow", label: "متوفر الآن", type: "boolean" }
    ],
    resultKeywords: ["مان لفت", "بوم لفت", "سلة رفع"]
  },
  "compressors-generators": {
    slug: "compressors-generators",
    title: "مولدات",
    typeLabel: "قدرة المولد",
    defaultTypeSlug: "generator-500-kva",
    typeOptions: [
      { slug: "generator-30-kva", arabicName: "مولد 30 KVA" },
      { slug: "generator-60-kva", arabicName: "مولد 60 KVA" },
      { slug: "generator-100-kva", arabicName: "مولد 100 KVA" },
      { slug: "generator-250-kva", arabicName: "مولد 250 KVA" },
      { slug: "generator-500-kva", arabicName: "مولد 500 KVA" },
      { slug: "generator-1mw", arabicName: "مولد 1 ميجا" },
      { slug: "silent-generator", arabicName: "مولد صامت" }
    ],
    fields: [
      { key: "city", label: "المدينة", type: "city" },
      { key: "powerKva", label: "القدرة KVA", type: "select", options: ["30 KVA", "60 KVA", "100 KVA", "250 KVA", "500 KVA", "1 ميجا"] },
      { key: "voltage", label: "الجهد الكهربائي", type: "select", options: ["220V", "380V", "480V"] },
      { key: "fuelType", label: "ديزل / بنزين", type: "select", options: ["ديزل", "بنزين"] },
      { key: "cablesIncluded", label: "يشمل الكيابل", type: "boolean" },
      { key: "noiseLevel", label: "مستوى الضجيج", type: "select", options: ["صامت", "منخفض", "قياسي"] }
    ],
    resultKeywords: ["مولدات", "مولد"]
  }
};

const aliases: Record<string, string> = {
  generators: "compressors-generators",
  "dump-trucks": "trucks",
  lowbeds: "trucks",
  "road-equipment": "grader",
  manlifts: "boom-lifts-manlifts",
  "boom-lifts": "boom-lifts-manlifts"
};

export function getEquipmentFilterSchema(slug?: string) {
  if (!slug) return undefined;
  return equipmentFilterSchemas[slug] ?? equipmentFilterSchemas[aliases[slug]];
}

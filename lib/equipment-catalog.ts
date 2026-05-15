export type SpecField = {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "select";
  unit?: string;
  options?: string[];
  required?: boolean;
};

export type EquipmentTypeDefinition = {
  slug: string;
  arabicName: string;
  englishName: string;
  capacityLabel?: string;
  capacityValue?: number;
  capacityUnit?: string;
  defaultSpecs?: Record<string, string | number | boolean>;
};

export type EquipmentCategoryDefinition = {
  slug: string;
  arabicName: string;
  englishName: string;
  description: string;
  iconName: string;
  defaultImage: string;
  fieldSchema?: SpecField[];
  specFields: SpecField[];
  types: EquipmentTypeDefinition[];
};

const craneFields: SpecField[] = [
  { key: "capacityTon", label: "السعة بالطن", type: "number", unit: "طن", required: true },
  { key: "boomLength", label: "طول البوم", type: "number", unit: "متر", required: true },
  { key: "liftingHeight", label: "ارتفاع الرفع", type: "number", unit: "متر" },
  { key: "workingRadius", label: "نصف قطر العمل", type: "number", unit: "متر" },
  { key: "craneType", label: "نوع الكرين", type: "select", options: ["تلسكوبي", "شاحنة كرين", "رافعة متنقلة", "رافعة مجنزرة"], required: true },
  { key: "inspectionCertificate", label: "شهادة فحص متوفرة", type: "boolean" },
  { key: "gpsInstalled", label: "GPS متوفر", type: "boolean" }
];

const excavatorFields: SpecField[] = [
  { key: "operatingWeight", label: "الوزن التشغيلي", type: "text" },
  { key: "movementType", label: "نوع الحركة", type: "select", options: ["جنزير", "كفرات"] },
  { key: "bucketSize", label: "حجم البكت", type: "text" },
  { key: "diggingDepth", label: "عمق الحفر", type: "number", unit: "متر" },
  { key: "hydraulicBreaker", label: "بريكر متوفر", type: "boolean" }
];

const loaderFields: SpecField[] = [
  { key: "modelClass", label: "الموديل", type: "text" },
  { key: "bucketSize", label: "حجم البكت", type: "text" },
  { key: "horsePower", label: "القدرة", type: "number", unit: "حصان" },
  { key: "dumpHeight", label: "ارتفاع التفريغ", type: "number", unit: "متر" }
];

const liftFields: SpecField[] = [
  { key: "liftingCapacity", label: "سعة الرفع", type: "text" },
  { key: "liftingHeight", label: "ارتفاع الرفع", type: "number", unit: "متر" },
  { key: "fuelType", label: "نوع الوقود", type: "select", options: ["ديزل", "كهرباء", "بنزين"] },
  { key: "operatorIncluded", label: "هل المشغل مرفق", type: "boolean" }
];

const truckFields: SpecField[] = [
  { key: "boxCapacity", label: "سعة الصندوق بالمتر", type: "number", unit: "متر" },
  { key: "loadType", label: "نوع الحمولة", type: "select", options: ["ردميات", "مواد بناء", "معدات", "مياه", "ديزل"] },
  { key: "tripPrice", label: "سعر المشوار", type: "number", unit: "ر.س" },
  { key: "tripScope", label: "نطاق المشوار", type: "select", options: ["داخل المدينة", "خارج المدينة"] },
  { key: "driverIncluded", label: "السائق مرفق", type: "boolean" }
];

const powerFields: SpecField[] = [
  { key: "powerKva", label: "القدرة KVA", type: "number", unit: "KVA" },
  { key: "voltage", label: "الجهد", type: "select", options: ["220V", "380V", "480V"] },
  { key: "fuelConsumption", label: "استهلاك الوقود", type: "text" },
  { key: "cablesIncluded", label: "هل يشمل الكيابل", type: "boolean" }
];

function tonType(slugPrefix: string, arabicPrefix: string, englishPrefix: string, ton: number): EquipmentTypeDefinition {
  return {
    slug: `${slugPrefix}-${ton}-ton`,
    arabicName: `${arabicPrefix} ${ton} طن`,
    englishName: `${englishPrefix} ${ton} Ton`,
    capacityLabel: `${ton} طن`,
    capacityValue: ton,
    capacityUnit: "ton",
    defaultSpecs: { capacityTon: ton }
  };
}

export const equipmentCatalog: EquipmentCategoryDefinition[] = [
  {
    slug: "cranes",
    arabicName: "الكرينات",
    englishName: "Cranes",
    description: "كرينات متحركة وتلسكوبية وشاحنات كرين بسعات متعددة.",
    iconName: "Construction",
    defaultImage: "/catalog/cranes.svg",
    fieldSchema: craneFields,
    specFields: craneFields,
    types: [7, 10, 15, 20, 25, 30, 50, 70, 100, 150, 200].map((ton) => tonType("crane", "كرين", "Crane", ton))
  },
  {
    slug: "excavators",
    arabicName: "البوكلينات",
    englishName: "Excavators",
    description: "بوكلينات وحفارات لمشاريع الحفر والطرق والبنية التحتية.",
    iconName: "Shovel",
    defaultImage: "/catalog/excavators.svg",
    fieldSchema: excavatorFields,
    specFields: excavatorFields,
    types: ([120, 200, 220, 300, 320, 330, 350, 400, 450, 500].map((size) => ({
      slug: `excavator-${size}`,
      arabicName: `بوكلين ${size}`,
      englishName: `Excavator ${size}`,
      capacityLabel: String(size),
      defaultSpecs: { modelClass: size }
    })) as EquipmentTypeDefinition[]).concat([{ slug: "mini-excavator", arabicName: "بوكلين صغير", englishName: "Mini Excavator", capacityLabel: "Mini" }])
  },
  {
    slug: "wheel-loaders",
    arabicName: "الشيولات",
    englishName: "Wheel Loaders",
    description: "شيولات صغيرة ومتوسطة وكبيرة للتحميل والردم.",
    iconName: "Truck",
    defaultImage: "/catalog/wheel-loaders.svg",
    fieldSchema: loaderFields,
    specFields: loaderFields,
    types: ["صغير", "950", "966", "980", "988"].map((name) => ({ slug: `wheel-loader-${name}`.toLowerCase(), arabicName: `شيول ${name}`, englishName: `Wheel Loader ${name}` }))
  },
  {
    slug: "skid-steers",
    arabicName: "البوبكات",
    englishName: "Skid Steers",
    description: "بوبكات كفرات وجنزير مع ملحقات تشغيل متعددة.",
    iconName: "Wrench",
    defaultImage: "/catalog/skid-steers.svg",
    fieldSchema: loaderFields,
    specFields: loaderFields,
    types: ["S130", "S450", "S570", "S650", "S770", "جنزير"].map((name) => ({ slug: `bobcat-${name}`.toLowerCase(), arabicName: `بوبكات ${name}`, englishName: `Bobcat ${name}` }))
  },
  {
    slug: "forklifts",
    arabicName: "الفوركلفت",
    englishName: "Forklifts",
    description: "رافعات شوكية ديزل وكهرباء للمستودعات والمصانع.",
    iconName: "Forklift",
    defaultImage: "/catalog/forklifts.svg",
    fieldSchema: liftFields,
    specFields: liftFields,
    types: [2, 3, 5, 7, 10, 15].map((ton) => tonType("forklift", "فوركلفت", "Forklift", ton)).concat([
      { slug: "electric-forklift", arabicName: "فوركلفت كهربائي", englishName: "Electric Forklift" },
      { slug: "diesel-forklift", arabicName: "فوركلفت ديزل", englishName: "Diesel Forklift" }
    ])
  },
  {
    slug: "boom-lifts-manlifts",
    arabicName: "البوم لفت والمان لفت",
    englishName: "Boom Lifts & Manlifts",
    description: "منصات رفع للأعمال الداخلية والخارجية.",
    iconName: "ArrowUp",
    defaultImage: "/catalog/boom-lifts.svg",
    fieldSchema: liftFields,
    specFields: liftFields,
    types: ["بوم لفت 12 متر", "بوم لفت 16 متر", "بوم لفت 20 متر", "بوم لفت 26 متر", "بوم لفت 32 متر", "سيزر لفت 8 متر", "سيزر لفت 10 متر", "سيزر لفت 12 متر", "مان لفت ديزل", "مان لفت كهربائي"].map((name) => ({ slug: name.replaceAll(" ", "-"), arabicName: name, englishName: name }))
  },
  {
    slug: "trucks",
    arabicName: "القلابات والشاحنات",
    englishName: "Trucks",
    description: "قلاب، لوبد، تريلا، وايت ماء، ودينات نقل.",
    iconName: "Truck",
    defaultImage: "/catalog/trucks.svg",
    fieldSchema: truckFields,
    specFields: truckFields,
    types: ["قلاب 6 متر", "قلاب 12 متر", "قلاب 18 متر", "تريلا سطحه", "لوبد نقل معدات", "وايت ماء", "دينه", "سطحه نقل"].map((name) => ({ slug: name.replaceAll(" ", "-"), arabicName: name, englishName: name }))
  },
  {
    slug: "compressors-generators",
    arabicName: "الضواغط والمولدات",
    englishName: "Compressors & Generators",
    description: "مولدات وكمبروسرات للمواقع الصناعية والإنشائية.",
    iconName: "Gauge",
    defaultImage: "/catalog/generators.svg",
    fieldSchema: powerFields,
    specFields: powerFields,
    types: ["كمبروسر هواء 185 CFM", "كمبروسر 375 CFM", "كمبروسر 750 CFM", "مولد 30 KVA", "مولد 60 KVA", "مولد 100 KVA", "مولد 250 KVA", "مولد 500 KVA", "مولد 1 ميجا"].map((name) => ({ slug: name.replaceAll(" ", "-"), arabicName: name, englishName: name }))
  },
  {
    slug: "road-equipment",
    arabicName: "معدات الطرق",
    englishName: "Road Equipment",
    description: "معدات رصف ودمك وتسوية الطرق.",
    iconName: "Route",
    defaultImage: "/catalog/road-equipment.svg",
    fieldSchema: loaderFields,
    specFields: loaderFields,
    types: ["رصاصة صغيرة", "رصاصة 10 طن", "رصاصة 12 طن", "رصاصة 20 طن", "قريدر", "فرادة أسفلت", "كشاطة أسفلت"].map((name) => ({ slug: name.replaceAll(" ", "-"), arabicName: name, englishName: name }))
  },
  {
    slug: "additional-equipment",
    arabicName: "معدات إضافية",
    englishName: "Additional Equipment",
    description: "معدات مساندة للمشاريع والمواقع.",
    iconName: "Boxes",
    defaultImage: "/catalog/additional-equipment.svg",
    fieldSchema: truckFields,
    specFields: truckFields,
    types: ["تنكر ديزل", "تنكر ماء", "مضخة خرسانة", "خلاطة خرسانة", "سقالة كهربائية", "برج إنارة", "حاوية مخلفات", "كسارة متنقلة", "غربال متنقل"].map((name) => ({ slug: name.replaceAll(" ", "-"), arabicName: name, englishName: name }))
  }
];

export function findCatalogCategory(slug: string) {
  return equipmentCatalog.find((category) => category.slug === slug);
}

export function findCatalogType(typeSlug: string) {
  return equipmentCatalog.flatMap((category) => category.types.map((type) => ({ ...type, category }))).find((type) => type.slug === typeSlug);
}

export function getAllEquipmentTypes() {
  return equipmentCatalog.flatMap((category) => category.types.map((type) => ({ ...type, categorySlug: category.slug, categoryName: category.arabicName })));
}

export function getCategoryFieldSchema(category: EquipmentCategoryDefinition) {
  return category.fieldSchema ?? category.specFields;
}

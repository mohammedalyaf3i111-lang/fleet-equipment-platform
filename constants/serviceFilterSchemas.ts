// ─── Service-specific filter schemas ─────────────────────────────────────────
// Separate from equipment filter schemas — for service-based pages.

export type ServiceFilterFieldType =
  | "city"
  | "select"
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "price-range";

export type ServiceFilterField = {
  key: string;
  label: string;
  type: ServiceFilterFieldType;
  placeholder?: string;
  unit?: string;
  options?: string[];
  /** If true, only render this field when another field has a specific value */
  dependsOn?: { key: string; value: string };
};

export type BackfillingMaterialSupplier = {
  id: string;
  supplierName: string;
  materialType: string;
  city: string;
  pricingMethod: string;
  priceDisplay: string;
  transportIncluded: boolean;
  trucksAvailable: boolean;
  deliveryTime: string;
  availableNow: boolean;
  includesSpreading: boolean;
  includesCompaction: boolean;
};

// ─── backfilling-materials schema ─────────────────────────────────────────────
export const backfillingMaterialsSchema = {
  slug: "backfilling-materials",
  title: "توريد سبيس وردميات",
  description: "حدد نوع المادة والكمية وطريقة التسعير وسيقوم فريق فليت بتوفير المورد المناسب.",
  fields: [
    // 1. المدينة
    { key: "city", label: "المدينة", type: "city" } as ServiceFilterField,

    // 2. نوع المادة
    {
      key: "materialType",
      label: "نوع المادة",
      type: "select",
      options: ["رمل", "بحص", "سبيس", "دفان", "تربة زراعية", "مواد تسوية"]
    } as ServiceFilterField,

    // 3. طريقة التسعير
    {
      key: "pricingMethod",
      label: "طريقة التسعير",
      type: "select",
      options: ["بالنقلة", "بالمتر", "بالطن", "بالمشروع"]
    } as ServiceFilterField,

    // 4. الكمية — بالنقلة
    {
      key: "quantityTrips",
      label: "عدد النقلات",
      type: "number",
      placeholder: "مثال: 10",
      dependsOn: { key: "pricingMethod", value: "بالنقلة" }
    } as ServiceFilterField,

    // 4. الكمية — بالمتر
    {
      key: "quantityMeters",
      label: "عدد الأمتار المكعبة",
      type: "number",
      placeholder: "مثال: 500",
      unit: "م³",
      dependsOn: { key: "pricingMethod", value: "بالمتر" }
    } as ServiceFilterField,

    // 4. الكمية — بالطن
    {
      key: "quantityTons",
      label: "عدد الأطنان",
      type: "number",
      placeholder: "مثال: 200",
      unit: "طن",
      dependsOn: { key: "pricingMethod", value: "بالطن" }
    } as ServiceFilterField,

    // 5. نوع القلاب
    {
      key: "truckType",
      label: "نوع القلاب",
      type: "select",
      options: ["قلاب 6 متر", "قلاب 12 متر", "قلاب 18 متر", "قلاب 24 متر", "قلاب 32 متر", "تريلا"]
    } as ServiceFilterField,

    // 6. موقع التحميل
    {
      key: "loadingLocation",
      label: "موقع التحميل",
      type: "select",
      options: ["من المورد", "من كسارة", "من موقع آخر"]
    } as ServiceFilterField,

    // 7. موقع التفريغ
    {
      key: "unloadingAddress",
      label: "موقع التفريغ",
      type: "text",
      placeholder: "عنوان التفريغ أو اسم الحي"
    } as ServiceFilterField,

    // 8. داخل / خارج
    {
      key: "tripScope",
      label: "داخل / خارج المدينة",
      type: "select",
      options: ["داخل المدينة", "خارج المدينة"]
    } as ServiceFilterField,

    // 9. يشمل النقل
    { key: "transportIncluded", label: "يشمل النقل", type: "boolean" } as ServiceFilterField,

    // 10. يشمل الفرد والتسوية
    { key: "spreadingIncluded", label: "يشمل الفرد والتسوية", type: "boolean" } as ServiceFilterField,

    // 11. يشمل الدك
    { key: "compactionIncluded", label: "يشمل الدك", type: "boolean" } as ServiceFilterField,

    // 12. موعد التوريد
    {
      key: "deliveryTiming",
      label: "موعد التوريد",
      type: "select",
      options: ["اليوم", "غدًا", "تاريخ مخصص"]
    } as ServiceFilterField,

    // 12b. التاريخ المخصص
    {
      key: "deliveryDate",
      label: "التاريخ",
      type: "date",
      dependsOn: { key: "deliveryTiming", value: "تاريخ مخصص" }
    } as ServiceFilterField,

    // 13. توفر الخدمة
    {
      key: "availability",
      label: "توفر الخدمة",
      type: "select",
      options: ["متوفر الآن", "خلال 24 ساعة", "حسب الجدولة"]
    } as ServiceFilterField,

    // 14. نطاق السعر
    {
      key: "priceFrom",
      label: "السعر من",
      type: "number",
      placeholder: "ر.س",
      unit: "ر.س"
    } as ServiceFilterField,

    {
      key: "priceTo",
      label: "السعر إلى",
      type: "number",
      placeholder: "ر.س",
      unit: "ر.س"
    } as ServiceFilterField,
  ]
};

// ─── Mock suppliers for backfilling materials ─────────────────────────────────
export const backfillingMaterialSuppliers: BackfillingMaterialSupplier[] = [
  {
    id: "BM-001",
    supplierName: "مواد الردم الشرقية",
    materialType: "سبيس",
    city: "الرياض",
    pricingMethod: "بالنقلة",
    priceDisplay: "450 ر.س / النقلة",
    transportIncluded: true,
    trucksAvailable: true,
    deliveryTime: "خلال 4 ساعات",
    availableNow: true,
    includesSpreading: false,
    includesCompaction: false
  },
  {
    id: "BM-002",
    supplierName: "شركة الدفان والردم السعودية",
    materialType: "دفان",
    city: "الرياض",
    pricingMethod: "بالمتر",
    priceDisplay: "85 ر.س / م³",
    transportIncluded: true,
    trucksAvailable: true,
    deliveryTime: "خلال 24 ساعة",
    availableNow: true,
    includesSpreading: true,
    includesCompaction: false
  },
  {
    id: "BM-003",
    supplierName: "مؤسسة النقاء لمواد البناء",
    materialType: "رمل",
    city: "جدة",
    pricingMethod: "بالطن",
    priceDisplay: "55 ر.س / طن",
    transportIncluded: true,
    trucksAvailable: true,
    deliveryTime: "خلال 6 ساعات",
    availableNow: true,
    includesSpreading: false,
    includesCompaction: false
  },
  {
    id: "BM-004",
    supplierName: "مواد ردم الخليج",
    materialType: "بحص",
    city: "الدمام",
    pricingMethod: "بالنقلة",
    priceDisplay: "520 ر.س / النقلة",
    transportIncluded: true,
    trucksAvailable: true,
    deliveryTime: "غدًا",
    availableNow: false,
    includesSpreading: false,
    includesCompaction: false
  },
  {
    id: "BM-005",
    supplierName: "شركة التسوية والردم المتكاملة",
    materialType: "مواد تسوية",
    city: "الرياض",
    pricingMethod: "بالمشروع",
    priceDisplay: "حسب الكمية والموقع",
    transportIncluded: true,
    trucksAvailable: true,
    deliveryTime: "حسب الجدولة",
    availableNow: true,
    includesSpreading: true,
    includesCompaction: true
  },
  {
    id: "BM-006",
    supplierName: "مورد التربة الزراعية الأخضر",
    materialType: "تربة زراعية",
    city: "مكة المكرمة",
    pricingMethod: "بالمتر",
    priceDisplay: "120 ر.س / م³",
    transportIncluded: false,
    trucksAvailable: false,
    deliveryTime: "خلال 24 ساعة",
    availableNow: true,
    includesSpreading: false,
    includesCompaction: false
  }
];

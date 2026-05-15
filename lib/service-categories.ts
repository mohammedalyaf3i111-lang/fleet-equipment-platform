export type ServiceFilterField = {
  key: string;
  label: string;
  type: "text" | "number" | "select" | "boolean";
  placeholder?: string;
  options?: string[];
  unit?: string;
};

export type ServiceCategory = {
  slug: string;
  arabicName: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  description: string;
  image: string;
  accent: string;
  filters: ServiceFilterField[];
  equipment: string[];
  services: string[];
  stats: { label: string; value: string }[];
};

const concreteFilters: ServiceFilterField[] = [
  { key: "pourVolume", label: "حجم الصبة", type: "number", unit: "م³", placeholder: "مثال: 120" },
  { key: "boomLength", label: "طول البوم", type: "number", unit: "متر", placeholder: "مثال: 36" },
  { key: "cubicMeters", label: "عدد المكعبات", type: "number", unit: "م³", placeholder: "مثال: 80" },
  { key: "operatorIncluded", label: "هل يوجد مشغل", type: "boolean" },
  { key: "deliveryIncluded", label: "هل يشمل التوصيل", type: "boolean" },
  { key: "pricingMode", label: "طريقة التسعير", type: "select", options: ["سعر بالمتر", "سعر باليوم"] },
  { key: "readyWithin", label: "جاهز خلال كم ساعة", type: "select", options: ["خلال 6 ساعات", "خلال 12 ساعة", "خلال 24 ساعة", "حسب الجدولة"] }
];

const backfillingFilters: ServiceFilterField[] = [
  { key: "fillType", label: "نوع الردم", type: "select", options: ["رمل", "سبيس", "بحص", "ردميات مختلطة"] },
  { key: "truckCount", label: "عدد القلابات", type: "number", placeholder: "مثال: 12" },
  { key: "truckSize", label: "حجم القلاب", type: "select", options: ["6 متر", "12 متر", "18 متر"] },
  { key: "loaderSize", label: "حجم الشيول", type: "select", options: ["شيول صغير", "950", "966", "980"] },
  { key: "tripPrice", label: "سعر النقلة", type: "number", unit: "ر.س" },
  { key: "scope", label: "نطاق العمل", type: "select", options: ["داخل المدينة", "خارج المدينة"] },
  { key: "operatorIncluded", label: "هل يشمل مشغل", type: "boolean" }
];

const asphaltFilters: ServiceFilterField[] = [
  { key: "paverWidth", label: "عرض الفرادة", type: "number", unit: "متر" },
  { key: "rollerWeight", label: "وزن الرصاصة", type: "select", options: ["10 طن", "12 طن", "20 طن"] },
  { key: "meterPrice", label: "سعر المتر", type: "number", unit: "ر.س" },
  { key: "dayPrice", label: "سعر اليوم", type: "number", unit: "ر.س" },
  { key: "projectType", label: "نوع المشروع", type: "select", options: ["مواقف", "طرق داخلية", "طرق رئيسية", "ساحات صناعية"] }
];

const liftingFilters: ServiceFilterField[] = [
  { key: "capacityTon", label: "كم طن", type: "number", unit: "طن", placeholder: "مثال: 50" },
  { key: "liftingHeight", label: "ارتفاع الرفع", type: "number", unit: "متر" },
  { key: "boomLength", label: "طول البوم", type: "number", unit: "متر" },
  { key: "operatorIncluded", label: "مع مشغل", type: "boolean" },
  { key: "inspectionCertificate", label: "شهادة فحص", type: "boolean" },
  { key: "transportAvailable", label: "نقل متاح", type: "boolean" }
];

const heavyTransportFilters: ServiceFilterField[] = [
  { key: "payload", label: "الحمولة", type: "text", placeholder: "مثال: 60 طن" },
  { key: "axles", label: "عدد المحاور", type: "select", options: ["2", "3", "4", "5+", "حسب الحمولة"] },
  { key: "scope", label: "نطاق النقل", type: "select", options: ["داخل المدينة", "بين المدن"] },
  { key: "tripPrice", label: "سعر المشوار", type: "number", unit: "ر.س" },
  { key: "availableNow", label: "نقل متاح الآن", type: "boolean" }
];

const constructionWasteFilters: ServiceFilterField[] = [
  { key: "wasteType", label: "نوع المخلفات", type: "select", options: ["خرسانة", "رمل", "طوب", "خشب", "حديد", "مخلفات مختلطة"] },
  { key: "projectSize", label: "حجم المشروع", type: "select", options: ["منزل", "عمارة", "مشروع تجاري", "مصنع"] },
  { key: "serviceType", label: "نوع الخدمة", type: "select", options: ["حاوية فقط", "نقل فقط", "تحميل + نقل", "تنظيف كامل"] },
  { key: "duration", label: "مدة الخدمة", type: "select", options: ["يومي", "أسبوعي", "شهري"] },
  { key: "tripCount", label: "عدد النقلات", type: "select", options: ["نقلة واحدة", "عدة نقلات", "عقد مستمر"] },
  { key: "containerSize", label: "حجم الحاوية", type: "select", options: ["6 ياردة", "12 ياردة", "20 ياردة", "40 ياردة", "يومية", "شهرية"] },
  { key: "emergencyService", label: "خدمة طوارئ 24 ساعة", type: "boolean" },
  { key: "withLoader", label: "مع معدة تحميل", type: "boolean" }
];

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "bricks-blocks",
    arabicName: "طوب وبلوك",
    seoTitle: "توريد الطوب والبلك | فليت معدات",
    seoDescription: "منصة مواد بناء للطوب والبلك تشمل بلك عادي وعازل وبركاني وطوب أحمر وواجهات مع خيارات توريد وتركيب ونقل.",
    heroTitle: "توريد الطوب والبلك ومواد البناء",
    description: "قسم متخصص يفصل بين الطوب والبلك مع مقاسات وطرق بيع وفلاتر توريد وتركيب ونقل وتحميل للمواقع.",
    image: "/images/categories/building-materials-yard.jpg",
    accent: "#B45309",
    filters: [
      { key: "productType", label: "نوع المنتج", type: "select", options: ["طوب", "بلك"] },
      { key: "saleMethod", label: "طريقة البيع", type: "select", options: ["بالحبة", "بالشدة", "بالربطة", "بالمتر", "بالمشروع"] },
      { key: "deliveryIncluded", label: "نقل متاح", type: "boolean" }
    ],
    equipment: ["بلك عادي", "بلك عازل", "بلك بركاني", "بلك أسمنتي", "بلك أبيض", "طوب أحمر", "طوب حراري", "طوب ديكوري", "طوب واجهات", "طوب تراثي"],
    services: ["توريد فقط", "توريد مع تركيب", "تحميل بالفوركلفت", "نقل للموقع", "توريد بالمشروع"],
    stats: [{ label: "منتجات", value: "+10" }, { label: "طرق بيع", value: "5" }, { label: "نقل", value: "متاح" }]
  },
  {
    slug: "concrete",
    arabicName: "خرسانة",
    seoTitle: "خدمات ومعدات الخرسانة | فليت معدات",
    seoDescription: "اطلب مضخات وخلاطات وفرق صب خرسانة مع فلاتر متخصصة لحجم الصبة وطول البوم والتوصيل.",
    heroTitle: "حلول الخرسانة والصب للمشاريع",
    description: "مضخات وخلاطات وفرق تشغيل مرتبطة بأعمال الصب فقط، بدون خلطها مع كتالوج معدات غير مرتبطة.",
    image: "/images/categories/concrete.jpg",
    accent: "#7C5E3C",
    filters: concreteFilters,
    equipment: ["مضخات خرسانة", "خلاطات خرسانة", "هزازات", "قلابات خرسانة", "مضخات ثابتة", "سيارات خرسانة جاهزة", "سقالات", "معدات صب", "تنكر ماء", "معدات تشطيب خرسانة"],
    services: ["عمالة صب", "جدولة توريد خرسانة", "توثيق موقع الصبة", "تسعير بالمتر أو اليوم"],
    stats: [{ label: "خدمات متاحة", value: "+19" }, { label: "مدن تشغيل", value: "12" }, { label: "جاهزية", value: "24 ساعة" }]
  },
  {
    slug: "backfilling",
    arabicName: "ردم",
    seoTitle: "خدمات الردم والدفان والقلابات والشيولات | فليت معدات",
    seoDescription: "خدمات ردم ودفان وتسوية ودك ونقل مواد تشمل قلابات وشيولات ورصاصات ورمل وبحص وسبيس داخل المملكة.",
    heroTitle: "خدمات الردم والتسوية ونقل المواد",
    description: "منصة متخصصة لتوفير معدات الردم والدك والقلابات والمواد الإنشائية للمشاريع والمواقع داخل المملكة.",
    image: "/images/services/backfilling.jpg",
    accent: "#D6A23A",
    filters: backfillingFilters,
    equipment: ["شيولات", "قلابات", "حفارات", "بوبكات", "مداحل / رصاصات", "جريدر", "تنكر ماء", "معدات دك وردم"],
    services: ["رمل", "بحص", "سبيس", "دفان", "تربة زراعية", "مواد تسوية", "نقل مخلفات", "عمالة ومشغلين"],
    stats: [{ label: "معدات مرتبطة", value: "+44" }, { label: "طرق تسعير", value: "4" }, { label: "نطاق", value: "داخل/خارج" }]
  },
  {
    slug: "asphalt",
    arabicName: "أسفلت",
    seoTitle: "معدات وخدمات الأسفلت | فليت معدات",
    seoDescription: "معدات سفلتة وفرادات ورصاصات وجريدر وقشاطات مع فلاتر عرض الفرادة وسعر المتر.",
    heroTitle: "معدات وخدمات الأسفلت والطرق",
    description: "تجربة مخصصة لأعمال السفلتة، من الفرادات والرصاصات إلى العمالة ومعدات الطرق.",
    image: "/images/categories/asphalt.jpg",
    accent: "#374151",
    filters: asphaltFilters,
    equipment: ["فرادات أسفلت", "رصاصات", "جريدر", "قشاطات", "قلابات", "معدات سفلتة"],
    services: ["عمالة أسفلت", "تسوية وتجهيز", "سفلتة مواقف", "سفلتة طرق داخلية"],
    stats: [{ label: "خدمات", value: "+16" }, { label: "معدات طرق", value: "+27" }, { label: "تسعير", value: "متر/يوم" }]
  },
  {
    slug: "lifting",
    arabicName: "رفع",
    seoTitle: "حلول الرفع والكرينات | فليت معدات",
    seoDescription: "كرينات ومان لفت وبوم لفت وفوركلفت مع فلاتر الطن وارتفاع الرفع وشهادة الفحص.",
    heroTitle: "حلول الرفع والتحميل الآمن",
    description: "معدات رفع فقط، مع فلاتر تشغيلية تناسب المقاولين والمصانع والمشاريع الصناعية.",
    image: "/images/categories/cranes.jpg",
    accent: "#D8A31E",
    filters: liftingFilters,
    equipment: ["كرينات", "مان لفت", "بوم لفت", "فوركلفت", "سلات رفع", "ونشات"],
    services: ["مشغل معتمد", "خطة رفع", "نقل المعدة", "شهادة فحص"],
    stats: [{ label: "سعات", value: "7-200 طن" }, { label: "معدات", value: "+80" }, { label: "فحص", value: "موثق" }]
  },
  {
    slug: "heavy-transport",
    arabicName: "نقل ثقيل",
    seoTitle: "النقل الثقيل واللوبدات | فليت معدات",
    seoDescription: "سطحات ولوبد وتريلات ونقل معدات مع فلاتر الحمولة وعدد المحاور وسعر المشوار.",
    heroTitle: "النقل الثقيل ونقل المعدات",
    description: "خيارات نقل ثقيل مرتبطة بالمعدات والمواقع، بدون إظهار معدات غير مرتبطة بالنقل.",
    image: "/images/categories/heavy-transport.jpg",
    accent: "#1F2937",
    filters: heavyTransportFilters,
    equipment: ["سطحات", "لوبد", "تريلات", "نقل معدات", "قلابات", "وايتات"],
    services: ["نقل داخل المدينة", "نقل بين المدن", "تجهيز مسار نقل", "تسعير بالمشوار"],
    stats: [{ label: "شاحنات", value: "+36" }, { label: "محاور", value: "حتى 5+" }, { label: "نطاق", value: "مدن المملكة" }]
  },
  {
    slug: "excavation",
    arabicName: "حفر",
    seoTitle: "معدات الحفر والبوكلينات | فليت معدات",
    seoDescription: "حلول حفر بمعدات بوكلين وبوبكات وقلابات مع تشغيل ونقل موثق.",
    heroTitle: "الحفر وتجهيز المواقع",
    description: "بوكلينات وحفارات ومعدات مساندة لأعمال الحفر والتجهيز.",
    image: "/images/categories/excavators.jpg",
    accent: "#111827",
    filters: backfillingFilters,
    equipment: ["حفارات", "بوكلينات", "بوبكات", "قلابات", "تنكر ماء"],
    services: ["حفر أساسات", "تحميل ونقل ناتج الحفر", "تشغيل بمشغل"],
    stats: [{ label: "حفارات", value: "+32" }, { label: "تشغيل", value: "مع مشغل" }, { label: "نقل", value: "متاح" }]
  },
  {
    slug: "demolition",
    arabicName: "تكسير",
    seoTitle: "معدات التكسير والهدم | فليت معدات",
    seoDescription: "معدات تكسير وهدم وبريكرات وحاويات مخلفات للمواقع.",
    heroTitle: "التكسير والهدم وإزالة المخلفات",
    description: "معدات تكسير وحاويات ونقل مخلفات مرتبطة بأعمال الهدم فقط.",
    image: "/images/categories/waste.jpg",
    accent: "#475569",
    filters: backfillingFilters,
    equipment: ["حفارات ببريكر", "بوبكات", "حاويات مخلفات", "قلابات", "كمبروسرات"],
    services: ["تكسير خرسانة", "إزالة مخلفات", "نقل مخلفات بناء"],
    stats: [{ label: "خدمات", value: "+12" }, { label: "حاويات", value: "+20" }, { label: "نقل", value: "متاح" }]
  },
  {
    slug: "industrial-sites",
    arabicName: "مواقع صناعية",
    seoTitle: "معدات المواقع الصناعية | فليت معدات",
    seoDescription: "مولدات وكمبروسرات ورافعات شوكية ومعدات تشغيل للمواقع الصناعية.",
    heroTitle: "تشغيل المواقع الصناعية",
    description: "معدات الطاقة والهواء والرفع والتشغيل اليومي للمصانع والمواقع الصناعية.",
    image: "/images/categories/generators.jpg",
    accent: "#2F855A",
    filters: concreteFilters,
    equipment: ["مولدات", "كمبروسرات", "فوركلفت", "مان لفت", "تنكر ديزل"],
    services: ["طاقة مؤقتة", "هواء مضغوط", "تشغيل مستودعات", "تزويد وقود"],
    stats: [{ label: "معدات", value: "+57" }, { label: "دعم", value: "ميداني" }, { label: "وقود", value: "متاح" }]
  },
  {
    slug: "finishing",
    arabicName: "تشطيب",
    seoTitle: "معدات وخدمات التشطيب | فليت معدات",
    seoDescription: "معدات تشطيب خرسانة وسقالات ومان لفت وخدمات مواقع.",
    heroTitle: "معدات وخدمات التشطيب",
    description: "حلول تشطيب وتشغيل خفيف للمواقع بعد الأعمال الثقيلة.",
    image: "/images/categories/boom-lifts.jpg",
    accent: "#0EA5E9",
    filters: liftingFilters,
    equipment: ["سقالات", "مان لفت", "بوم لفت", "معدات تشطيب خرسانة", "مولدات صغيرة"],
    services: ["تشطيب خرسانة", "أعمال ارتفاع", "تشغيل داخلي وخارجي"],
    stats: [{ label: "خدمات", value: "+18" }, { label: "ارتفاع", value: "حتى 32م" }, { label: "تشغيل", value: "مرن" }]
  },
  {
    slug: "construction-waste",
    arabicName: "مخلفات البناء",
    seoTitle: "نقل مخلفات البناء والهدم | حاويات وقلابات | فليت معدات",
    seoDescription: "خدمات متكاملة لنقل مخلفات البناء والهدم: حاويات 6-40 ياردة، قلابات، شيولات، بوبكات، تنظيف مواقع، رفع أنقاض وهدم وخرسانة. استلام خلال ساعتين.",
    heroTitle: "مخلفات البناء والهدم — حلول متكاملة",
    description: "حلول متكاملة لنقل مخلفات البناء والهدم وتنظيف مواقع المشاريع. من الحاويات والقلابات إلى الشيولات والبوبكات مع خدمة طوارئ 24 ساعة.",
    image: "/images/categories/waste.jpg",
    accent: "#64748B",
    filters: constructionWasteFilters,
    equipment: ["قلابات نقل الردميات", "شيول تحميل مخلفات", "بوبكات", "بوكلينات", "كرين رفع مخلفات", "عمال تحميل", "معدات تكسير خفيف"],
    services: [
      "حاويات مخلفات بناء", "نقل أنقاض وهدم", "رفع وترحيل الردميات", "إزالة مخلفات الخرسانة",
      "نقل الطوب والبلوك المكسر", "إزالة الحديد والخشب المتبقي", "تنظيف مواقع المشاريع",
      "تنظيف بعد الهدم", "تنظيف بعد الترميم", "تحميل مخلفات بالبكلين",
      "شفط ونقل المخلفات الثقيلة", "سطحات نقل المعدات الصغيرة"
    ],
    stats: [
      { label: "خدمات متخصصة", value: "+14" },
      { label: "أنواع الحاويات", value: "7" },
      { label: "استلام", value: "خلال 2 ساعة" },
      { label: "خدمة طوارئ", value: "24 ساعة" }
    ]
  },
  {
    slug: "emergency",
    arabicName: "خدمات طوارئ",
    seoTitle: "خدمات معدات طوارئ | فليت معدات",
    seoDescription: "حلول طوارئ للمعدات والنقل والطاقة والمياه في المواقع.",
    heroTitle: "خدمات طوارئ للمواقع",
    description: "معدات ونقل وطاقة ومياه عند الحاجة العاجلة لتشغيل الموقع.",
    image: "/images/categories/water-tanker.jpg",
    accent: "#0284C7",
    filters: heavyTransportFilters,
    equipment: ["سطحات", "مولدات", "تنكر ماء", "تنكر ديزل", "كرينات"],
    services: ["استجابة عاجلة", "نقل معدات", "تزويد مياه", "تزويد وقود"],
    stats: [{ label: "استجابة", value: "عاجلة" }, { label: "خدمات", value: "+20" }, { label: "تغطية", value: "مدن رئيسية" }]
  }
];

export function findServiceCategory(slug: string) {
  return serviceCategories.find((category) => category.slug === slug);
}

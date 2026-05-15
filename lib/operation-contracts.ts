export const operationStatuses = [
  "طلب جديد",
  "بانتظار عروض الموردين",
  "عرض مرسل",
  "بانتظار موافقة العميل",
  "بانتظار قبول المورد",
  "مؤكد",
  "المعدة في الطريق",
  "تم الوصول",
  "قيد التشغيل",
  "مكتمل",
  "ملغي",
  "متنازع عليه"
] as const;

export const supplierAgreement = {
  id: "SUP-AGR-001",
  supplierName: "مؤسسة الرافعات الخليجية",
  commercialNumber: "1010123456",
  vatNumber: "300123456700003",
  iban: "SA0380000000608010167519",
  contactPerson: "أحمد محمد العتيبي",
  commissionPercent: 10,
  status: "موقعة",
  acceptedAt: "2026-05-12 10:30",
  clauses: [
    "المورد مسؤول عن جاهزية وسلامة المعدات والمشغلين قبل قبول أي طلب.",
    "يلتزم المورد برفع صور حقيقية وحديثة للمعدة ومستندات السجل التجاري والآيبان.",
    "يلتزم المورد بسياسة الإلغاء والانتظار والتأخير المعتمدة داخل المنصة.",
    "يقبل المورد نظام التقييمات والشكاوى، ويحق للإدارة تعليق المورد المخالف.",
    "يمنع على المورد إتمام أي صفقة خارج المنصة مع عميل وصل إليه عن طريق المنصة لمدة 12 شهرًا من تاريخ أول طلب."
  ]
};

export const operationOrder = {
  id: "OP-2026-0048",
  requestId: "REQ-2026-118",
  status: "بانتظار قبول المورد",
  customerName: "شركة الإنشاءات السعودية",
  supplierName: "مؤسسة الرافعات الخليجية",
  equipmentType: "كرين 50 طن",
  city: "الرياض",
  siteLocation: "حي النرجس، الرياض",
  startsAt: "2026-05-18 07:00",
  duration: "5 أيام",
  dailyHours: "10 ساعات",
  dailyRate: 4200,
  transportCost: 1500,
  fuelResponsibility: "على العميل",
  extraHourRate: 550,
  waitingFee: 300,
  cancellationPolicy: "عند الإلغاء بعد تحرك المعدة يتحمل العميل رسوم النقل أو الانتظار المثبتة.",
  totalPrice: 22500,
  commissionPercent: 10,
  commissionAmount: 2100,
  supplierNet: 20400,
  customerAcceptedAt: "بانتظار موافقة العميل",
  supplierAcceptedAt: "بانتظار قبول المورد",
  payment: {
    amount: 11250,
    method: "تحويل بنكي / حسب الاتفاق",
    status: "دفعة مقدمة مسجلة",
    reference: "TRN-58291"
  },
  disputeStatus: "لا يوجد نزاع"
};

export const smartRequest = {
  id: "REQ-2026-118",
  city: "الرياض",
  siteLocation: "حي النرجس، الرياض",
  gpsCoordinates: "24.8151, 46.7049",
  fromCity: "الرياض",
  toCity: "الرياض",
  distanceEstimateKm: 18,
  nearestSupplier: "مؤسسة الرافعات الخليجية",
  workType: "رفع معدات تكييف لموقع تجاري",
  equipmentType: "كرين 50 طن",
  duration: "5 أيام",
  startsAt: "2026-05-18 07:00",
  operatorRequired: "نعم",
  transportRequired: "نعم",
  notes: "الدخول من البوابة الشرقية، ويلزم التنسيق مع أمن الموقع قبل الوصول.",
  attachments: ["رخصة دخول الموقع", "مخطط موقع الرفع"]
};

export const supplierOffers = [
  {
    id: "OFF-2026-301",
    supplierName: "مؤسسة الرافعات الخليجية",
    supplierLevel: "معتمد",
    equipment: "كرين 50 طن",
    price: 4200,
    pricingType: "يومي",
    arrivalTime: "خلال 6 ساعات",
    transportCost: 1500,
    extraHourRate: 550,
    waitingFee: 300,
    terms: "يشمل مشغل معتمد، الوقود على العميل، النقل مثبت في العرض.",
    status: "عرض مرسل"
  },
  {
    id: "OFF-2026-302",
    supplierName: "شركة حلول الرفع",
    supplierLevel: "مميز",
    equipment: "كرين تلسكوبي 70 طن",
    price: 5600,
    pricingType: "يومي",
    arrivalTime: "خلال 12 ساعة",
    transportCost: 1800,
    extraHourRate: 650,
    waitingFee: 350,
    terms: "يشمل شهادة فحص ومشغل. رسوم الانتظار تبدأ بعد ساعتين من الوصول.",
    status: "بانتظار موافقة العميل"
  }
];

export const notificationBlueprints = [
  { type: "NEW_REQUEST_TO_SUPPLIER", channel: "WHATSAPP", title: "طلب جديد للمورد", body: "تم إرسال طلب مناسب لمعداتك لمراجعته وإرسال عرض." },
  { type: "OFFER_SENT_TO_CUSTOMER", channel: "IN_APP", title: "عرض جديد للعميل", body: "وصل عرض سعر جديد ويمكنك مراجعته واختيار الأنسب." },
  { type: "OFFER_ACCEPTED", channel: "SMS", title: "تم قبول العرض", body: "تم قبول العرض وسيتم إنشاء أمر تشغيل إلكتروني." },
  { type: "EQUIPMENT_ARRIVED", channel: "WHATSAPP", title: "وصول المعدة", body: "تم تسجيل وصول المعدة للموقع مع وقت وGPS." },
  { type: "OPERATION_COMPLETED", channel: "EMAIL", title: "انتهاء التشغيل", body: "تم تسجيل انتهاء التشغيل وإثبات التسليم." }
];

export const fleetAssets = [
  {
    id: "FLT-001",
    name: "كرين Liebherr 50 طن",
    status: "متاح",
    plateNumber: "ر د م 4821",
    city: "الرياض",
    hourMeter: "4,820 ساعة",
    inspectionExpiry: "2026-08-20",
    insuranceExpiry: "2026-09-15",
    photos: ["صورة المعدة", "صورة اللوحة", "صورة العداد", "شهادة الفحص", "شهادة التأمين"]
  },
  {
    id: "FLT-002",
    name: "شيول CAT 966",
    status: "مؤجر",
    plateNumber: "د م م 2190",
    city: "الدمام",
    hourMeter: "7,140 ساعة",
    inspectionExpiry: "2026-06-10",
    insuranceExpiry: "2026-07-01",
    photos: ["صورة المعدة", "صورة العداد", "شهادة الفحص"]
  },
  {
    id: "FLT-003",
    name: "بوكلين CAT 320",
    status: "تحت الصيانة",
    plateNumber: "ج د ة 8812",
    city: "جدة",
    hourMeter: "6,330 ساعة",
    inspectionExpiry: "2026-05-30",
    insuranceExpiry: "2026-12-12",
    photos: ["صورة المعدة", "تقرير صيانة"]
  }
];

export const supplierLevels = ["جديد", "موثق", "معتمد", "مميز", "موقوف"];
export const supplierSubscriptionPlans = ["مجاني", "احترافي", "مميز"];

export const operationOrderTerms = [
  "المنصة وسيط تقني وتشغيلي بين العميل والمورد وليست مالكة للمعدات إلا إذا نص أمر التشغيل على خلاف ذلك.",
  "المورد مسؤول عن سلامة وجاهزية المعدة والمشغلين وصحة المستندات قبل بدء التشغيل.",
  "العميل مسؤول عن صحة الموقع وتسهيل الدخول والتصاريح ونطاق العمل المتفق عليه.",
  "لا يتم تسليم المعدة إلا بعد توثيق أمر التشغيل وتسجيل حالة الدفع أو الاتفاق اليدوي.",
  "صور الاستلام والتسليم ووقت الوصول وموقع GPS وعداد التشغيل تعد أدلة تشغيل داخل المنصة.",
  "أي نزاع يتم توثيقه في ملف نزاع وتراجعه الإدارة حسب الصور والوقت وGPS وعداد التشغيل."
];

export const handoverProof = {
  id: "HND-2026-0048",
  title: "إثبات الوصول والاستلام",
  photos: ["صورة المعدة قبل التشغيل", "صورة عداد الساعات", "صورة الموقع"],
  hourMeter: "4,820 ساعة",
  arrivedAt: "2026-05-18 06:52",
  gpsLocation: "24.8151, 46.7049",
  conditionNote: "المعدة سليمة وجاهزة للتشغيل، لا توجد ملاحظات ظاهرة.",
  confirmation: "توقيع العميل أو OTP لاحقًا"
};

export const returnProof = {
  id: "RTN-2026-0048",
  title: "إثبات انتهاء التشغيل والتسليم",
  photos: ["صور المعدة بعد التشغيل", "صورة عداد الساعات الجديد", "صورة موقع الإرجاع"],
  hourMeter: "4,872 ساعة",
  finishedAt: "2026-05-22 17:15",
  gpsLocation: "24.8151, 46.7049",
  conditionNote: "لا توجد أضرار مسجلة. يتم فتح نزاع عند وجود تلف أو تأخير.",
  confirmation: "توقيع العميل أو OTP لاحقًا"
};

export const shortRightsTerms = [
  "المنصة وسيط تقني بين العميل والمورد وليست مالكة للمعدات.",
  "المورد مسؤول عن سلامة وجاهزية المعدات والمشغلين.",
  "العميل مسؤول عن صحة الموقع وتسهيل الدخول والتصاريح.",
  "في حال الإلغاء بعد تحرك المعدة يتحمل العميل رسوم النقل أو الانتظار.",
  "في حال عطل المعدة بسبب المورد يتحمل المورد الاستبدال أو الخصم.",
  "أي نزاع يتم مراجعته حسب الصور، الوقت، GPS، وعداد التشغيل."
];

export const adminOperationActions = [
  "عرض كل الطلبات ومراجعة أوامر التشغيل",
  "مراجعة صور الاستلام والتسليم",
  "اعتماد الموردين أو إيقاف المورد المخالف",
  "تعديل نسبة العمولة",
  "فتح حالة نزاع أو إغلاقها بقرار إداري",
  "تصدير أمر التشغيل كملف PDF"
];

export const supplierOperationActions = [
  "عرض الطلبات المتاحة وقبول أو رفض الطلب",
  "إدخال السعر وتكلفة النقل ورسوم الانتظار",
  "رفع صور المعدة والسجل التجاري والآيبان",
  "تحديث حالة المعدة في الطريق والوصول والتشغيل",
  "عرض الأرباح والمستحقات والتقييمات والتنبيهات"
];

export const customerOperationActions = [
  "إنشاء طلب معدة واستلام عروض الموردين",
  "قبول العرض ومشاهدة أمر التشغيل",
  "تأكيد الاستلام وانتهاء التشغيل",
  "رفع شكوى عند وجود مشكلة",
  "تقييم المورد بعد اكتمال الطلب"
];

export const futureOperationIntegrations = [
  "WhatsApp notifications",
  "SMS OTP",
  "Online payment / Escrow",
  "GPS tracking",
  "Supplier ranking",
  "Dynamic pricing"
];

export function formatSar(value: number) {
  return `${value.toLocaleString("ar-SA")} ر.س`;
}

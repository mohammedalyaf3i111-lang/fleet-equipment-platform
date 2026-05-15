/**
 * Fleet Equipment Platform — Legal PDF Templates
 *
 * Client-side PDF generation using jsPDF + html2canvas.
 * All 7 legal document templates with Arabic-first content.
 * Cairo font embedded as base64 for proper RTL/Arabic shaping.
 */

import {
  CAIRO_AR_400,
  CAIRO_AR_700,
  CAIRO_AR_900,
  CAIRO_LA_400,
  CAIRO_LA_700,
} from "@/lib/_fontData";

export const LEGAL_DISCLAIMER =
  "هذه النماذج أولية ويجب مراجعتها واعتمادها من مستشار قانوني مرخص داخل المملكة العربية السعودية قبل استخدامها تجاريًا.";

export const LEGAL_DISCLAIMER_EN =
  "These are preliminary templates and must be reviewed and approved by a licensed legal advisor in Saudi Arabia before commercial use.";

export type DocumentFormData = {
  customerName: string;
  supplierName: string;
  phone: string;
  idOrCr: string;
  equipmentName: string;
  orderNumber: string;
  startDate: string;
  endDate: string;
  rentalValue: string;
  depositAmount: string;
  notes: string;
};

export const EMPTY_FORM: DocumentFormData = {
  customerName: "",
  supplierName: "",
  phone: "",
  idOrCr: "",
  equipmentName: "",
  orderNumber: "",
  startDate: "",
  endDate: "",
  rentalValue: "",
  depositAmount: "",
  notes: "",
};

export type LegalDocumentTemplate = {
  id: string;
  type: string;
  titleAr: string;
  titleEn: string;
  filename: string;
  descriptionAr: string;
  party1Label: string;
  party2Label: string;
  sections: string[];
};

export const LEGAL_TEMPLATES: LegalDocumentTemplate[] = [
  {
    id: "customer-rental-agreement",
    type: "CUSTOMER_RENTAL_AGREEMENT",
    titleAr: "عقد تأجير العميل",
    titleEn: "Customer Rental Agreement",
    filename: "customer-rental-agreement.pdf",
    descriptionAr: "عقد تأجير المعدات الموحد بين العميل ومنصة فليت معدات والمورد",
    party1Label: "العميل / الطرف الأول",
    party2Label: "المورد / الطرف الثاني",
    sections: [
      "بيانات العميل: الاسم، رقم الهوية أو السجل التجاري، بيانات التواصل، العنوان، والشخص المفوض بالتوقيع والقبول الإلكتروني.",
      "بيانات مزود المعدة: اسم المنشأة، السجل التجاري، الرقم الضريبي، بيانات التواصل، وإقرار صحة الملكية أو التفويض وجاهزية المعدة.",
      "بيانات المعدة: التصنيف، الماركة، الموديل، سنة الصنع، السعة، الرقم التسلسلي أو اللوحة، حالة المعدة، التأمين، وشهادة الفحص عند الحاجة.",
      "موقع العمل: لا يجوز نقل المعدة خارج الموقع أو النطاق المتفق عليه إلا بموافقة مكتوبة عبر المنصة.",
      "مدة الإيجار وساعات التشغيل: تبدأ المدة من وقت التسليم الموثق، وتحتسب أي ساعات أو أيام إضافية وفق سياسة التمديد والتأخير.",
      "السعر وضريبة القيمة المضافة: يوضح عرض السعر قيمة المعدة والنقل والمشغل والعمولة وضريبة القيمة المضافة بنسبة 15% والإجمالي المستحق.",
      "مبلغ التأمين والضمان: مبلغ التأمين قابل للخصم منه عند وجود تلف أو تأخير أو مستحقات أو مخالفات تشغيلية موثقة.",
      "شروط السداد: لا يتم تسليم المعدة إلا بعد تأكيد الدفع أو التأمين المطلوب من الإدارة.",
      "غرامة التأخير: عند التأخر في الإرجاع، تحتسب غرامة يومية افتراضية تعادل سعر اليوم مضروبًا في 1.5 ما لم ينص العرض على خلاف ذلك.",
      "مسؤولية التلف: العميل مسؤول عن أي تلف ينتج عن سوء الاستخدام أو التشغيل خارج الموقع أو خارج الغرض المتفق عليه.",
      "التوقيع الإلكتروني: قبول العميل بالاسم ورقم الهوية أو السجل التجاري والوقت وعنوان IP يعد قبولًا إلكترونيًا ملزمًا داخل المنصة.",
    ],
  },
  {
    id: "supplier-platform-agreement",
    type: "SUPPLIER_PLATFORM_AGREEMENT",
    titleAr: "اتفاقية منصة المورد",
    titleEn: "Supplier Platform Agreement",
    filename: "supplier-platform-agreement.pdf",
    descriptionAr: "اتفاقية انضمام المورد إلى منصة فليت معدات وتشغيل معداته",
    party1Label: "المورد / الطرف الأول",
    party2Label: "المنصة / الطرف الثاني",
    sections: [
      "بيانات المورد: اسم المنشأة، السجل التجاري، الرقم الضريبي، الترخيص، بيانات الممثل القانوني، وعنوان التواصل الرسمي.",
      "التزامات المورد: صحة ملكية المعدات وسلامتها وتوفر التأمين الساري والفحص الدوري وصحة الوثائق المقدمة.",
      "رسوم المنصة والعمولة: نسبة العمولة المتفق عليها لكل عملية تأجير مكتملة، وآلية تسوية المستحقات.",
      "قبول وإدارة الطلبات: المورد ملزم بالرد على الطلبات المعينة خلال المدة المحددة وعدم التأخر في التسليم.",
      "معايير الاعتماد: لا يحق للمورد عرض معدات غير معتمدة أو غير مؤمنة أو غير خاضعة للفحص الموثق.",
      "تجميد الحساب: يحق للمنصة تجميد الحساب عند وجود شكاوى متكررة أو مخالفات موثقة أو عدم الالتزام بالاتفاقية.",
      "مدة الاتفاقية والتجديد: الاتفاقية سارية لمدة سنة قابلة للتجديد التلقائي ما لم يخطر أحد الطرفين الآخر بعدم التجديد.",
      "فسخ الاتفاقية: يحق لأي طرف إنهاء الاتفاقية بإشعار مسبق لا يقل عن 30 يومًا مع استيفاء جميع الالتزامات القائمة.",
    ],
  },
  {
    id: "equipment-delivery-form",
    type: "EQUIPMENT_HANDOVER_FORM",
    titleAr: "نموذج تسليم المعدة",
    titleEn: "Equipment Delivery Form",
    filename: "equipment-delivery-form.pdf",
    descriptionAr: "نموذج توثيق استلام وتسليم المعدة عند بداية الإيجار",
    party1Label: "المسلِّم (المورد أو الناقل)",
    party2Label: "المستلِم (العميل أو ممثله)",
    sections: [
      "بيانات المعدة: نوع المعدة، الماركة، الموديل، الرقم التسلسلي أو رقم اللوحة، رقم الطلب المرتبط.",
      "حالة المعدة عند التسليم: الوصف العام، الخدوش والتلفيات القائمة إن وجدت، الصور التوثيقية المرفقة.",
      "قراءة عداد الساعات عند التسليم: يُدوَّن الرقم الدقيق لساعات التشغيل كما يظهر على العداد.",
      "مستوى الوقود عند التسليم: فارغ / ربع / نصف / ثلاثة أرباع / ممتلئ.",
      "الملحقات والأدوات: قائمة بالملحقات المسلَّمة مع المعدة وعدد كل قطعة.",
      "الموقع والوقت: عنوان موقع التسليم، تاريخ التسليم، وقت التسليم بالضبط.",
      "بيانات الناقل: اسم السائق أو الناقل، رقم اللوحة، ورقم التواصل للتحقق.",
      "إقرار المستلم: يُقر المستلم باستلام المعدة بالحالة الموثقة أعلاه وبالملحقات المذكورة وأن المعدة جاهزة للتشغيل.",
    ],
  },
  {
    id: "equipment-return-form",
    type: "EQUIPMENT_RETURN_FORM",
    titleAr: "نموذج إرجاع المعدة",
    titleEn: "Equipment Return Form",
    filename: "equipment-return-form.pdf",
    descriptionAr: "نموذج توثيق إرجاع المعدة عند نهاية فترة الإيجار",
    party1Label: "المُرجِع (العميل أو ممثله)",
    party2Label: "المستلِم (المورد أو الناقل)",
    sections: [
      "بيانات المعدة: نوع المعدة، الماركة، الموديل، الرقم التسلسلي، رقم الطلب المرتبط.",
      "حالة المعدة عند الإرجاع: الوصف العام للحالة مقارنةً بحالة الاستلام الموثقة في نموذج التسليم.",
      "قراءة عداد الساعات عند الإرجاع: يُدوَّن الرقم الدقيق لساعات التشغيل للمقارنة مع الاستلام.",
      "مستوى الوقود عند الإرجاع: فارغ / ربع / نصف / ثلاثة أرباع / ممتلئ.",
      "الملحقات المُرجَعة: قائمة بالملحقات المُرجَعة مطابقةً لنموذج التسليم مع الإشارة لأي فقدان.",
      "التأخير: تاريخ الإرجاع المتفق عليه مقابل التاريخ الفعلي وحساب الغرامة إن وجدت وفق الاتفاق.",
      "التلف أو الفقدان: وصف أي تلف جديد ظهر خلال فترة الإيجار وفق التوثيق بالصور والتقارير.",
      "إقرار الاستلام: يُقر مستلم المعدة باستلامها بالحالة الموثقة أعلاه وبالملحقات المذكورة.",
    ],
  },
  {
    id: "damage-report",
    type: "DAMAGE_REPORT",
    titleAr: "تقرير أضرار",
    titleEn: "Damage Report",
    filename: "damage-report.pdf",
    descriptionAr: "تقرير توثيق الأضرار والتلفيات للمعدة المستأجرة",
    party1Label: "مقدم التقرير",
    party2Label: "المورد / الطرف المتضرر",
    sections: [
      "بيانات الطلب: رقم الطلب، اسم العميل، اسم المورد، نوع المعدة، فترة الإيجار الكاملة.",
      "وصف الضرر: وصف تفصيلي للتلف أو الضرر مع بيان موقعه الدقيق على المعدة.",
      "سبب الضرر: تقييم سبب الضرر (سوء استخدام / حادث / قوة قاهرة / عيب مصنعي / إهمال).",
      "صور الضرر: يُشار إلى الصور المرفقة وتواريخها وأوصافها ومرجع كل صورة.",
      "التقييم المبدئي للإصلاح: تقدير تكلفة الإصلاح بالريال السعودي بناءً على كشف أولي من الجهة المختصة.",
      "قراءات العداد: ساعات التشغيل عند اكتشاف الضرر ومقارنتها بحالة الاستلام في نموذج التسليم.",
      "مسؤولية الطرف المتسبب: تحديد الطرف المسؤول بناءً على الأدلة والتوثيق المرفق والسياسة المتفق عليها.",
      "قرار الإدارة: يُحفظ هذا التقرير كملف نزاع ويُحال للمراجعة التشغيلية من قِبل إدارة المنصة.",
    ],
  },
  {
    id: "payment-acknowledgement",
    type: "PAYMENT_ACKNOWLEDGMENT",
    titleAr: "إقرار دفع",
    titleEn: "Payment Acknowledgement",
    filename: "payment-acknowledgement.pdf",
    descriptionAr: "إقرار استلام الدفعة وتأكيد المعاملة المالية",
    party1Label: "الدافع / العميل",
    party2Label: "المستفيد / المنصة",
    sections: [
      "بيانات الدفع: رقم الطلب، المبلغ الإجمالي، قيمة ضريبة القيمة المضافة (15%)، المبلغ الصافي.",
      "مبلغ التأمين: قيمة مبلغ التأمين المدفوع والشروط المتعلقة باسترداده عند انتهاء الإيجار.",
      "طريقة الدفع: تحويل بنكي / نقدي / شيك / نظام سداد / MADA / Visa / Mastercard.",
      "رقم الإيصال أو الحوالة: المرجع البنكي أو رقم الإيصال لتوثيق الدفعة وتتبعها.",
      "تاريخ ووقت الدفع: التاريخ والوقت الفعلي لاستلام الدفعة أو تأكيدها من قِبل الإدارة.",
      "المبالغ المتبقية: أي أقساط أو مبالغ متبقية مستحقة الدفع في مواعيد لاحقة محددة.",
      "الغرض من الدفع: رقم الطلب أو العقد المرتبط بهذه الدفعة بشكل مباشر.",
      "إقرار المنصة: تُقر المنصة باستلام الدفعة المذكورة وتفعيل الطلب المرتبط بها وفق الشروط المتفق عليها.",
    ],
  },
  {
    id: "cancellation-report",
    type: "CANCELLATION_REPORT",
    titleAr: "تقرير إلغاء",
    titleEn: "Cancellation Report",
    filename: "cancellation-report.pdf",
    descriptionAr: "تقرير توثيق إلغاء الطلب وحساب المبالغ المستردة",
    party1Label: "طالب الإلغاء",
    party2Label: "الطرف الآخر / المنصة",
    sections: [
      "بيانات الطلب الملغى: رقم الطلب، تاريخ الطلب الأصلي، حالة الطلب عند الإلغاء.",
      "سبب الإلغاء: السبب التفصيلي للإلغاء من العميل أو المورد أو المنصة مع توثيق المبرر.",
      "مرحلة الإلغاء: هل تم الإلغاء قبل التسليم أو بعد التسليم أو أثناء فترة الإيجار الفعلية.",
      "حساب رسوم الإلغاء: وفق السياسة المنشورة: إلغاء مبكر / متأخر / بعد التسليم مع التفاصيل.",
      "المبلغ المستحق الاسترداد: المبلغ المدفوع مطروحًا منه رسوم الإلغاء والمصاريف الفعلية.",
      "مبلغ التأمين: حالة مبلغ التأمين (مستردّ كاملًا / محتجز جزئيًا / محتجز كليًا مع السبب).",
      "آلية الاسترداد: طريقة استرداد المبلغ والمدة المتوقعة للتحويل (5-7 أيام عمل).",
      "إقرار الأطراف: يُقر الطرفان بصحة بيانات الإلغاء وقبول شروط الاسترداد المحددة في هذا التقرير.",
    ],
  },
];

/** Generate a unique reference number for a document */
export function generateReferenceNumber(type: string): string {
  const prefix = type
    .split("_")
    .map((w) => w[0] ?? "X")
    .join("")
    .slice(0, 4)
    .toUpperCase();
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `FE-${prefix}-${ts}-${rnd}`;
}

/** Inline font-face CSS with embedded Cairo base64 data */
function getCairoFontCSS(): string {
  return `
@font-face {
  font-family: 'Cairo';
  src: url('data:font/woff2;base64,${CAIRO_AR_400}') format('woff2');
  font-weight: 400;
  font-style: normal;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;
}
@font-face {
  font-family: 'Cairo';
  src: url('data:font/woff2;base64,${CAIRO_AR_700}') format('woff2');
  font-weight: 700;
  font-style: normal;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;
}
@font-face {
  font-family: 'Cairo';
  src: url('data:font/woff2;base64,${CAIRO_AR_900}') format('woff2');
  font-weight: 900;
  font-style: normal;
  unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF;
}
@font-face {
  font-family: 'Cairo';
  src: url('data:font/woff2;base64,${CAIRO_LA_400}') format('woff2');
  font-weight: 400;
  font-style: normal;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Cairo';
  src: url('data:font/woff2;base64,${CAIRO_LA_700}') format('woff2');
  font-weight: 700;
  font-style: normal;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;
}

/** Build the full HTML document string for a legal document */
export function buildDocumentHTML(
  template: LegalDocumentTemplate,
  formData: DocumentFormData,
  refNumber: string
): string {
  const now = new Date();
  const dateStr = now.toLocaleDateString("ar-SA-u-nu-latn", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("ar-SA-u-nu-latn", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const partyName = formData.customerName || formData.supplierName || "—";

  const row = (label: string, value: string) =>
    `<div style="display:flex;border-bottom:1px solid #E2E8F0;font-size:12px;line-height:1.6;">
       <div style="padding:9px 14px;font-weight:700;color:#475569;width:44%;background:#F8FAFC;flex-shrink:0;font-family:'Cairo',Tahoma,sans-serif;">${label}</div>
       <div style="padding:9px 14px;color:#0F172A;flex:1;font-family:'Cairo',Tahoma,sans-serif;">${value || "—"}</div>
     </div>`;

  const sectionItem = (text: string, idx: number) =>
    `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #F1F5F9;align-items:flex-start;">
       <span style="color:#D8A31E;font-weight:900;font-size:13px;flex-shrink:0;margin-top:2px;font-family:'Cairo',Tahoma,sans-serif;">${idx + 1}.</span>
       <span style="font-size:12px;line-height:1.85;color:#334155;font-family:'Cairo',Tahoma,sans-serif;">${text}</span>
     </div>`;

  const attachItem = (num: string, label: string) =>
    `<div style="display:flex;border-bottom:1px solid #E2E8F0;font-size:12px;line-height:1.6;">
       <div style="padding:9px 14px;font-weight:700;color:#475569;width:44%;background:#F8FAFC;flex-shrink:0;font-family:'Cairo',Tahoma,sans-serif;">${num}. ${label}</div>
       <div style="padding:9px 14px;color:#64748B;font-family:'Cairo',Tahoma,sans-serif;">&#9744; مرفق</div>
     </div>`;

  const sectionHead = (text: string) =>
    `<div style="font-size:11px;font-weight:800;color:#D8A31E;letter-spacing:0.5px;margin-bottom:12px;text-transform:uppercase;font-family:'Cairo',Tahoma,sans-serif;">${text}</div>`;

  return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
<meta charset="UTF-8"/>
<style>
  ${getCairoFontCSS()}
  * { margin:0; padding:0; box-sizing:border-box; }
  body { background:#fff; }
  .fe-doc {
    font-family: 'Cairo', Tahoma, Arial, sans-serif;
    font-size: 13px;
    color: #0F172A;
    background: #fff;
    width: 794px;
    direction: rtl;
    line-height: 1.6;
  }
</style>
</head>
<body>
<div class="fe-doc">

<!-- ═══ HEADER ═══ -->
<div style="background:#07162A;color:#fff;padding:28px 36px;display:flex;justify-content:space-between;align-items:flex-start;">
  <div>
    <div style="font-size:22px;font-weight:900;color:#D8A31E;letter-spacing:-0.5px;font-family:'Cairo',Tahoma,sans-serif;">فليت معدات</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.65);margin-top:3px;font-family:'Cairo',Tahoma,sans-serif;">Fleet Equipment Platform</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;font-family:'Cairo',Tahoma,sans-serif;">منصة تأجير المعدات وإدارة الأساطيل — المملكة العربية السعودية</div>
  </div>
  <div style="text-align:left;">
    <div style="font-size:10px;color:rgba(255,255,255,0.5);font-family:'Cairo',Tahoma,sans-serif;">رقم المرجع / Reference No.</div>
    <div style="font-size:13px;font-weight:700;color:#D8A31E;margin-top:3px;font-family:'Cairo',Tahoma,sans-serif;">${refNumber}</div>
    <div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:8px;font-family:'Cairo',Tahoma,sans-serif;">تاريخ التوليد</div>
    <div style="font-size:12px;font-weight:700;color:#fff;margin-top:2px;font-family:'Cairo',Tahoma,sans-serif;">${dateStr}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.65);font-family:'Cairo',Tahoma,sans-serif;">${timeStr}</div>
  </div>
</div>

<!-- GOLD BAR -->
<div style="height:4px;background:linear-gradient(90deg,#D8A31E,#F2B705);"></div>

<!-- ═══ TITLE ═══ -->
<div style="padding:22px 36px 16px;border-bottom:2px solid #F1F5F9;">
  <div style="font-size:21px;font-weight:900;color:#07162A;font-family:'Cairo',Tahoma,sans-serif;">${template.titleAr}</div>
  <div style="font-size:12px;color:#64748B;margin-top:4px;font-family:'Cairo',Tahoma,sans-serif;">${template.titleEn}</div>
  <div style="margin-top:10px;display:inline-flex;align-items:center;gap:6px;background:#FEF3C7;border:1px solid #FCD34D;border-radius:20px;padding:4px 12px;">
    <span style="font-size:10px;">&#9888;</span>
    <span style="font-size:11px;font-weight:700;color:#92400E;font-family:'Cairo',Tahoma,sans-serif;">مسودة قانونية — يتطلب اعتماد قانوني قبل الاستخدام التجاري</span>
  </div>
</div>

<!-- ═══ PARTY DATA ═══ -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("بيانات الأطراف — Parties Information")}
  <div style="border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">
    ${row("اسم العميل / Customer", formData.customerName)}
    ${row("اسم المورد / Supplier", formData.supplierName)}
    ${row("رقم الجوال / Phone", formData.phone)}
    ${row("رقم الهوية أو السجل التجاري / ID or CR", formData.idOrCr)}
  </div>
</div>

<!-- ═══ EQUIPMENT DATA ═══ -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("بيانات المعدة والطلب — Equipment & Order Details")}
  <div style="border:1px solid #E2E8F0;border-radius:6px;overflow:hidden;">
    ${row("اسم المعدة / Equipment Name", formData.equipmentName)}
    ${row("رقم الطلب / Order Number", formData.orderNumber)}
    ${row("تاريخ بداية الإيجار / Start Date", formData.startDate)}
    ${row("تاريخ نهاية الإيجار / End Date", formData.endDate)}
    ${row("قيمة الإيجار — ر.س / Rental Value SAR", formData.rentalValue ? `${formData.rentalValue} ر.س` : "—")}
    ${row("مبلغ التأمين — ر.س / Deposit SAR", formData.depositAmount ? `${formData.depositAmount} ر.س` : "—")}
  </div>
</div>

<!-- ═══ TERMS & SECTIONS ═══ -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("بنود العقد والشروط الأساسية — Key Terms & Conditions")}
  ${template.sections.map((s, i) => sectionItem(s, i)).join("")}
</div>

${
  formData.notes
    ? `<!-- NOTES -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("ملاحظات إضافية — Additional Notes")}
  <div style="padding:14px 16px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:6px;font-size:12px;line-height:1.85;color:#334155;font-family:'Cairo',Tahoma,sans-serif;">${formData.notes}</div>
</div>`
    : ""
}

<!-- ═══ SIGNATURES ═══ -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("توقيعات الأطراف — Signatures")}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
    <div style="border:1px solid #CBD5E1;border-radius:6px;padding:16px;background:#F8FAFC;">
      <div style="font-size:11px;font-weight:800;color:#64748B;margin-bottom:8px;font-family:'Cairo',Tahoma,sans-serif;">${template.party1Label}</div>
      <div style="border-bottom:1px dashed #94A3B8;height:44px;margin-bottom:8px;"></div>
      <div style="font-size:11px;color:#94A3B8;font-family:'Cairo',Tahoma,sans-serif;">التوقيع والختم</div>
      <div style="font-size:11px;color:#94A3B8;margin-top:8px;font-family:'Cairo',Tahoma,sans-serif;">التاريخ: _______ / _______ / _______</div>
    </div>
    <div style="border:1px solid #CBD5E1;border-radius:6px;padding:16px;background:#F8FAFC;">
      <div style="font-size:11px;font-weight:800;color:#64748B;margin-bottom:8px;font-family:'Cairo',Tahoma,sans-serif;">${template.party2Label}</div>
      <div style="border-bottom:1px dashed #94A3B8;height:44px;margin-bottom:8px;"></div>
      <div style="font-size:11px;color:#94A3B8;font-family:'Cairo',Tahoma,sans-serif;">التوقيع والختم</div>
      <div style="font-size:11px;color:#94A3B8;margin-top:8px;font-family:'Cairo',Tahoma,sans-serif;">التاريخ: _______ / _______ / _______</div>
    </div>
  </div>
</div>

<!-- ═══ DIGITAL ACCEPTANCE ═══ -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("القبول الرقمي — Digital Acceptance")}
  <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;padding:14px;">
    <div style="font-size:12px;font-weight:700;color:#1E40AF;margin-bottom:8px;font-family:'Cairo',Tahoma,sans-serif;">إقرار القبول الإلكتروني</div>
    <div style="font-size:11px;color:#334155;line-height:1.85;margin-bottom:10px;font-family:'Cairo',Tahoma,sans-serif;">
      بقبول هذا النموذج إلكترونيًا أو بالتوقيع يدويًا، يُقر الطرف الأول بأنه اطلع على جميع بنود هذه الوثيقة وفهمها ووافق عليها وفق الأنظمة المعمول بها في المملكة العربية السعودية.
    </div>
    <div style="border:1px solid #BFDBFE;border-radius:4px;overflow:hidden;">
      ${row("الاسم الكامل / Full Name", partyName)}
      ${row("رقم الهوية / السجل التجاري", formData.idOrCr)}
      ${row("وقت القبول / Acceptance Time", `${dateStr} — ${timeStr}`)}
      ${row("رقم المرجع / Reference", refNumber)}
    </div>
  </div>
</div>

<!-- ═══ ATTACHMENTS ═══ -->
<div style="padding:16px 36px;border-bottom:1px solid #F1F5F9;">
  ${sectionHead("المرفقات — Attachments")}
  <div style="border:1px dashed #CBD5E1;border-radius:6px;overflow:hidden;">
    ${attachItem("1", "عرض السعر المعتمد")}
    ${attachItem("2", "صور المعدة قبل وبعد الاستلام")}
    ${attachItem("3", "إثبات الدفع أو التحويل البنكي")}
    ${attachItem("4", "وثائق الهوية أو السجل التجاري")}
    ${attachItem("5", "شهادة الفحص والتأمين للمعدة")}
  </div>
</div>

<!-- ═══ FOOTER ═══ -->
<div style="background:#F8FAFC;border-top:3px solid #D8A31E;padding:16px 36px;">
  <div style="background:#FEF3C7;border:1px solid #FCD34D;border-right:4px solid #D97706;border-radius:4px;padding:12px 16px;">
    <div style="font-size:11px;font-weight:700;color:#78350F;line-height:1.85;font-family:'Cairo',Tahoma,sans-serif;">
      &#9888;&#65039; تحذير قانوني: ${LEGAL_DISCLAIMER}
    </div>
    <div style="font-size:10px;color:#92400E;margin-top:4px;font-style:italic;font-family:'Cairo',Tahoma,sans-serif;">
      &#9888; Legal Notice: ${LEGAL_DISCLAIMER_EN}
    </div>
  </div>
  <div style="display:flex;justify-content:space-between;margin-top:12px;font-size:10px;color:#94A3B8;font-family:'Cairo',Tahoma,sans-serif;">
    <span>فليت معدات | Fleet Equipment Platform</span>
    <span>${refNumber}</span>
    <span>${dateStr}</span>
  </div>
</div>

</div><!-- /.fe-doc -->
</body>
</html>`;
}

/** Generate and download a legal document as PDF */
export async function generateLegalDocumentPDF(
  templateId: string,
  formData: DocumentFormData
): Promise<void> {
  const template = LEGAL_TEMPLATES.find((t) => t.id === templateId);
  if (!template) throw new Error(`Template not found: ${templateId}`);

  const refNumber = generateReferenceNumber(template.type);
  const html = buildDocumentHTML(template, formData, refNumber);

  // Dynamic imports — browser-only, never run on server
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  // Create a hidden rendering container
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;top:-99999px;left:-99999px;width:794px;background:#fff;z-index:-1;overflow:visible;";
  container.innerHTML = html;
  document.body.appendChild(container);

  // Wait for Cairo font to load (injected @font-face from innerHTML)
  await document.fonts.ready;

  try {
    // Target the .fe-doc wrapper (not <body> — body selector won't work inside a div)
    const docEl =
      (container.querySelector(".fe-doc") as HTMLElement) ?? container;

    const canvas = await html2canvas(docEl, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageW = pdf.internal.pageSize.getWidth(); // 210 mm
    const pageH = pdf.internal.pageSize.getHeight(); // 297 mm
    const imgH = (canvas.height * pageW) / canvas.width;

    let remaining = imgH;
    let yOffset = 0;

    pdf.addImage(imgData, "JPEG", 0, yOffset, pageW, imgH);
    remaining -= pageH;

    while (remaining > 0) {
      yOffset = remaining - imgH;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, yOffset, pageW, imgH);
      remaining -= pageH;
    }

    pdf.save(template.filename);
  } finally {
    document.body.removeChild(container);
  }
}

/** Open a browser preview of the document (new tab) */
export function previewLegalDocument(
  templateId: string,
  formData: DocumentFormData
): void {
  const template = LEGAL_TEMPLATES.find((t) => t.id === templateId);
  if (!template) return;

  const refNumber = generateReferenceNumber(template.type);
  const html = buildDocumentHTML(template, formData, refNumber);

  const win = window.open("", "_blank", "width=900,height=800,scrollbars=yes");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
}

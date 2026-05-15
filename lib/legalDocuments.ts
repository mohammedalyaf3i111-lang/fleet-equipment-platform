import PDFDocument from "pdfkit";
import { PassThrough } from "node:stream";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { brand } from "@/lib/brand";

export type PublicLegalDocument = {
  slug: string;
  title: string;
  version: string;
  status: "Published" | "Draft" | "Archived";
  updatedAt: string;
  description: string;
  content: string[];
  notes: string[];
  downloadable: boolean;
  acceptanceRequired?: boolean;
};

export const legalDocuments: PublicLegalDocument[] = [
  {
    slug: "terms",
    title: "الشروط والأحكام",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "الإطار العام لاستخدام منصة فليت معدات وحقوق والتزامات المستخدمين.",
    content: [
      "تعمل منصة فليت معدات كوسيط تقني وتشغيلي يربط العملاء بمزودي المعدات والخدمات، ولا تعد مالكة للمعدات إلا إذا ورد نص صريح بخلاف ذلك.",
      "يلتزم العميل بصحة بيانات الموقع وتسهيل دخول المعدات وتوفير التصاريح اللازمة للعمل داخل الموقع.",
      "يلتزم مزود المعدات بصحة بياناته وجاهزية وسلامة المعدات والمشغلين والمستندات النظامية.",
      "تخضع الأسعار والرسوم والضريبة والعمولة لما يظهر في عرض السعر أو أمر التشغيل المعتمد داخل المنصة.",
      "أي نزاع يتم توثيقه ومراجعته بناء على الصور والوقت والموقع وعداد التشغيل والملاحظات المثبتة داخل المنصة."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة.", "يجب مراجعة هذه الشروط من مستشار قانوني مرخص داخل المملكة العربية السعودية قبل الاستخدام التجاري النهائي."],
    downloadable: true,
    acceptanceRequired: true
  },
  {
    slug: "privacy",
    title: "سياسة الخصوصية",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "توضح طريقة جمع واستخدام وحماية بيانات العملاء والموردين داخل المنصة.",
    content: [
      "تجمع المنصة بيانات التسجيل والطلبات والمستندات والمرفقات اللازمة لتشغيل خدمة تأجير المعدات.",
      "تستخدم البيانات لغرض التحقق، إنشاء الطلبات، إصدار أوامر التشغيل، إدارة النزاعات، والتواصل التشغيلي.",
      "لا تتم مشاركة البيانات مع أطراف خارجية إلا لغرض تنفيذ الخدمة أو الامتثال للمتطلبات النظامية أو بناء على موافقة المستخدم.",
      "تطبق المنصة ضوابط وصول داخلية وسجل عمليات لحماية البيانات من الاستخدام غير المصرح."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "customer-agreement",
    title: "اتفاقية العميل",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "تنظم علاقة العميل بالمنصة عند طلب المعدات أو الخدمات.",
    content: [
      "يقر العميل بأن جميع بيانات الطلب والموقع والمدة والغرض من التشغيل صحيحة ومحدثة.",
      "لا يحق للعميل تشغيل المعدة خارج الموقع أو الغرض المتفق عليه في أمر التشغيل.",
      "يتحمل العميل رسوم الإلغاء أو الانتظار أو النقل عند تحرك المعدة وفق السياسة المعتمدة.",
      "يتحمل العميل أي تلف أو تأخير ناتج عن سوء الاستخدام أو مخالفة شروط التشغيل."
    ],
    notes: ["يتطلب قبولًا إلكترونيًا عند إكمال الطلب."],
    downloadable: true,
    acceptanceRequired: true
  },
  {
    slug: "supplier-agreement",
    title: "اتفاقية مزود المعدات",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "تنظم اعتماد الموردين ومسؤولياتهم التشغيلية والتجارية داخل فليت معدات.",
    content: [
      "يلتزم المورد بصحة بيانات المؤسسة والسجل التجاري والآيبان والمستندات المرفوعة.",
      "يلتزم المورد بجاهزية وسلامة المعدات ورفع صور حقيقية ومحدثة لكل معدة.",
      "يقبل المورد عمولة المنصة وسياسات الإلغاء والتأخير والتلف والنزاعات.",
      "يمنع على المورد إتمام أي صفقة خارج المنصة مع عميل وصل إليه عن طريق المنصة لمدة 12 شهرًا من تاريخ أول طلب."
    ],
    notes: ["لا يعتمد المورد إلا بعد قبول هذه الاتفاقية ورفع المستندات المطلوبة."],
    downloadable: true,
    acceptanceRequired: true
  },
  {
    slug: "equipment-rental-contract",
    title: "عقد تأجير المعدة",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "قالب عقد تشغيلي يربط العميل والمورد والمعدة والموقع والمدة والسعر.",
    content: [
      "يتضمن العقد بيانات المنصة والعميل والمورد والمعدة وموقع العمل ومدة الإيجار وساعات التشغيل المسموحة.",
      "لا يتم تسليم المعدة إلا بعد تأكيد الدفع أو مبلغ الضمان المطلوب حسب أمر التشغيل.",
      "يمنع نقل المعدة خارج الموقع المتفق عليه أو تشغيلها بواسطة شخص غير مصرح.",
      "صور الاستلام والتسليم وعداد الساعات تعتبر دليلًا معتمدًا داخل المنصة.",
      "للمنصة حق إيقاف الخدمة عند عدم السداد أو وجود مخالفة تشغيلية جوهرية."
    ],
    notes: ["هذه النماذج أولية ويجب مراجعتها واعتمادها من مستشار قانوني مرخص داخل المملكة العربية السعودية قبل استخدامها تجاريًا."],
    downloadable: true,
    acceptanceRequired: true
  },
  {
    slug: "cancellation-policy",
    title: "سياسة الإلغاء",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "تحدد أثر إلغاء الطلب قبل وبعد تحرك المعدة.",
    content: [
      "يمكن إلغاء الطلب قبل اعتماد العرض دون رسوم تشغيلية ما لم توجد تكاليف موثقة.",
      "إذا تم الإلغاء بعد تحرك المعدة، يتحمل العميل رسوم النقل أو الانتظار المثبتة.",
      "في حال تعذر تنفيذ الطلب بسبب المورد، يحق للمنصة طلب بديل أو تطبيق خصم تشغيلي."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "delay-penalties",
    title: "سياسة التأخير والغرامات",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "توضح رسوم التأخير والانتظار وساعات التشغيل الإضافية.",
    content: [
      "تحسب ساعات التشغيل الإضافية وفق السعر المحدد في أمر التشغيل.",
      "تحسب رسوم الانتظار عند تعطيل المعدة أو المشغل بسبب الموقع أو التصاريح.",
      "يتحمل الطرف المتسبب بالتأخير الرسوم المثبتة في الصور والوقت والموقع وسجل التشغيل."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "damage-policy",
    title: "سياسة التلف والأضرار",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "تحدد مسؤولية الأضرار وإثبات الحالة عند التسليم والإرجاع.",
    content: [
      "العميل مسؤول عن أي تلف ينتج عن سوء الاستخدام أو التشغيل خارج الغرض المتفق عليه.",
      "المورد مسؤول عن جاهزية المعدة وسلامتها قبل التسليم وصحة مستندات الفحص والتأمين.",
      "يتم تقييم التلف بناء على صور قبل وبعد التشغيل وعداد الساعات والملاحظات المثبتة."
    ],
    notes: ["أي خلاف يتم فتح ملف نزاع له داخل المنصة."],
    downloadable: true
  },
  {
    slug: "insurance-deposit-policy",
    title: "سياسة التأمين ومبلغ الضمان",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "توضح آلية مبلغ الضمان والخصم والاسترداد.",
    content: [
      "قد يتطلب الطلب مبلغ ضمان ثابت أو نسبة من قيمة التشغيل حسب نوع المعدة والمخاطر التشغيلية.",
      "مبلغ الضمان قابل للخصم منه عند وجود تلف أو تأخير أو مستحقات موثقة.",
      "يتم رد المبلغ المتبقي بعد إغلاق الطلب وتوثيق الإرجاع وعدم وجود نزاع مفتوح."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "dispute-policy",
    title: "سياسة النزاعات",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "تحدد طريقة فتح ومراجعة وإغلاق النزاعات داخل المنصة.",
    content: [
      "يفتح النزاع عند وجود تلف أو تأخير أو عدم سداد أو اختلاف في المعدة أو مشكلة تشغيلية.",
      "تراجع الإدارة الأدلة المرفوعة من الطرفين وتشمل الصور والموقع والوقت وعداد التشغيل.",
      "تصدر الإدارة قرارًا تشغيليًا داخل المنصة، ويمكن تصعيد النزاع قانونيًا عند الحاجة."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "disclaimer",
    title: "إخلاء المسؤولية",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "يوضح حدود مسؤولية المنصة تجاه المعدات والموردين والعملاء.",
    content: [
      "المنصة وسيط تقني وتشغيلي وليست مالكة للمعدات إلا إذا نص العقد على غير ذلك.",
      "لا تضمن المنصة نتائج الأعمال في الموقع، لكنها تدير التوثيق والتواصل وحالة الطلب.",
      "يبقى المورد مسؤولًا عن سلامة وجاهزية المعدات، ويبقى العميل مسؤولًا عن الموقع والتصاريح."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "handover-report",
    title: "نموذج استلام المعدة",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "نموذج توثيق حالة المعدة عند التسليم وبدء التشغيل.",
    content: [
      "يشمل النموذج صور المعدة قبل التشغيل وقراءة عداد الساعات ومستوى الوقود ووقت الوصول وموقع GPS.",
      "يوقع العميل أو يؤكد الاستلام إلكترونيًا بعد مراجعة الحالة والملاحظات.",
      "يعتبر النموذج دليلًا تشغيليًا عند وجود نزاع لاحق."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true,
    acceptanceRequired: true
  },
  {
    slug: "return-report",
    title: "نموذج إرجاع المعدة",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "نموذج توثيق حالة المعدة عند انتهاء التشغيل والإرجاع.",
    content: [
      "يشمل النموذج صور بعد التشغيل وقراءة العداد الجديدة ووقت الانتهاء وملاحظات التلف أو التأخير.",
      "تتم مقارنة الحالة مع نموذج الاستلام السابق لتحديد أي فروقات.",
      "إذا ظهرت أضرار أو تأخير يتم فتح نزاع وربطه بالطلب."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true,
    acceptanceRequired: true
  },
  {
    slug: "damage-report",
    title: "تقرير الضرر",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "نموذج مخصص لتوثيق الأضرار وربطها بالأدلة والطلب.",
    content: [
      "يوثق التقرير نوع الضرر وموقعه والصور والملاحظات والطرف المبلغ.",
      "يرتبط التقرير بملف النزاع وطلب التشغيل والمستندات المساندة.",
      "يمكن استخدام التقرير لتحديد الخصم من مبلغ الضمان أو المطالبة بالتعويض."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  },
  {
    slug: "payment-acknowledgment",
    title: "إقرار دفع",
    version: "1.0",
    status: "Published",
    updatedAt: "2026-05-15",
    description: "إقرار يدوي لتوثيق المدفوعات أو التحويلات المرتبطة بالطلب.",
    content: [
      "يوثق الإقرار مبلغ الدفع وطريقة الدفع ومرجع التحويل إن وجد وحالة المراجعة الإدارية.",
      "لا يعد الدفع مؤكدًا إلا بعد مراجعة الإدارة أو تحقق الطرف المختص حسب الإجراء المعتمد.",
      "يرتبط الإقرار بالطلب وأمر التشغيل وسجل المدفوعات."
    ],
    notes: ["نسخة أولية قابلة للتعديل والإدارة."],
    downloadable: true
  }
];

export function getLegalDocument(slug: string) {
  return legalDocuments.find((document) => document.slug === slug);
}

export function renderLegalDocumentHtml(document: PublicLegalDocument) {
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body{margin:0;background:#f1f5f9;color:#0b1f3a;font-family:Arial,Tahoma,sans-serif;line-height:1.9}
    .page{max-width:860px;margin:24px auto;background:#fff;border:1px solid #d9e1ec;border-radius:16px;box-shadow:0 20px 70px rgba(11,31,58,.12);overflow:hidden}
    header{background:#0b1f3a;color:white;padding:26px 30px;border-bottom:5px solid #c89b3c}
    main{padding:30px}.meta{display:flex;flex-wrap:wrap;gap:10px;margin-top:12px}.pill{border:1px solid #d9e1ec;border-radius:999px;padding:5px 12px;background:#f8fafc;color:#0b1f3a;font-weight:700}
    h1{margin:0;font-size:30px}.subtitle{color:#e2e8f0;margin:8px 0 0}.content{display:grid;gap:14px}.clause{border:1px solid #e2e8f0;border-radius:12px;padding:16px;background:#fbfdff}.note{border:1px solid #f1c75b;background:#fff8e5;border-radius:12px;padding:14px;color:#5f4300;font-weight:700}
    footer{padding:18px 30px;background:#f8fafc;color:#64748b;border-top:1px solid #e2e8f0}@media(max-width:640px){.page{margin:0;border-radius:0}main,header,footer{padding:18px}h1{font-size:24px}}
  </style>
</head>
<body>
  <article class="page">
    <header>
      <strong>${brand.arabicName}</strong>
      <h1>${document.title}</h1>
      <p class="subtitle">${document.description}</p>
    </header>
    <main>
      <div class="meta">
        <span class="pill">الإصدار ${document.version}</span>
        <span class="pill">${document.status}</span>
        <span class="pill">آخر تحديث ${document.updatedAt}</span>
      </div>
      <section class="content" style="margin-top:22px">
        ${document.content.map((item, index) => `<div class="clause"><strong>البند ${index + 1}</strong><br>${item}</div>`).join("")}
      </section>
      <section style="margin-top:22px">
        ${document.notes.map((note) => `<div class="note">${note}</div>`).join("")}
      </section>
    </main>
    <footer>هذه نسخة أولية قابلة للتعديل والإدارة داخل منصة ${brand.arabicName}.</footer>
  </article>
</body>
</html>`;
}

export async function generateLegalDocumentPdf(document: PublicLegalDocument) {
  const doc = new PDFDocument({ size: "A4", margin: 42, bufferPages: true, info: { Title: document.title, Author: brand.arabicName } });
  const stream = new PassThrough();
  const chunks: Buffer[] = [];

  const fontPath = resolveArabicFontPath();
  if (fontPath) {
    doc.registerFont("Arabic", fontPath);
    doc.font("Arabic");
  } else {
    doc.font("Helvetica");
  }

  doc.pipe(stream);
  stream.on("data", (chunk: Buffer) => chunks.push(chunk));

  drawHeader(doc, document);
  doc.moveDown(1.2);
  doc.fontSize(11).fillColor("#0b1f3a").text(document.description, { align: "right" });
  doc.moveDown();
  doc.fontSize(10).fillColor("#475569").text(`الإصدار ${document.version}   |   الحالة ${document.status}   |   آخر تحديث ${document.updatedAt}`, { align: "right" });
  doc.moveDown();

  document.content.forEach((paragraph, index) => {
    doc.roundedRect(42, doc.y, 511, 74, 8).fillAndStroke("#fbfdff", "#d9e1ec");
    doc.fillColor("#0b1f3a").fontSize(10).text(`البند ${index + 1}`, 58, doc.y - 62, { align: "right", width: 470 });
    doc.fillColor("#243b53").fontSize(9.5).text(paragraph, 58, doc.y + 4, { align: "right", width: 470 });
    doc.moveDown(2);
    if (doc.y > 710) {
      doc.addPage();
      doc.font(fontPath ? "Arabic" : "Helvetica");
    }
  });

  doc.moveDown();
  document.notes.forEach((note) => {
    doc.fillColor("#7a5600").fontSize(9.5).text(note, { align: "right" });
  });
  doc.moveDown();
  doc.fillColor("#64748b").fontSize(8).text(`هذه نسخة أولية قابلة للتعديل والإدارة داخل منصة ${brand.arabicName}.`, { align: "center" });

  doc.end();

  await new Promise<void>((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });

  return Buffer.concat(chunks);
}

function drawHeader(doc: PDFKit.PDFDocument, document: PublicLegalDocument) {
  doc.roundedRect(42, 42, 511, 92, 10).fill("#0b1f3a");
  doc.fillColor("#c89b3c").fontSize(12).text(brand.arabicName, 62, 58, { align: "right", width: 460 });
  doc.fillColor("#ffffff").fontSize(21).text(document.title, 62, 80, { align: "right", width: 460 });
  doc.fillColor("#e2e8f0").fontSize(9).text("مستند قانوني منشور", 62, 110, { align: "right", width: 460 });
  doc.y = 154;
}

function resolveArabicFontPath() {
  const candidates = [
    join(process.cwd(), "public", "fonts", "Cairo-Regular.ttf"),
    "C:\\Windows\\Fonts\\arial.ttf",
    "C:\\Windows\\Fonts\\tahoma.ttf",
    "C:\\Windows\\Fonts\\segoeui.ttf"
  ];
  return candidates.find((candidate) => existsSync(candidate));
}

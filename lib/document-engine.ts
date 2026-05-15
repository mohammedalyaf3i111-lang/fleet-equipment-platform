import { brand } from "@/lib/brand";
import { legalDisclaimer, protectionClauses, rentalContractSections } from "@/lib/contracts";

export type DocumentStatus = "Draft" | "Pending Signature" | "Signed" | "Archived";

export type LegalDocumentTemplateDefinition = {
  id: string;
  documentType: string;
  arabicName: string;
  englishName: string;
  templateContent: string;
  version: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GeneratedDocumentRecord = {
  id: string;
  documentType: string;
  orderId: string;
  customerId: string;
  supplierId: string;
  generatedPdfUrl: string;
  generatedHtml: string;
  acceptedAt?: string;
  signedBy?: string;
  ipAddress?: string;
  userAgent?: string;
  status: DocumentStatus;
  createdAt: string;
};

const issuedAt = "2026-05-11";

const documentTemplateMap = [
  ["CUSTOMER_RENTAL_AGREEMENT", "عقد تأجير العميل", "Customer Rental Agreement"],
  ["SUPPLIER_PLATFORM_AGREEMENT", "اتفاقية منصة المورد", "Supplier Platform Agreement"],
  ["EQUIPMENT_HANDOVER_FORM", "نموذج تسليم المعدة", "Equipment Handover Form"],
  ["EQUIPMENT_RETURN_FORM", "نموذج إرجاع المعدة", "Equipment Return Form"],
  ["DAMAGE_REPORT", "تقرير أضرار", "Damage Report"],
  ["PAYMENT_ACKNOWLEDGMENT", "إقرار دفع", "Payment Acknowledgment"],
  ["CANCELLATION_REPORT", "تقرير إلغاء", "Cancellation Report"],
  ["EQUIPMENT_RENTAL_CONTRACT", "عقد تأجير المعدة", "Equipment Rental Contract"],
  ["HANDOVER_FORM", "نموذج استلام المعدة", "Handover Form"],
  ["RETURN_FORM", "نموذج إرجاع المعدة", "Return Form"]
] as const;

export const legalDocumentTemplates: LegalDocumentTemplateDefinition[] = documentTemplateMap.map(([documentType, arabicName, englishName]) => ({
  id: `tpl-${documentType.toLowerCase().replaceAll("_", "-")}`,
  documentType,
  arabicName,
  englishName,
  templateContent: [
    `# ${arabicName}`,
    "بيانات المنصة: {{platformName}} - {{ownerCompany}}",
    "رقم الطلب: {{orderId}} - تاريخ الإصدار {{date}}",
    "بيانات العميل: {{customerName}} - {{customerCr}} - {{customerCity}}",
    "بيانات مزود المعدة: {{supplierName}} - {{supplierCr}} - {{supplierCity}}",
    "بيانات المعدة: {{equipmentName}} - {{equipmentSerial}} - {{equipmentCity}}",
    "القيمة: {{total}} ريال شامل ضريبة القيمة المضافة {{vat}} ريال.",
    "حالة المستند: {{status}}"
  ].join("\n"),
  version: "1.0.0",
  isPublished: true,
  createdAt: issuedAt,
  updatedAt: issuedAt
}));

export const demoDocumentContext = {
  orderId: "ORD-501",
  customerId: "CUST-001",
  supplierId: "SUP-001",
  customer: {
    name: "شركة الإنشاءات السعودية",
    cr: "1010123456",
    vat: "300123456700003",
    city: "الرياض",
    address: "حي الصحافة، الرياض",
    authorizedPerson: "عبدالله فهد القحطاني"
  },
  supplier: {
    name: "مؤسسة الخليج للمعدات",
    cr: "2050123456",
    vat: "300765432100003",
    city: "الدمام",
    mobile: "+966500000111"
  },
  equipment: {
    name: "كرين 50 طن",
    category: "الكرينات",
    brand: "Liebherr",
    model: "LTM 1050",
    serial: "CRN-501-KSA",
    city: "الرياض",
    hourMeter: "4,820 ساعة",
    fuelLevel: "80%",
    condition: "جاهزة للتشغيل"
  },
  rental: {
    location: "مستودعات لوجستية - الرياض",
    startAt: "2026-05-15 08:00",
    endAt: "2026-05-22 18:00",
    duration: "7 أيام",
    allowedHours: "10 ساعات تشغيل يوميًا"
  },
  pricing: {
    equipmentPrice: "28,000",
    transportCost: "2,500",
    operatorCost: "3,500",
    deposit: "10,000",
    vat: "5,100",
    total: "39,100"
  }
};

export function getDocumentTemplate(type: string) {
  const normalized = normalizeDocumentType(type);
  return legalDocumentTemplates.find((template) => template.documentType === normalized) ?? legalDocumentTemplates[0];
}

export function normalizeDocumentType(type: string) {
  const aliases: Record<string, string> = {
    SUPPLIER_AGREEMENT: "SUPPLIER_PLATFORM_AGREEMENT",
    CUSTOMER_AGREEMENT: "CUSTOMER_RENTAL_AGREEMENT",
    EQUIPMENT_RENTAL_CONTRACT: "CUSTOMER_RENTAL_AGREEMENT",
    HANDOVER_FORM: "EQUIPMENT_HANDOVER_FORM",
    RETURN_FORM: "EQUIPMENT_RETURN_FORM"
  };
  return aliases[type] ?? type;
}

export function makeGeneratedDocumentId(type: string, orderId = demoDocumentContext.orderId) {
  return `doc-${orderId.toLowerCase()}-${normalizeDocumentType(type).toLowerCase().replaceAll("_", "-")}`;
}

export function parseGeneratedDocumentId(id: string) {
  const suffix = id.replace(/^doc-[^-]+-\d+-/, "").replaceAll("-", "_").toUpperCase();
  return normalizeDocumentType(suffix);
}

export function buildGeneratedDocument(
  type: string,
  options?: Partial<Pick<GeneratedDocumentRecord, "signedBy" | "ipAddress" | "userAgent" | "acceptedAt" | "status">>
): GeneratedDocumentRecord {
  const template = getDocumentTemplate(type);
  const id = makeGeneratedDocumentId(template.documentType);
  const status = options?.status ?? (options?.acceptedAt ? "Signed" : "Pending Signature");
  const generatedHtml = renderGeneratedDocumentHtml(template.documentType, {
    signedBy: options?.signedBy,
    ipAddress: options?.ipAddress,
    userAgent: options?.userAgent,
    acceptedAt: options?.acceptedAt,
    status
  });

  return {
    id,
    documentType: template.documentType,
    orderId: demoDocumentContext.orderId,
    customerId: demoDocumentContext.customerId,
    supplierId: demoDocumentContext.supplierId,
    generatedPdfUrl: `/api/legal/document/${id}/pdf`,
    generatedHtml,
    acceptedAt: options?.acceptedAt,
    signedBy: options?.signedBy,
    ipAddress: options?.ipAddress,
    userAgent: options?.userAgent,
    status,
    createdAt: new Date().toISOString()
  };
}

export function listGeneratedDocuments() {
  return legalDocumentTemplates.slice(0, 7).map((template, index) =>
    buildGeneratedDocument(template.documentType, {
      status: index === 0 ? "Signed" : index === 6 ? "Archived" : "Pending Signature",
      signedBy: index === 0 ? demoDocumentContext.customer.authorizedPerson : undefined,
      acceptedAt: index === 0 ? "2026-05-11T09:30:00.000Z" : undefined,
      ipAddress: index === 0 ? "127.0.0.1" : undefined
    })
  );
}

export function renderGeneratedDocumentHtml(type: string, signature?: Partial<GeneratedDocumentRecord>) {
  const template = getDocumentTemplate(type);
  const status = signature?.status ?? "Pending Signature";
  const qr = renderQrMatrix(makeGeneratedDocumentId(template.documentType));
  const sections = template.documentType === "CUSTOMER_RENTAL_AGREEMENT" ? rentalContractSections : protectionClauses;
  const signed = signature?.signedBy && signature?.acceptedAt;

  return `<!doctype html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${template.arabicName} - ${brand.arabicName}</title>
  <style>
    body{margin:0;background:#eef2f7;color:#0b1f3a;font-family:Arial,Tahoma,sans-serif;line-height:1.8}
    .page{max-width:980px;margin:24px auto;background:#fff;border:1px solid #d9e1ec;border-radius:14px;box-shadow:0 24px 80px rgba(11,31,58,.12);overflow:hidden}
    .head{display:flex;justify-content:space-between;gap:24px;align-items:flex-start;background:linear-gradient(135deg,#081a31,#0b1f3a);color:#fff;padding:28px}
    .brand{display:flex;gap:14px;align-items:center}.logo{width:58px;height:58px}.gold{color:#c89b3c}.muted{color:#64748b}.box{border:1px solid #d9e1ec;border-radius:10px;padding:14px;background:#f8fafc}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.content{padding:28px}.title{font-size:28px;margin:0 0 6px;font-weight:900}.status{display:inline-flex;border:1px solid #c89b3c;background:#fff7df;color:#0b1f3a;border-radius:8px;padding:4px 10px;font-weight:800}.table{width:100%;border-collapse:collapse}.table th,.table td{border:1px solid #d9e1ec;padding:10px;text-align:right}.clauses li{margin-bottom:8px}.sig{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}.qr{direction:ltr;display:grid;grid-template-columns:repeat(13,7px);gap:2px;background:#fff;padding:10px;border-radius:8px}.qr span{width:7px;height:7px;background:#e2e8f0}.qr .on{background:#0b1f3a}@media(max-width:760px){.head,.grid,.sig{grid-template-columns:1fr;display:grid}.page{margin:0;border-radius:0}.content{padding:18px}.title{font-size:22px}}
    @media print{body{background:#fff}.page{box-shadow:none;margin:0;border:0}.no-print{display:none!important}}
  </style>
</head>
<body>
  <main class="page">
    <header class="head">
      <div class="brand">
        <img class="logo" src="/logo.svg" alt="${brand.arabicName}" />
        <div>
          <h1 class="title">${template.arabicName}</h1>
          <strong class="gold">${brand.arabicName}</strong>
          <div>${brand.legalOwner}</div>
        </div>
      </div>
      <div>
        <div class="status">${status}</div>
        <div>رقم المستند: ${makeGeneratedDocumentId(template.documentType)}</div>
        <div>تاريخ الإصدار: ${new Date().toLocaleDateString("ar-SA")}</div>
      </div>
    </header>
    <section class="content">
      <div class="grid">
        <div class="box"><strong>بيانات العميل</strong><br>${demoDocumentContext.customer.name}<br>سجل/هوية: ${demoDocumentContext.customer.cr}<br>${demoDocumentContext.customer.city} - ${demoDocumentContext.customer.address}</div>
        <div class="box"><strong>بيانات المزود</strong><br>${demoDocumentContext.supplier.name}<br>سجل تجاري: ${demoDocumentContext.supplier.cr}<br>${demoDocumentContext.supplier.city} - ${demoDocumentContext.supplier.mobile}</div>
      </div>
      <h2>بيانات المعدة والتشغيل</h2>
      <table class="table">
        <tr><th>المعدة</th><td>${demoDocumentContext.equipment.name} - ${demoDocumentContext.equipment.brand} ${demoDocumentContext.equipment.model}</td></tr>
        <tr><th>الرقم التسلسلي</th><td>${demoDocumentContext.equipment.serial}</td></tr>
        <tr><th>موقع العمل</th><td>${demoDocumentContext.rental.location}</td></tr>
        <tr><th>مدة الإيجار</th><td>${demoDocumentContext.rental.duration} من ${demoDocumentContext.rental.startAt} إلى ${demoDocumentContext.rental.endAt}</td></tr>
        <tr><th>القيمة والضريبة</th><td>${demoDocumentContext.pricing.total} ريال، ضريبة القيمة المضافة ${demoDocumentContext.pricing.vat} ريال، مبلغ التأمين ${demoDocumentContext.pricing.deposit} ريال</td></tr>
      </table>
      <h2>البنود</h2>
      <ol class="clauses">${sections.slice(0, 12).map((section) => `<li>${section}</li>`).join("")}</ol>
      <div class="box"><strong>تنبيه قانوني:</strong> ${legalDisclaimer}</div>
      <div class="sig">
        <div class="box">
          <strong>التوقيع الإلكتروني</strong><br>
          ${signed ? `تم التوقيع إلكترونيًا بواسطة: ${signature.signedBy}<br>التاريخ: ${signature.acceptedAt}<br>IP: ${signature.ipAddress ?? "غير متاح"}<br>User Agent: ${signature.userAgent ?? "غير متاح"}` : "بانتظار قبول المستند وتوقيعه إلكترونيًا."}
        </div>
        <div class="box"><strong>QR Code للمستند</strong><div class="qr">${qr}</div></div>
      </div>
    </section>
  </main>
</body>
</html>`;
}

export function renderDocumentBodyText(type: string) {
  const template = getDocumentTemplate(type);
  return [
    `${brand.arabicName} - ${template.arabicName}`,
    `Document ID: ${makeGeneratedDocumentId(template.documentType)}`,
    `Order: ${demoDocumentContext.orderId}`,
    `Customer: ${demoDocumentContext.customer.name}`,
    `Supplier: ${demoDocumentContext.supplier.name}`,
    `Equipment: ${demoDocumentContext.equipment.name} ${demoDocumentContext.equipment.brand} ${demoDocumentContext.equipment.model}`,
    `Total: ${demoDocumentContext.pricing.total} SAR / VAT: ${demoDocumentContext.pricing.vat} SAR`,
    "",
    ...(template.documentType === "CUSTOMER_RENTAL_AGREEMENT" ? rentalContractSections : protectionClauses),
    "",
    legalDisclaimer
  ];
}

export async function generatePdfBuffer(type: string, signature?: Partial<GeneratedDocumentRecord>) {
  const template = getDocumentTemplate(type);
  const id = makeGeneratedDocumentId(template.documentType);
  const lines = [
    `${brand.englishName} legal document`,
    `Document English name: ${template.englishName}`,
    `Document ID: ${id}`,
    `Order ID: ${demoDocumentContext.orderId}`,
    "Customer: Saudi Construction Company / CR 1010123456",
    "Supplier: Gulf Equipment Establishment / CR 2050123456",
    "Equipment: Crane 50 Ton - Liebherr LTM 1050",
    "Site: Logistics warehouses - Riyadh",
    "Duration: 7 days",
    `Total SAR: ${demoDocumentContext.pricing.total} / VAT SAR: ${demoDocumentContext.pricing.vat} / Deposit SAR: ${demoDocumentContext.pricing.deposit}`,
    `Status: ${signature?.status ?? "Pending Signature"}`,
    signature?.signedBy ? "Electronically signed in the platform" : "Signature: Pending",
    signature?.acceptedAt ? `Accepted at: ${signature.acceptedAt}` : "",
    signature?.ipAddress ? `IP: ${signature.ipAddress}` : "",
    "Arabic RTL contract preview is available inside the platform document viewer.",
    "Legal disclaimer: Draft templates must be reviewed by a licensed legal advisor in Saudi Arabia before commercial use."
  ].filter(Boolean);

  return buildSimplePdf(lines, id);
}

function renderQrMatrix(seed: string) {
  return buildMatrix(seed).map((on) => `<span class="${on ? "on" : ""}"></span>`).join("");
}

function buildMatrix(seed: string) {
  const bits: boolean[] = [];
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  for (let i = 0; i < 169; i += 1) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    bits.push((hash & 3) !== 0);
  }
  return bits;
}

function buildSimplePdf(lines: string[], seed: string) {
  const textOps = lines.slice(0, 34).map((line, index) => {
    const y = 760 - index * 18;
    return `BT /F1 10 Tf 46 ${y} Td (${escapePdfText(toPdfSafeText(line))}) Tj ET`;
  });
  const matrix = buildMatrix(seed);
  const qrOps = matrix
    .map((on, index) => {
      if (!on) return "";
      const x = 470 + (index % 13) * 5;
      const y = 710 - Math.floor(index / 13) * 5;
      return `${x} ${y} 4 4 re f`;
    })
    .filter(Boolean);
  const stream = [
    "0.043 0.122 0.227 rg 40 782 515 28 re f",
    "0.784 0.608 0.235 rg 40 746 515 4 re f",
    "0.043 0.122 0.227 rg",
    ...textOps,
    ...qrOps
  ].join("\n");
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(stream, "binary")} >>\nstream\n${stream}\nendstream`
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "binary"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefAt = Buffer.byteLength(pdf, "binary");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  pdf += offsets.slice(1).map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`).join("");
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`;
  return Buffer.from(pdf, "binary");
}

function escapePdfText(value: string) {
  return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

function toPdfSafeText(value: string) {
  return value.replace(/[^\x20-\x7E]/g, " ").replace(/\s+/g, " ").trim();
}

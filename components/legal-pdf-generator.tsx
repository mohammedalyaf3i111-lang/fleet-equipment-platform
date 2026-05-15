"use client";

import { useState, useTransition } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Loader2,
  X,
} from "lucide-react";
import {
  EMPTY_FORM,
  LEGAL_DISCLAIMER,
  LEGAL_TEMPLATES,
  generateLegalDocumentPDF,
  previewLegalDocument,
  type DocumentFormData,
  type LegalDocumentTemplate,
} from "@/lib/pdfTemplates";

/* ─────────────────────── tiny form field ─────────────────────── */
function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
}: {
  label: string;
  name: keyof DocumentFormData;
  type?: string;
  value: string;
  onChange: (name: keyof DocumentFormData, value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="mb-1 block text-[11px] font-bold text-navy">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
      />
    </label>
  );
}

/* ─────────────────────── document card ─────────────────────── */
function DocumentCard({
  template,
  onDownload,
  onPreview,
}: {
  template: LegalDocumentTemplate;
  onDownload: (t: LegalDocumentTemplate) => void;
  onPreview: (t: LegalDocumentTemplate) => void;
}) {
  return (
    <div className="group flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_12px_36px_rgba(216,163,30,0.18)]">
      {/* card header */}
      <div className="flex items-start gap-3 p-5">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy/6 text-gold ring-1 ring-navy/8 transition duration-300 group-hover:bg-gold group-hover:text-white group-hover:ring-gold">
          <FileText className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-black leading-tight text-navy">
            {template.titleAr}
          </h3>
          <p className="mt-0.5 text-[11px] font-semibold text-slate-400">
            {template.titleEn}
          </p>
        </div>
      </div>

      {/* description */}
      <p className="px-5 text-xs leading-6 text-steel">{template.descriptionAr}</p>

      {/* badges */}
      <div className="mt-3 flex flex-wrap items-center gap-2 px-5">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          مسودة قانونية
        </span>
        <span className="truncate text-[10px] text-slate-400">
          {template.filename}
        </span>
      </div>

      {/* legal notice */}
      <div className="mx-5 mt-3 flex items-start gap-1.5 rounded-md border border-amber-200 bg-amber-50/70 px-3 py-2">
        <AlertTriangle className="mt-0.5 h-3 w-3 flex-shrink-0 text-amber-600" />
        <p className="text-[10px] font-bold leading-relaxed text-amber-800">
          يتطلب اعتماد قانوني قبل الاستخدام التجاري
        </p>
      </div>

      {/* actions */}
      <div className="mt-4 grid grid-cols-2 gap-2 p-5 pt-3">
        <button
          onClick={() => onPreview(template)}
          className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-navy transition hover:border-slate-300 hover:bg-slate-100"
        >
          <Eye className="h-3.5 w-3.5" />
          معاينة
        </button>
        <button
          onClick={() => onDownload(template)}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-navy px-3 py-2.5 text-xs font-bold text-white transition hover:bg-gold hover:text-navy"
        >
          <Download className="h-3.5 w-3.5" />
          تنزيل PDF
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────── download modal ─────────────────────── */
function DownloadModal({
  template,
  formData,
  onChange,
  onClose,
  onDownload,
  onPreview,
  isGenerating,
  isSuccess,
}: {
  template: LegalDocumentTemplate;
  formData: DocumentFormData;
  onChange: (name: keyof DocumentFormData, value: string) => void;
  onClose: () => void;
  onDownload: () => void;
  onPreview: () => void;
  isGenerating: boolean;
  isSuccess: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* panel */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* modal header */}
        <div className="flex flex-shrink-0 items-start justify-between border-b border-white/10 bg-navy px-6 py-5">
          <div>
            <p className="text-[11px] font-bold text-gold/80">
              {template.titleEn}
            </p>
            <h2 className="mt-0.5 text-lg font-black text-white">
              {template.titleAr}
            </h2>
            <p className="mt-1 font-mono text-[10px] text-white/40">
              {template.filename}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/20 bg-white/10 p-1.5 text-white/60 transition hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* scrollable form body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* info banner */}
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
            <p className="text-xs font-bold text-blue-800">
              عبِّئ البيانات أدناه لتضمينها في الوثيقة — جميع الحقول اختيارية
            </p>
          </div>

          {/* form grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="اسم العميل / Customer Name"
              name="customerName"
              value={formData.customerName}
              onChange={onChange}
              placeholder="شركة الإنشاءات السعودية"
            />
            <Field
              label="اسم المورد / Supplier Name"
              name="supplierName"
              value={formData.supplierName}
              onChange={onChange}
              placeholder="مؤسسة الخليج للمعدات"
            />
            <Field
              label="رقم الجوال / Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onChange}
              placeholder="+966 5x xxx xxxx"
            />
            <Field
              label="رقم الهوية أو السجل التجاري / ID or CR"
              name="idOrCr"
              value={formData.idOrCr}
              onChange={onChange}
              placeholder="1010xxxxxx"
            />
            <Field
              label="اسم المعدة / Equipment Name"
              name="equipmentName"
              value={formData.equipmentName}
              onChange={onChange}
              placeholder="كرين 50 طن — Liebherr LTM 1050"
            />
            <Field
              label="رقم الطلب / Order Number"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={onChange}
              placeholder="ORD-5001"
            />
            <Field
              label="تاريخ بداية الإيجار / Start Date"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={onChange}
            />
            <Field
              label="تاريخ نهاية الإيجار / End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={onChange}
            />
            <Field
              label="قيمة الإيجار (ر.س) / Rental Value SAR"
              name="rentalValue"
              type="number"
              value={formData.rentalValue}
              onChange={onChange}
              placeholder="28750"
            />
            <Field
              label="مبلغ التأمين (ر.س) / Deposit SAR"
              name="depositAmount"
              type="number"
              value={formData.depositAmount}
              onChange={onChange}
              placeholder="5000"
            />
          </div>

          {/* notes */}
          <div className="mt-3">
            <label className="block text-[11px] font-bold text-navy">
              ملاحظات إضافية / Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              rows={3}
              placeholder="أي ملاحظات أو شروط إضافية تود إضافتها..."
              className="mt-1 w-full resize-none rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
            />
          </div>

          {/* disclaimer */}
          <div className="mt-4 flex gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
            <p className="text-[11px] font-bold leading-relaxed text-amber-900">
              {LEGAL_DISCLAIMER}
            </p>
          </div>
        </div>

        {/* sticky action bar */}
        <div className="flex flex-shrink-0 gap-3 border-t border-slate-100 bg-white p-5">
          <button
            onClick={onPreview}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-navy transition hover:border-slate-300 hover:bg-slate-100"
          >
            <Eye className="h-4 w-4" />
            معاينة في المتصفح
          </button>
          <button
            onClick={onDownload}
            disabled={isGenerating}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري التوليد...
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                تم التنزيل بنجاح!
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                تنزيل PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── main exported component ─────────────────────── */
export function LegalPDFGenerator() {
  const [selected, setSelected] = useState<LegalDocumentTemplate | null>(null);
  const [formData, setFormData] = useState<DocumentFormData>(EMPTY_FORM);
  const [isGenerating, startGenerating] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFieldChange = (name: keyof DocumentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = (template: LegalDocumentTemplate) => {
    setSelected(template);
    setIsSuccess(false);
  };

  const closeModal = () => {
    setSelected(null);
    setFormData(EMPTY_FORM);
    setIsSuccess(false);
  };

  const handleDownload = () => {
    if (!selected) return;
    startGenerating(async () => {
      try {
        await generateLegalDocumentPDF(selected.id, formData);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 4000);
      } catch (err) {
        console.error("PDF generation error:", err);
        alert("حدث خطأ أثناء توليد PDF. يرجى المحاولة مرة أخرى.");
      }
    });
  };

  const handlePreview = () => {
    if (!selected) return;
    previewLegalDocument(selected.id, formData);
  };

  const handleCardPreview = (template: LegalDocumentTemplate) => {
    previewLegalDocument(template.id, EMPTY_FORM);
  };

  return (
    <>
      {/* card grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {LEGAL_TEMPLATES.map((template) => (
          <DocumentCard
            key={template.id}
            template={template}
            onDownload={openModal}
            onPreview={handleCardPreview}
          />
        ))}
      </div>

      {/* modal */}
      {selected && (
        <DownloadModal
          template={selected}
          formData={formData}
          onChange={handleFieldChange}
          onClose={closeModal}
          onDownload={handleDownload}
          onPreview={handlePreview}
          isGenerating={isGenerating}
          isSuccess={isSuccess}
        />
      )}
    </>
  );
}

import { created, serverError } from "@/lib/api";

export async function POST(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    return created({
      message: "تم اعتماد عرض السعر، ويجب استكمال القبول القانوني والدفع قبل تأكيد الطلب.",
      quoteId: id,
      status: "APPROVED",
      nextStatus: "LEGAL_ACCEPTANCE_REQUIRED",
      requiredLegalSteps: [
        "قبول الشروط والأحكام",
        "قبول عقد تأجير المعدة",
        "كتابة الاسم الكامل",
        "إدخال رقم الهوية أو السجل التجاري",
        "قبول عقد التأجير",
        "تأكيد الدفعة أو مبلغ التأمين"
      ],
      auditAction: "QUOTE_APPROVED"
    });
  } catch (error) {
    return serverError(error);
  }
}

import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { canCompleteLegalOrder } from "@/lib/business";

const legalCompletionSchema = z.object({
  relatedOrderId: z.string().min(3),
  typedFullName: z.string().min(3),
  nationalIdOrCr: z.string().min(5),
  termsAccepted: z.coerce.boolean(),
  rentalContractAccepted: z.coerce.boolean(),
  pdfStored: z.coerce.boolean()
});

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, legalCompletionSchema);
    const allowed = canCompleteLegalOrder(data);
    return created({
      allowedToCompleteOrder: allowed,
      nextStatus: allowed ? "AWAITING_PAYMENT_DEPOSIT" : "LEGAL_ACCEPTANCE_REQUIRED",
      message: allowed ? "اكتمل القبول القانوني ويمكن متابعة الدفع والتأكيد." : "لا يمكن إكمال الطلب قبل قبول الشروط والعقد وحفظ نسخة PDF مرتبطة بالطلب.",
      checks: data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

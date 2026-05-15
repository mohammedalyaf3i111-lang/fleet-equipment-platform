import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { supplierOfferSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, supplierOfferSchema);
    const isRejected = data.action === "REJECT";

    return created({
      message: isRejected ? "تم تسجيل رفض المورد للطلب مع السبب." : "تم إرسال عرض المورد للعميل بنجاح.",
      offerId: `OFF-${Date.now()}`,
      status: isRejected ? "REJECTED" : "SENT",
      notification: isRejected ? "SUPPLIER_REJECTED_REQUEST" : "OFFER_SENT_TO_CUSTOMER",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

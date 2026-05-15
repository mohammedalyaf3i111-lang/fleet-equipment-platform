import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { paymentConfirmationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, paymentConfirmationSchema);
    return created({
      message: "تم تأكيد الدفع يدوياً وتسجيله في سجل التدقيق.",
      paymentStatus: "FULLY_PAID",
      auditAction: "PAYMENT_CONFIRMED",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

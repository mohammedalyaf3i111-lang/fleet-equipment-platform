import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { requireRole } from "@/lib/authz";
import { calculateQuote } from "@/lib/business";
import { quoteCreateSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const denied = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (denied) return denied;

  try {
    const data = await parseForm(request, quoteCreateSchema);
    const totals = calculateQuote(data);
    return created({
      message: "تم إنشاء عرض السعر وإعداده للإرسال إلى العميل.",
      status: "SENT",
      quote: {
        rentalRequestId: data.rentalRequestId,
        rentalDurationDays: data.durationDays,
        paymentTerms: data.paymentTerms,
        validUntil: new Date(Date.now() + data.validityDays * 86400000).toISOString(),
        ...totals
      },
      auditAction: "QUOTE_CREATED",
      notification: "QUOTE_SENT_TO_CUSTOMER"
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

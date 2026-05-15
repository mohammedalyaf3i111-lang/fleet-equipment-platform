import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { customerRegistrationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, customerRegistrationSchema);
    return created({
      message: "تم استلام تسجيل العميل وإرساله للمراجعة.",
      status: "PENDING_REVIEW",
      auditAction: "REGISTRATION",
      customer: data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

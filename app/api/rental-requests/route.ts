import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { rentalRequestSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, rentalRequestSchema);
    return created({
      message: "تم إنشاء طلب المعدة وإرساله لفريق العمليات. للتواصل السريع عبر واتساب: 00966501258561",
      requestId: `REQ-${Date.now()}`,
      status: "NEW",
      notification: "NEW_REQUEST_TO_ADMIN",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}


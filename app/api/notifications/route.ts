import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { notificationCreateSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, notificationCreateSchema);
    return created({
      message: "تم إنشاء الإشعار كمسودة جاهزة للتكامل مع واتساب أو SMS أو البريد.",
      notificationId: `NTF-${Date.now()}`,
      status: "MOCK_READY",
      provider: `${data.channel}_PLACEHOLDER`,
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

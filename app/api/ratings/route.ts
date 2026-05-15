import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { calculateTrustLevel } from "@/lib/business";
import { ratingSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, ratingSchema);
    const trustLevel = calculateTrustLevel({
      paymentReliability: data.paymentReliability ?? 70,
      returnCompliance: data.returnCompliance ?? 70,
      damageHistoryCount: data.damageHistory ?? 0,
      cancellationRate: data.cancellationRate ?? 0,
      responseSpeed: data.responseSpeed ?? 70
    });
    return created({
      message: "تم حفظ التقييم وتحديث مستوى الثقة",
      ratingId: `RAT-${Date.now()}`,
      trustLevel,
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

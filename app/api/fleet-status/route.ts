import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { fleetStatusSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, fleetStatusSchema);
    return created({
      message: "تم تحديث حالة المعدة داخل أسطول المورد.",
      fleetStatusId: `FLT-${Date.now()}`,
      auditAction: "FLEET_STATUS_UPDATED",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

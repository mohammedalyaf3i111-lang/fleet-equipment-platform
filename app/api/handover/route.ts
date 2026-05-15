import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { requireRole } from "@/lib/authz";
import { handoverSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const denied = requireRole(request, ["SUPPLIER", "ADMIN", "SUPER_ADMIN"]);
  if (denied) return denied;

  try {
    const data = await parseForm(request, handoverSchema);
    return created({
      message: "تم توثيق تسليم المعدة وتسجيل توقيع العميل.",
      reportId: `HAND-${Date.now()}`,
      status: "DELIVERED",
      auditAction: "HANDOVER_SIGNED",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

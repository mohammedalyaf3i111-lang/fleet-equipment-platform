import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { requireRole } from "@/lib/authz";
import { disputeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const denied = requireRole(request, ["CUSTOMER", "SUPPLIER", "ADMIN", "SUPER_ADMIN"]);
  if (denied) return denied;

  try {
    const data = await parseForm(request, disputeSchema);
    return created({
      message: "تم فتح النزاع وإشعار فريق العمليات للمراجعة.",
      disputeId: `DSP-${Date.now()}`,
      status: "OPEN",
      auditAction: "DISPUTE_OPENED",
      notification: "DISPUTE_OPENED",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

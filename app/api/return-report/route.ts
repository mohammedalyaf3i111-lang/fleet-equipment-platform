import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { requireRole } from "@/lib/authz";
import { returnReportSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const denied = requireRole(request, ["SUPPLIER", "ADMIN", "SUPER_ADMIN"]);
  if (denied) return denied;

  try {
    const data = await parseForm(request, returnReportSchema);
    return created({
      message: data.damageFound ? "تم إنشاء تقرير إرجاع وفتح نزاع مبدئي بسبب وجود تلف." : "تم إنشاء تقرير الإرجاع بدون ملاحظات تلف.",
      reportId: `RET-${Date.now()}`,
      nextStatus: data.damageFound ? "DISPUTE" : "COMPLETED",
      auditAction: "RETURN_SIGNED",
      openDispute: data.damageFound,
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

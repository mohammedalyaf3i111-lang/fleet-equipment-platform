import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { supplierRegistrationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, supplierRegistrationSchema);
    const preliminaryEquipmentList = data.preliminaryEquipmentList ?? [];
    const totalUnits = preliminaryEquipmentList.reduce((sum, item) => sum + item.quantity, 0);

    return created({
      message: "تم استلام طلب تسجيل مزود المعدات وهو بانتظار مراجعة الإدارة. للتواصل السريع عبر واتساب: 00966501258561",
      status: "PENDING_REVIEW",
      auditAction: "REGISTRATION",
      supplierEquipmentSummary: {
        totalTypes: preliminaryEquipmentList.length,
        totalUnits
      },
      supplier: data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}


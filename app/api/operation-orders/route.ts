import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { operationOrderSchema } from "@/lib/validation";
import { SAUDI_VAT_PERCENT } from "@/lib/business";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, operationOrderSchema);
    const taxable = data.priceAmount + data.transportCost;
    const vatAmount = taxable * (SAUDI_VAT_PERCENT / 100);
    const commissionAmount = data.priceAmount * (data.commissionPercent / 100);

    return created({
      message: "تم إنشاء أمر تشغيل إلكتروني وإرساله للعميل والمورد للموافقة.",
      operationOrderId: `OP-${Date.now()}`,
      status: "AWAITING_CUSTOMER_APPROVAL",
      totals: {
        taxable,
        vatAmount,
        commissionAmount,
        supplierNet: taxable - commissionAmount,
        totalPayable: taxable + vatAmount
      },
      notification: "OPERATION_ORDER_CREATED",
      data
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

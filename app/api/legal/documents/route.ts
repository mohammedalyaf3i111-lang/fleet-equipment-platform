import { ok } from "@/lib/api";
import { buildLegalDocuments } from "@/lib/contracts";

export async function GET() {
  return ok({
    rule: "أي طلب جديد يستخدم أحدث نسخة منشورة فقط، ولا يتم تعديل النسخ المرتبطة بطلبات سابقة.",
    documents: buildLegalDocuments()
  });
}

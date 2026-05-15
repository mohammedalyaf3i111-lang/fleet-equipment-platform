import { ok } from "@/lib/api";
import { equipmentCatalog, getAllEquipmentTypes } from "@/lib/equipment-catalog";

export async function GET() {
  return ok({
    categories: equipmentCatalog,
    typesCount: getAllEquipmentTypes().length,
    scalable: "يمكن إضافة تصنيف أو نوع جديد من لوحة الإدارة أو قاعدة البيانات دون تعديل نموذج المعدة الأساسي."
  });
}

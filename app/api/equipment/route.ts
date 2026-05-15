import { created, serverError } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    return created({
      message: "تم استلام المعدة وحفظها بحالة قيد المراجعة.",
      status: "PENDING_REVIEW",
      submittedFields: Array.from(formData.keys()),
      auditAction: "EQUIPMENT_ADDED"
    });
  } catch (error) {
    return serverError(error);
  }
}

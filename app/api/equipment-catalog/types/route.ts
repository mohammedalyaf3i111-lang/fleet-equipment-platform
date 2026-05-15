import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { requireRole } from "@/lib/authz";

const typeCreateSchema = z.object({
  categorySlug: z.string().min(2),
  slug: z.string().min(2),
  arabicName: z.string().min(2),
  englishName: z.string().min(2),
  capacityLabel: z.string().optional(),
  capacityValue: z.coerce.number().optional(),
  capacityUnit: z.string().optional()
});

export async function POST(request: Request) {
  const denied = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (denied) return denied;

  try {
    const data = await parseForm(request, typeCreateSchema);
    return created({
      message: "تم تسجيل نوع المعدة الجديد في كتالوج المعدات.",
      type: {
        ...data,
        seoTitle: `${data.arabicName} للإيجار في السعودية | فليت معدات`,
        isActive: true
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, loginSchema);
    return created({
      message: "تم تسجيل الدخول بنجاح",
      user: {
        email: data.email,
        role: data.role ?? "CUSTOMER",
        permissions: ["READ_DASHBOARD", "CREATE_REQUEST"]
      },
      auditAction: "USER_LOGIN"
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

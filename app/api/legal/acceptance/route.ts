import { z } from "zod";
import { created, parseForm, serverError, validationError } from "@/lib/api";
import { legalAcceptanceSchema } from "@/lib/validation";
import { getLegalDocument } from "@/lib/contracts";

export async function POST(request: Request) {
  try {
    const data = await parseForm(request, legalAcceptanceSchema);
    const document = getLegalDocument(data.documentType);
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const typedFullName = data.typedFullName ?? data.signedBy ?? "مستخدم تجريبي";

    return created({
      message: "تم حفظ القبول القانوني والتوقيع الإلكتروني",
      acceptanceId: `LGL-${Date.now()}`,
      legalAcceptanceLog: {
        userId: data.userId,
        documentType: data.documentType,
        documentVersion: data.documentVersion,
        relatedOrderId: data.relatedOrderId,
        contractId: data.contractId,
        acceptedAt: new Date().toISOString(),
        ipAddress,
        typedFullName,
        nationalIdOrCr: data.nationalIdOrCr,
        userAgent
      },
      document: {
        title: document.title,
        version: document.version,
        status: document.status
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) return validationError(error);
    return serverError(error);
  }
}

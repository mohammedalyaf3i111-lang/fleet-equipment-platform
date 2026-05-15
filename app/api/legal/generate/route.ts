import { created, serverError } from "@/lib/api";
import { buildGeneratedDocument } from "@/lib/document-engine";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    const payload =
      contentType.includes("application/json")
        ? await request.json().catch(() => ({}))
        : Object.fromEntries((await request.formData()).entries());

    const documentType = String(payload.documentType ?? "CUSTOMER_RENTAL_AGREEMENT");
    const acceptedAt = payload.acceptedAt ? String(payload.acceptedAt) : undefined;
    const signedBy = payload.signedBy ? String(payload.signedBy) : undefined;
    const generated = buildGeneratedDocument(documentType, {
      signedBy,
      acceptedAt,
      ipAddress: request.headers.get("x-forwarded-for") ?? "127.0.0.1",
      userAgent: request.headers.get("user-agent") ?? "unknown",
      status: acceptedAt ? "Signed" : "Pending Signature"
    });

    return created({
      message: "تم توليد المستند القانوني",
      document: generated,
      previewUrl: `/legal/document/${generated.id}`,
      pdfUrl: generated.generatedPdfUrl
    });
  } catch (error) {
    return serverError(error);
  }
}

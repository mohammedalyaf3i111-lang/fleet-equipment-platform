import { ok } from "@/lib/api";
import { buildGeneratedDocument, parseGeneratedDocumentId } from "@/lib/document-engine";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const documentType = parseGeneratedDocumentId(decodeURIComponent(id));
  const document = buildGeneratedDocument(documentType);
  return ok({ document: { ...document, id } });
}

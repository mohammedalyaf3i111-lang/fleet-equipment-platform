import { ok } from "@/lib/api";
import { getDocumentTemplate } from "@/lib/document-engine";

export async function GET(_: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  return ok({ template: getDocumentTemplate(decodeURIComponent(type)) });
}

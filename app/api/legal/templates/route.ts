import { ok } from "@/lib/api";
import { legalDocumentTemplates } from "@/lib/document-engine";

export async function GET() {
  return ok({ templates: legalDocumentTemplates });
}

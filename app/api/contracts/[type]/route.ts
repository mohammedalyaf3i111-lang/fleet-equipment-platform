import { generatePdfBuffer, normalizeDocumentType } from "@/lib/document-engine";

export async function GET(_: Request, context: { params: Promise<{ type: string }> }) {
  const { type } = await context.params;
  const normalized = normalizeDocumentType(decodeURIComponent(type));
  const pdf = await generatePdfBuffer(normalized);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="fleet-equipment-${normalized}.pdf"`
    }
  });
}

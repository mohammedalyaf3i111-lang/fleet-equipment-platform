import { generatePdfBuffer, parseGeneratedDocumentId } from "@/lib/document-engine";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const documentType = parseGeneratedDocumentId(decodeURIComponent(id));
  const pdf = await generatePdfBuffer(documentType);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="${id}.pdf"`,
      "cache-control": "no-store"
    }
  });
}

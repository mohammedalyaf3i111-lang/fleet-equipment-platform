import { created, serverError } from "@/lib/api";
import { buildNotificationCopy } from "@/lib/notifications";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") ?? "DOCUMENT_READY";
    const channel = url.searchParams.get("channel") ?? "IN_APP";
    const documentId = url.searchParams.get("documentId") ?? "غير محدد";
    const copy = buildNotificationCopy(type, "عميل فليت معدات");
    return created({
      message: `تم تسجيل إرسال تجريبي عبر ${channel}. التكامل الفعلي يحتاج مزود خدمة.`,
      status: "MOCK_SENT",
      documentId,
      copy
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => ({}));
    const copy = buildNotificationCopy(String(payload.type ?? "GENERAL"), String(payload.recipientName ?? "عميلنا العزيز"));
    return created({
      message: "تم تسجيل الإشعار كإرسال تجريبي. التكامل الفعلي يحتاج WhatsApp Business API أو SMS أو Email provider.",
      status: "MOCK_SENT",
      channelsReady: ["WHATSAPP", "SMS", "EMAIL", "IN_APP"],
      copy,
      payload
    });
  } catch (error) {
    return serverError(error);
  }
}

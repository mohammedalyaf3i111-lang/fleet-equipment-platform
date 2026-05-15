import { brand } from "@/lib/brand";

export function buildNotificationCopy(type: string, recipientName = "عميلنا العزيز") {
  const footer = `${brand.arabicName} | ${brand.primaryDomain}`;
  const templates: Record<string, { title: string; body: string; emailSubject: string }> = {
    QUOTE_SENT_TO_CUSTOMER: {
      title: "تم إصدار عرض سعر جديد",
      body: `${recipientName}، تم إصدار عرض سعر جديد عبر ${brand.arabicName}. يرجى المراجعة والاعتماد لاستكمال إجراءات التأمين والتشغيل.`,
      emailSubject: `${brand.arabicName} - عرض سعر جديد`
    },
    PAYMENT_REMINDER: {
      title: "تذكير بسداد الدفعة أو مبلغ التأمين",
      body: `${recipientName}، يرجى استكمال السداد حتى يتم تأكيد أمر التأجير وجدولة التسليم.`,
      emailSubject: `${brand.arabicName} - تذكير سداد`
    },
    DISPATCH_UPDATE: {
      title: "تحديث حالة الإرسال",
      body: `تم تحديث حالة إرسال المعدة. يمكن متابعة تفاصيل السائق والمركبة من لوحة ${brand.arabicName}.`,
      emailSubject: `${brand.arabicName} - تحديث الإرسال`
    }
  };

  return {
    ...(templates[type] ?? {
      title: `إشعار من ${brand.arabicName}`,
      body: `يوجد تحديث جديد على حسابك في ${brand.arabicName}.`,
      emailSubject: `${brand.arabicName} - إشعار جديد`
    }),
    footer
  };
}

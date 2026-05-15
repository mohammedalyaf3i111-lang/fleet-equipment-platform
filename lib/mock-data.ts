import { BadgeCheck, Banknote, ClipboardCheck, Construction, FileSignature, Forklift, Gauge, ShieldCheck, Truck, Users } from "lucide-react";
import type { DashboardRow, EquipmentItem, NavItem, Stat, WorkflowItem } from "@/lib/types";

export const publicNav: NavItem[] = [
  { label: "الرئيسية", href: "/" },
  { label: "المعدات", href: "/equipment" },
  { label: "سجل كمزود", href: "/become-supplier" },
  { label: "طلب معدة", href: "/request-equipment" },
  { label: "تواصل معنا", href: "/contact" }
];

export const categories = ["كرينات", "رافعات بوم", "رافعات شوكية", "بوبكات", "شيولات", "حفارات", "سطحات", "مولدات", "كمبروسرات", "مان لفت", "معدات نقل ثقيل"];

export const equipmentItems: EquipmentItem[] = [
  { id: "EQ-1001", category: "كرينات", brand: "Liebherr", model: "LTM 1050", city: "الرياض", status: "معتمد ومتاح", dailyPrice: 4200, supplier: "مؤسسة الخليج للمعدات", icon: Construction },
  { id: "EQ-1002", category: "رافعات شوكية", brand: "Toyota", model: "8FG50", city: "جدة", status: "معتمد ومتاح", dailyPrice: 850, supplier: "شركة حلول الرفع", icon: Forklift },
  { id: "EQ-1003", category: "شيولات", brand: "CAT", model: "966M", city: "الدمام", status: "قيد التأجير", dailyPrice: 2600, supplier: "معدات الشرقية", icon: Truck },
  { id: "EQ-1004", category: "مولدات", brand: "Perkins", model: "500KVA", city: "الخبر", status: "معتمد ومتاح", dailyPrice: 1200, supplier: "طاقة المشاريع", icon: Gauge }
];

export const landingStats: Stat[] = [
  { label: "طلبات نشطة", value: "38", hint: "قيد التسعير أو التشغيل" },
  { label: "مزودون موثقون", value: "17", hint: "مراجعة سجل تجاري وضريبة" },
  { label: "معدات معتمدة", value: "126", hint: "وثائق ملكية وفحص وتأمين" },
  { label: "متوسط التسعير", value: "42د", hint: "من الطلب إلى عرض السعر" }
];

export const workflows: WorkflowItem[] = [
  { title: "قدم الطلب", body: "حدد نوع المعدة والمدينة وموقع المشروع والمدة وهل تحتاج مشغلًا أو نقلًا." },
  { title: "مطابقة وتشغيل", body: "فريق العمليات يطابق الطلب مع مزودين ومعدات معتمدة فقط." },
  { title: "عرض وسداد", body: "عرض سعر شامل العمولة والضريبة والتأمين وشروط الدفع." },
  { title: "عقد وتسليم", body: "توليد عقد ونموذج استلام وتوثيق صور وتتبع حالة التسليم." }
];

export const valueProps = [
  { title: "حماية تعاقدية", body: "قوالب عقود ونماذج استلام وإرجاع وتوثيق أضرار قابلة للتصدير PDF.", icon: FileSignature },
  { title: "تحكم تشغيلي", body: "حالات طلب واضحة من التسعير حتى الإرجاع والنزاعات.", icon: ClipboardCheck },
  { title: "مدفوعات موثقة", body: "منطق تأمين ودفعات جزئية وتأكيد يدوي وسجل تدقيق لكل إجراء.", icon: Banknote },
  { title: "ثقة ومراجعة", body: "اعتماد مزودين ومعدات وتقييمات وسجل امتثال داخلي.", icon: ShieldCheck }
];

export const adminStats: Stat[] = [
  { label: "إجمالي الطلبات", value: "10", hint: "من البيانات التجريبية" },
  { label: "إيجارات نشطة", value: "3", hint: "قيد التشغيل" },
  { label: "مدفوعات معلقة", value: "2", hint: "تحتاج تأكيد" },
  { label: "نزاعات مفتوحة", value: "1", hint: "تحت المراجعة" },
  { label: "موردون مسجلون", value: "5", hint: "معتمدون" },
  { label: "معدات معتمدة", value: "18", hint: "جاهزة للعرض" },
  { label: "إيراد شهري", value: "184,500 ر.س", hint: "تقديري" },
  { label: "عمولة المنصة", value: "18,450 ر.س", hint: "10%" }
];

export const requestRows: DashboardRow[] = [
  { id: "REQ-1001", title: "كرين 50 طن - مشروع مستودعات", status: "بانتظار اعتماد العميل", amount: "28,750 ر.س", meta: "الرياض · 7 أيام" },
  { id: "REQ-1002", title: "رافعة شوكية للمصنع", status: "تم إرسال عرض سعر", amount: "6,325 ر.س", meta: "جدة · 5 أيام" },
  { id: "REQ-1003", title: "مولد 500KVA", status: "طلب جديد", meta: "الدمام · 10 أيام" },
  { id: "REQ-1004", title: "بوبكات مع مشغل", status: "قيد المطابقة", amount: "9,800 ر.س", meta: "الخبر · 4 أيام" }
];

export const orderRows: DashboardRow[] = [
  { id: "ORD-501", title: "حفار CAT 320", status: "إيجار نشط", amount: "31,200 ر.س", meta: "ينتهي خلال 3 أيام" },
  { id: "ORD-502", title: "شيول CAT 966M", status: "تم التسليم", amount: "18,900 ر.س", meta: "الدمام" },
  { id: "ORD-503", title: "رافعة بوم", status: "مكتمل", amount: "12,450 ر.س", meta: "تم توقيع نموذج الإرجاع" }
];

export const trustMetrics = [
  { label: "موثوقية السداد", value: "86%" },
  { label: "الالتزام بالإرجاع", value: "82%" },
  { label: "سرعة الاستجابة", value: "74%" },
  { label: "مستوى الثقة", value: "موثوق" }
];

export const contractTemplates = ["عقد تأجير العميل", "اتفاقية منصة المورد", "نموذج تسليم المعدة", "نموذج إرجاع المعدة", "تقرير أضرار", "إقرار دفع", "تقرير إلغاء"];

export const dashboardMenus = {
  customer: [
    ["لوحة التحكم", "/customer/dashboard"],
    ["طلباتي", "/customer/requests"],
    ["عروض الأسعار", "/customer/quotes"],
    ["الأوامر", "/customer/orders"],
    ["المدفوعات", "/customer/payments"],
    ["العقود", "/customer/contracts"],
    ["الملف الشخصي", "/customer/profile"]
  ],
  supplier: [
    ["لوحة التحكم", "/supplier/dashboard"],
    ["المعدات", "/supplier/equipment"],
    ["الأوامر", "/supplier/orders"],
    ["المستندات", "/supplier/documents"],
    ["المدفوعات", "/supplier/payments"],
    ["الملف الشخصي", "/supplier/profile"]
  ],
  admin: [
    ["لوحة التحكم", "/admin/dashboard"],
    ["الطلبات", "/admin/requests"],
    ["عروض الأسعار", "/admin/quotes"],
    ["الأوامر", "/admin/orders"],
    ["المعدات", "/admin/equipment"],
    ["تصنيفات المعدات", "/admin/catalog"],
    ["الموردون", "/admin/suppliers"],
    ["العملاء", "/admin/customers"],
    ["المدفوعات", "/admin/payments"],
    ["النزاعات", "/admin/disputes"],
    ["المركز القانوني", "/admin/legal"],
    ["المستندات القانونية", "/admin/legal/documents"],
    ["العقود", "/admin/contracts"],
    ["التقارير", "/admin/reports"],
    ["الإعدادات", "/admin/settings"]
  ]
};

export const roleCards = [
  { title: "العملاء والشركات", body: "طلب معدات ومراجعة عروض الأسعار واعتماد العقود وتتبع الطلبات والمدفوعات.", icon: Users },
  { title: "الملاك والموردون", body: "إدارة معدات ورفع وثائق وقبول أو رفض التعيينات وتحديث الإرسال.", icon: Truck },
  { title: "فريق العمليات", body: "اعتماد الموردين والمعدات وإصدار عروض ومتابعة التسليم وإدارة النزاعات.", icon: BadgeCheck }
];

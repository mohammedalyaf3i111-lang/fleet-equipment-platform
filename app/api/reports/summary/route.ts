import { ok } from "@/lib/api";
import { requireRole } from "@/lib/authz";

export async function GET(request: Request) {
  const denied = requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
  if (denied) return denied;

  return ok({
    generatedAt: new Date().toISOString(),
    reports: {
      totalRequests: 10,
      activeOrders: 3,
      monthlyRevenue: 184500,
      platformCommission: 18450,
      overduePayments: 2,
      topSuppliers: ["مؤسسة الخليج للمعدات", "شركة حلول الرفع", "معدات الشرقية"],
      topCategories: ["كرينات", "رافعات شوكية", "حفارات"],
      topCities: ["الرياض", "جدة", "الدمام"]
    },
    exportFormats: ["PDF", "Excel"],
    note: "الأرقام المعروضة تجريبية ومعدة لاختبار لوحة التقارير."
  });
}

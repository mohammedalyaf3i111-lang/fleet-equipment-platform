import { PrismaClient } from "@prisma/client";
import { cityArabicNames } from "../constants/cities";

const prisma = new PrismaClient();

const customers = [
  { name: "شركة الإنشاءات السعودية", city: cityArabicNames[0] },
  { name: "مصنع الخليج للمواد", city: cityArabicNames[1] },
  { name: "مؤسسة أعمال الرياض", city: cityArabicNames[2] }
];

const suppliers = [
  { name: "مؤسسة الخليج للمعدات", city: cityArabicNames[0], coverageAreas: [cityArabicNames[0], cityArabicNames[3], cityArabicNames[15]] },
  { name: "شركة حلول الرفع", city: cityArabicNames[1], coverageAreas: [cityArabicNames[1], cityArabicNames[5], cityArabicNames[7]] },
  { name: "معدات الشرقية", city: cityArabicNames[2], coverageAreas: [cityArabicNames[2], cityArabicNames[3], cityArabicNames[4]] },
  { name: "طاقة المشاريع", city: cityArabicNames[3], coverageAreas: [cityArabicNames[3], cityArabicNames[15], cityArabicNames[17]] },
  { name: "أسطول الرافعات الحديثة", city: cityArabicNames[15], coverageAreas: [cityArabicNames[0], cityArabicNames[2], cityArabicNames[15]] }
];

const equipment = [
  "كرين 7 طن",
  "كرين 10 طن",
  "كرين 15 طن",
  "كرين 20 طن",
  "كرين 25 طن",
  "كرين 30 طن",
  "كرين 50 طن",
  "كرين 70 طن",
  "كرين 100 طن",
  "كرين 150 طن",
  "بوكلين 120",
  "بوكلين 200",
  "بوكلين 320",
  "بوكلين صغير",
  "شيول 950",
  "شيول 966",
  "بوبكات S570",
  "فوركلفت 5 طن",
  "مولد 500KVA",
  "لوبد نقل معدات"
];

const requests = [
  "طلب كرين 50 طن لمشروع مستودعات في الرياض",
  "طلب فوركلفت 5 طن لمصنع في جدة",
  "طلب شيول CAT 966M في الدمام",
  "طلب مولد 500KVA في الخبر",
  "طلب بوكلين 320 في الرياض",
  "طلب بوبكات مع مشغل في الخبر",
  "طلب لوبد نقل معدات في جدة",
  "طلب بوم لفت 20 متر في الدمام",
  "طلب كمبروسر 375 CFM في الرياض",
  "طلب رصاصة 12 طن في مكة المكرمة"
];

async function main() {
  await prisma.$connect();
  console.log("تم تحميل بيانات seed العربية بصيغة UTF-8:");
  console.table({
    customers: customers.length,
    suppliers: suppliers.length,
    supportedCities: cityArabicNames.length,
    equipment: equipment.length,
    rentalRequests: requests.length,
    quotes: 5,
    activeOrders: 3,
    completedOrders: 2,
    disputes: 1
  });
  console.log("ملاحظة: قاعدة البيانات الفعلية تحتاج PostgreSQL يعمل على DATABASE_URL قبل تنفيذ الإدخال الكامل.");
}

main()
  .catch((error) => {
    console.error("فشل تشغيل seed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { z } from "zod";
import { cityNameSet } from "@/constants/cities";

const mobile = z.string().min(9, "رقم الجوال غير صحيح");
const email = z.string().email("البريد الإلكتروني غير صحيح");
const city = z.string().refine((value) => cityNameSet.has(value), "اختر مدينة من القائمة المعتمدة");

const preliminaryEquipmentSchema = z.object({
  equipmentType: z.string().min(1, "نوع المعدة مطلوب"),
  spec: z.string().optional(),
  quantity: z.coerce.number().int().positive("عدد الوحدات يجب أن يكون أكبر من صفر"),
  movementType: z.string().optional(),
  operatorIncluded: z.enum(["YES", "NO"]).default("NO"),
  city: z.string().optional().refine((value) => !value || cityNameSet.has(value), "اختر مدينة من القائمة المعتمدة"),
  notes: z.string().optional()
});

const preliminaryEquipmentListSchema = z.preprocess((value) => {
  if (!value || value === "") return [];
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}, z.array(preliminaryEquipmentSchema).default([]));

export const customerRegistrationSchema = z.object({
  fullName: z.string().min(3),
  mobile,
  email,
  nationalIdOrIqama: z.string().optional(),
  companyName: z.string().min(2),
  commercialRegistrationNumber: z.string().min(5),
  vatNumber: z.string().optional(),
  city,
  address: z.string().min(4),
  authorizedPersonName: z.string().min(3),
  acceptTerms: z.coerce.boolean().refine(Boolean)
});

export const supplierRegistrationSchema = z.object({
  ownerName: z.string().min(3),
  companyName: z.string().min(2),
  mobile,
  email,
  commercialNumber: z.string().min(5),
  vatNumber: z.string().min(5),
  city,
  coverageAreas: z.string().min(2).refine(
    (value) => value.split("،").map((item) => item.trim()).filter(Boolean).every((item) => cityNameSet.has(item)),
    "اختر مدن التغطية من القائمة المعتمدة"
  ),
  preliminaryEquipmentList: preliminaryEquipmentListSchema,
  bankIban: z.string().startsWith("SA"),
  acceptAgreement: z.coerce.boolean().refine(Boolean)
});

export const loginSchema = z.object({
  email,
  password: z.string().min(8),
  role: z.enum(["CUSTOMER", "SUPPLIER", "ADMIN", "SUPER_ADMIN"]).optional()
});

export const rentalRequestSchema = z.object({
  category: z.string().min(2),
  workType: z.string().min(2).optional(),
  equipmentType: z.string().min(2).optional(),
  city,
  fromCity: z.string().optional(),
  toCity: z.string().optional(),
  siteLocation: z.string().min(5),
  gpsCoordinates: z.string().optional(),
  startAt: z.string().min(8),
  durationDays: z.coerce.number().int().min(1),
  projectDetails: z.string().min(10),
  operatorRequired: z.coerce.boolean().default(false),
  transportRequired: z.coerce.boolean().default(false)
});

export const supplierOfferSchema = z.object({
  rentalRequestId: z.string().min(3),
  supplierId: z.string().min(3).default("SUP-001"),
  equipmentId: z.string().optional(),
  action: z.enum(["ACCEPT", "REJECT"]).default("ACCEPT"),
  priceAmount: z.coerce.number().positive("أدخل سعر العرض"),
  pricingType: z.enum(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "PROJECT"]).default("DAILY"),
  arrivalTime: z.string().min(2).optional(),
  transportCost: z.coerce.number().min(0).default(0),
  extraHourRate: z.coerce.number().min(0).default(0),
  waitingFee: z.coerce.number().min(0).default(0),
  fuelResponsibility: z.string().min(2).default("حسب الاتفاق"),
  terms: z.string().min(3).optional(),
  rejectedReason: z.string().optional()
});

export const operationOrderSchema = z.object({
  rentalRequestId: z.string().min(3),
  supplierOfferId: z.string().optional(),
  customerId: z.string().min(3).default("CUST-001"),
  supplierId: z.string().min(3).default("SUP-001"),
  equipmentId: z.string().optional(),
  city,
  siteLocation: z.string().min(5),
  gpsCoordinates: z.string().optional(),
  startAt: z.string().min(8),
  durationLabel: z.string().min(2),
  dailyHours: z.coerce.number().int().min(1).max(24).optional(),
  priceAmount: z.coerce.number().positive(),
  pricingType: z.enum(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "PROJECT"]).default("DAILY"),
  transportCost: z.coerce.number().min(0).default(0),
  fuelResponsibility: z.string().min(2).default("حسب الاتفاق"),
  extraHourRate: z.coerce.number().min(0).default(0),
  waitingFee: z.coerce.number().min(0).default(0),
  commissionPercent: z.coerce.number().min(0).max(40).default(10)
});

export const notificationCreateSchema = z.object({
  userId: z.string().optional(),
  type: z.string().min(3),
  channel: z.enum(["WHATSAPP", "SMS", "EMAIL", "IN_APP"]).default("IN_APP"),
  title: z.string().min(3),
  body: z.string().min(3),
  relatedId: z.string().optional()
});

export const fleetStatusSchema = z.object({
  supplierId: z.string().min(3).default("SUP-001"),
  equipmentId: z.string().optional(),
  equipmentName: z.string().min(2),
  status: z.enum(["AVAILABLE", "RENTED", "MAINTENANCE", "INSPECTION_EXPIRING", "INSURANCE_EXPIRING"]),
  hourMeterReading: z.coerce.number().int().min(0).optional(),
  plateNumber: z.string().optional(),
  inspectionExpiryDate: z.string().optional(),
  insuranceExpiryDate: z.string().optional(),
  lastServiceNote: z.string().optional()
});

export const paymentConfirmationSchema = z.object({
  orderId: z.string().min(3),
  amount: z.coerce.number().positive(),
  method: z.enum(["BANK_TRANSFER", "MADA", "CREDIT_CARD", "MANUAL_ADMIN_CONFIRMATION"]),
  notes: z.string().optional()
});

export const quoteCreateSchema = z.object({
  rentalRequestId: z.string().min(3),
  dailyRate: z.coerce.number().positive(),
  durationDays: z.coerce.number().int().min(1),
  transportCost: z.coerce.number().min(0).default(0),
  operatorDailyCost: z.coerce.number().min(0).default(0),
  deposit: z.coerce.number().min(0).default(0),
  validityDays: z.coerce.number().int().min(1).max(30).default(7),
  paymentTerms: z.string().min(5)
});

export const handoverSchema = z.object({
  orderId: z.string().min(3),
  hourMeterReading: z.coerce.number().int().min(0),
  fuelLevel: z.string().min(2),
  equipmentCondition: z.string().min(3),
  typedName: z.string().min(3)
});

export const returnReportSchema = handoverSchema.extend({
  damageFound: z.coerce.boolean().default(false),
  comparisonNotes: z.string().min(3)
});

export const disputeSchema = z.object({
  orderId: z.string().min(3),
  reason: z.enum(["DAMAGE", "LATE_RETURN", "NON_PAYMENT", "WRONG_EQUIPMENT", "SITE_ACCESS_ISSUE", "OPERATOR_ISSUE", "CANCELLATION"]),
  notes: z.string().min(5)
});

export const ratingSchema = z.object({
  orderId: z.string().min(3),
  fromUserId: z.string().min(3),
  toUserId: z.string().min(3),
  score: z.coerce.number().int().min(1).max(5),
  notes: z.string().optional(),
  paymentReliability: z.coerce.number().int().min(0).max(100).optional(),
  returnCompliance: z.coerce.number().int().min(0).max(100).optional(),
  damageHistory: z.coerce.number().int().min(0).optional(),
  cancellationRate: z.coerce.number().min(0).max(100).optional(),
  responseSpeed: z.coerce.number().int().min(0).max(100).optional()
});

export const legalAcceptanceSchema = z.object({
  userId: z.string().min(3).default("demo-user"),
  documentType: z.string().min(3),
  documentVersion: z.string().min(1).default("1.0.0"),
  relatedOrderId: z.string().optional(),
  contractId: z.string().optional(),
  typedFullName: z.string().min(3).optional(),
  signedBy: z.string().min(3).optional(),
  nationalIdOrCr: z.string().min(5).default("1010123456"),
  acceptTerms: z.coerce.boolean().default(true),
  acceptContract: z.coerce.boolean().optional()
});

export const DEFAULT_COMMISSION_PERCENT = 10;
export const SAUDI_VAT_PERCENT = 15;
export const DEFAULT_LATE_FEE_MULTIPLIER = 1.5;

export function calculateQuote(input: {
  dailyRate: number;
  durationDays: number;
  transportCost?: number;
  operatorDailyCost?: number;
  deposit?: number;
  commissionPercent?: number;
}) {
  const equipmentPrice = input.dailyRate * input.durationDays;
  const transportCost = input.transportCost ?? 0;
  const operatorCost = (input.operatorDailyCost ?? 0) * input.durationDays;
  const deposit = input.deposit ?? 0;
  const platformFee = equipmentPrice * ((input.commissionPercent ?? DEFAULT_COMMISSION_PERCENT) / 100);
  const taxable = equipmentPrice + transportCost + operatorCost + platformFee;
  const vat = taxable * (SAUDI_VAT_PERCENT / 100);

  return {
    equipmentPrice,
    transportCost,
    operatorCost,
    deposit,
    platformFee,
    vat,
    totalPayable: taxable + vat + deposit
  };
}

export function calculateLateFee(dailyRate: number, extraDays: number, multiplier = DEFAULT_LATE_FEE_MULTIPLIER) {
  return dailyRate * multiplier * extraDays;
}

export function canBookEquipment(status: string, available: boolean) {
  return available && status === "APPROVED";
}

export function canConfirmOrder(params: { quoteApproved: boolean; requiredPaymentConfirmed: boolean }) {
  return params.quoteApproved && params.requiredPaymentConfirmed;
}

export function canCompleteLegalOrder(params: {
  termsAccepted: boolean;
  rentalContractAccepted: boolean;
  typedFullName?: string;
  nationalIdOrCr?: string;
  pdfStored: boolean;
  relatedOrderId?: string;
}) {
  return Boolean(
    params.termsAccepted &&
      params.rentalContractAccepted &&
      params.typedFullName &&
      params.nationalIdOrCr &&
      params.pdfStored &&
      params.relatedOrderId
  );
}

export function canApproveSupplierLegally(params: {
  supplierAgreementAccepted: boolean;
  crUploaded: boolean;
  ownershipOrAuthorizationUploaded: boolean;
  commissionPolicyAccepted: boolean;
  damageAndLatePolicyAccepted: boolean;
  disputePolicyAccepted: boolean;
}) {
  return Object.values(params).every(Boolean);
}

export const rentalStatusFlow = [
  "طلب جديد",
  "جاري التسعير",
  "تم إرسال عرض السعر",
  "بانتظار موافقة العميل",
  "بانتظار الدفع أو التأمين",
  "مؤكد",
  "المعدة في الطريق",
  "تم التسليم",
  "الإيجار نشط",
  "طلب تمديد",
  "طلب إرجاع",
  "مكتمل",
  "نزاع",
  "ملغي"
] as const;

export function calculateTrustLevel(input: {
  paymentReliability: number;
  returnCompliance: number;
  damageHistoryCount: number;
  cancellationRate: number;
  responseSpeed: number;
}) {
  if (input.damageHistoryCount > 3 || input.cancellationRate > 35) return "مقيد";
  const score =
    input.paymentReliability * 0.32 +
    input.returnCompliance * 0.28 +
    input.responseSpeed * 0.22 +
    Math.max(0, 100 - input.damageHistoryCount * 12) * 0.1 +
    Math.max(0, 100 - input.cancellationRate) * 0.08;

  if (score >= 88) return "ممتاز";
  if (score >= 74) return "موثوق";
  if (score >= 58) return "موثق";
  return "جديد";
}

export function statusTone(status: string) {
  if (["مكتمل", "تم التسليم", "مدفوع بالكامل", "معتمدة", "موثق"].some((item) => status.includes(item))) {
    return "success";
  }
  if (["نزاع", "متأخر", "مرفوضة", "ملغي", "تلف"].some((item) => status.includes(item))) {
    return "danger";
  }
  if (["بانتظار", "قيد", "جاري", "مراجعة"].some((item) => status.includes(item))) {
    return "warning";
  }
  return "info";
}

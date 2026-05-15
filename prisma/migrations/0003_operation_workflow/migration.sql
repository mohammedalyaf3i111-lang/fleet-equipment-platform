-- Operation workflow tables for the practical request cycle.
-- PostgreSQL must be running on DATABASE_URL before applying this migration.

ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "workType" TEXT;
ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "equipmentType" TEXT;
ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "fromCity" TEXT;
ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "toCity" TEXT;
ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "gpsCoordinates" TEXT;
ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "distanceEstimateKm" DOUBLE PRECISION;
ALTER TABLE IF EXISTS "RentalRequest" ADD COLUMN IF NOT EXISTS "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[];

CREATE TABLE IF NOT EXISTS "EquipmentPhoto" (
  "id" TEXT NOT NULL,
  "equipmentId" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "title" TEXT,
  "type" TEXT NOT NULL DEFAULT 'EQUIPMENT',
  "uploadedBy" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "EquipmentPhoto_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SupplierOffer" (
  "id" TEXT NOT NULL,
  "rentalRequestId" TEXT NOT NULL,
  "supplierId" TEXT NOT NULL,
  "equipmentId" TEXT,
  "status" TEXT NOT NULL DEFAULT 'SENT',
  "priceAmount" DECIMAL(12,2) NOT NULL,
  "pricingType" TEXT NOT NULL,
  "arrivalTime" TEXT,
  "transportCost" DECIMAL(12,2),
  "extraHourRate" DECIMAL(12,2),
  "waitingFee" DECIMAL(12,2),
  "fuelResponsibility" TEXT,
  "terms" TEXT,
  "rejectedReason" TEXT,
  "acceptedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SupplierOffer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "OperationOrder" (
  "id" TEXT NOT NULL,
  "rentalRequestId" TEXT NOT NULL,
  "supplierOfferId" TEXT,
  "customerId" TEXT NOT NULL,
  "supplierId" TEXT NOT NULL,
  "equipmentId" TEXT,
  "orderNumber" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'AWAITING_SUPPLIER_ACCEPTANCE',
  "city" TEXT NOT NULL,
  "siteLocation" TEXT NOT NULL,
  "gpsCoordinates" TEXT,
  "startAt" TIMESTAMP(3) NOT NULL,
  "durationLabel" TEXT NOT NULL,
  "dailyHours" INTEGER,
  "priceAmount" DECIMAL(12,2) NOT NULL,
  "pricingType" TEXT NOT NULL,
  "transportCost" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "fuelResponsibility" TEXT,
  "extraHourRate" DECIMAL(12,2),
  "waitingFee" DECIMAL(12,2),
  "vatAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "commissionPercent" DOUBLE PRECISION NOT NULL DEFAULT 10,
  "commissionAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "supplierNet" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "customerAcceptedAt" TIMESTAMP(3),
  "supplierAcceptedAt" TIMESTAMP(3),
  "pdfFileId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OperationOrder_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "PaymentRecord" (
  "id" TEXT NOT NULL,
  "operationOrderId" TEXT,
  "rentalOrderId" TEXT,
  "amount" DECIMAL(12,2) NOT NULL,
  "method" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING_ADMIN_CONFIRMATION',
  "transferRef" TEXT,
  "proofFileId" TEXT,
  "confirmedById" TEXT,
  "confirmedAt" TIMESTAMP(3),
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PaymentRecord_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "FleetStatus" (
  "id" TEXT NOT NULL,
  "supplierId" TEXT NOT NULL,
  "equipmentId" TEXT,
  "equipmentName" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "hourMeterReading" INTEGER,
  "plateNumber" TEXT,
  "inspectionExpiryDate" TIMESTAMP(3),
  "insuranceExpiryDate" TIMESTAMP(3),
  "lastServiceNote" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "FleetStatus_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "SupplierSubscription" (
  "id" TEXT NOT NULL,
  "supplierId" TEXT NOT NULL,
  "plan" TEXT NOT NULL DEFAULT 'FREE',
  "status" TEXT NOT NULL DEFAULT 'ACTIVE',
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3),
  "notes" TEXT,
  CONSTRAINT "SupplierSubscription_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "OperationOrder_orderNumber_key" ON "OperationOrder"("orderNumber");
CREATE INDEX IF NOT EXISTS "EquipmentPhoto_equipmentId_idx" ON "EquipmentPhoto"("equipmentId");
CREATE INDEX IF NOT EXISTS "SupplierOffer_rentalRequestId_supplierId_idx" ON "SupplierOffer"("rentalRequestId", "supplierId");
CREATE INDEX IF NOT EXISTS "OperationOrder_rentalRequestId_supplierId_status_idx" ON "OperationOrder"("rentalRequestId", "supplierId", "status");
CREATE INDEX IF NOT EXISTS "PaymentRecord_operationOrderId_rentalOrderId_status_idx" ON "PaymentRecord"("operationOrderId", "rentalOrderId", "status");
CREATE INDEX IF NOT EXISTS "FleetStatus_supplierId_status_idx" ON "FleetStatus"("supplierId", "status");
CREATE INDEX IF NOT EXISTS "SupplierSubscription_supplierId_plan_status_idx" ON "SupplierSubscription"("supplierId", "plan", "status");

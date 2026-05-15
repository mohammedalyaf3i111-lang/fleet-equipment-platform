-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'SUPPLIER', 'DRIVER', 'ADMIN', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "TrustLevel" AS ENUM ('NEW', 'VERIFIED', 'TRUSTED', 'PREMIUM', 'RESTRICTED');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EquipmentStatus" AS ENUM ('PENDING_REVIEW', 'APPROVED', 'REJECTED', 'INACTIVE', 'RENTED');

-- CreateEnum
CREATE TYPE "RentalRequestStatus" AS ENUM ('NEW', 'QUOTED', 'AWAITING_CUSTOMER_APPROVAL', 'AWAITING_PAYMENT_DEPOSIT', 'CONFIRMED', 'EQUIPMENT_DISPATCHED', 'DELIVERED', 'ACTIVE_RENTAL', 'EXTENSION_REQUESTED', 'RETURN_REQUESTED', 'COMPLETED', 'DISPUTE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('DRAFT', 'SENT', 'APPROVED', 'REJECTED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ContractType" AS ENUM ('CUSTOMER_RENTAL_AGREEMENT', 'SUPPLIER_PLATFORM_AGREEMENT', 'EQUIPMENT_HANDOVER_FORM', 'EQUIPMENT_RETURN_FORM', 'DAMAGE_REPORT', 'PAYMENT_ACKNOWLEDGMENT', 'CANCELLATION_REPORT');

-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('DRAFT', 'GENERATED', 'ACCEPTED', 'SIGNED', 'VOID');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'DEPOSIT_PAID', 'PARTIALLY_PAID', 'FULLY_PAID', 'OVERDUE', 'REFUNDED', 'DEDUCTED_FROM_DEPOSIT');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('BANK_TRANSFER', 'MADA', 'CREDIT_CARD', 'MANUAL_ADMIN_CONFIRMATION');

-- CreateEnum
CREATE TYPE "DispatchStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'ON_THE_WAY', 'DELIVERED');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('WHATSAPP', 'SMS', 'EMAIL', 'IN_APP');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_REQUEST_TO_ADMIN', 'QUOTE_SENT_TO_CUSTOMER', 'CUSTOMER_APPROVED_QUOTE', 'PAYMENT_REMINDER', 'SUPPLIER_ASSIGNMENT', 'DISPATCH_UPDATE', 'DELIVERY_CONFIRMATION', 'RENTAL_ENDING_SOON', 'LATE_RETURN_WARNING', 'DISPUTE_OPENED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'MOCK_SENT', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "DisputeReason" AS ENUM ('DAMAGE', 'LATE_RETURN', 'NON_PAYMENT', 'WRONG_EQUIPMENT', 'SITE_ACCESS_ISSUE', 'OPERATOR_ISSUE', 'CANCELLATION');

-- CreateEnum
CREATE TYPE "DisputeStatus" AS ENUM ('OPEN', 'UNDER_REVIEW', 'AWAITING_PAYMENT', 'RESOLVED', 'ESCALATED_LEGAL');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('USER_LOGIN', 'REGISTRATION', 'EQUIPMENT_ADDED', 'EQUIPMENT_APPROVED', 'QUOTE_CREATED', 'QUOTE_APPROVED', 'CONTRACT_GENERATED', 'PAYMENT_CONFIRMED', 'HANDOVER_SIGNED', 'RETURN_SIGNED', 'DISPUTE_OPENED', 'ADMIN_STATUS_CHANGE');

-- CreateEnum
CREATE TYPE "LegalDocumentType" AS ENUM ('TERMS_AND_CONDITIONS', 'PRIVACY_POLICY', 'CUSTOMER_AGREEMENT', 'SUPPLIER_AGREEMENT', 'EQUIPMENT_RENTAL_CONTRACT', 'CANCELLATION_POLICY', 'LATE_FEES_POLICY', 'DAMAGE_POLICY', 'DEPOSIT_POLICY', 'DISPUTE_POLICY', 'DISCLAIMER', 'HANDOVER_FORM', 'RETURN_FORM', 'DAMAGE_REPORT');

-- CreateEnum
CREATE TYPE "LegalDocumentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "trustLevel" "TrustLevel" NOT NULL DEFAULT 'NEW',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "termsAcceptedAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nationalIdOrIqama" TEXT,
    "companyName" TEXT NOT NULL,
    "commercialRegistrationNumber" TEXT NOT NULL,
    "vatNumber" TEXT,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "authorizedPersonName" TEXT NOT NULL,
    "crDocumentId" TEXT,
    "vatCertificateId" TEXT,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "paymentReliability" INTEGER NOT NULL DEFAULT 50,
    "returnCompliance" INTEGER NOT NULL DEFAULT 50,
    "damageHistoryCount" INTEGER NOT NULL DEFAULT 0,
    "cancellationRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "responseSpeed" INTEGER NOT NULL DEFAULT 50,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "commercialNumber" TEXT NOT NULL,
    "vatNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "coverageAreas" TEXT[],
    "preliminaryEquipmentList" JSONB,
    "bankIban" TEXT NOT NULL,
    "crDocumentId" TEXT,
    "vatCertificateId" TEXT,
    "authorizationLetterId" TEXT,
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupplierProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "categoryId" TEXT,
    "typeId" TEXT,
    "category" TEXT NOT NULL,
    "typeName" TEXT,
    "specifications" JSONB,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "capacity" TEXT NOT NULL,
    "plateOrSerialNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "currentLocation" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "hourMeterReading" INTEGER NOT NULL,
    "gpsInstalled" BOOLEAN NOT NULL DEFAULT false,
    "insuranceExpiryDate" TIMESTAMP(3) NOT NULL,
    "inspectionExpiryDate" TIMESTAMP(3) NOT NULL,
    "dailyPrice" DECIMAL(12,2) NOT NULL,
    "weeklyPrice" DECIMAL(12,2),
    "monthlyPrice" DECIMAL(12,2),
    "hourlyPrice" DECIMAL(12,2),
    "operatorIncluded" BOOLEAN NOT NULL DEFAULT false,
    "transportationIncluded" BOOLEAN NOT NULL DEFAULT false,
    "depositRequired" DECIMAL(12,2) NOT NULL,
    "minimumRentalPeriod" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "status" "EquipmentStatus" NOT NULL DEFAULT 'PENDING_REVIEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "description" TEXT,
    "iconName" TEXT NOT NULL,
    "defaultImage" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentType" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "capacityLabel" TEXT,
    "capacityValue" DOUBLE PRECISION,
    "capacityUnit" TEXT,
    "specFields" JSONB NOT NULL,
    "defaultSpecs" JSONB,
    "defaultImage" TEXT,
    "seoTitle" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EquipmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentDocument" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentPhoto" (
    "id" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "type" TEXT NOT NULL DEFAULT 'EQUIPMENT',
    "uploadedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EquipmentPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalRequest" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "workType" TEXT,
    "equipmentType" TEXT,
    "city" TEXT NOT NULL,
    "fromCity" TEXT,
    "toCity" TEXT,
    "siteLocation" TEXT NOT NULL,
    "gpsCoordinates" TEXT,
    "distanceEstimateKm" DOUBLE PRECISION,
    "startAt" TIMESTAMP(3) NOT NULL,
    "durationDays" INTEGER NOT NULL,
    "projectDetails" TEXT NOT NULL,
    "operatorRequired" BOOLEAN NOT NULL,
    "transportRequired" BOOLEAN NOT NULL,
    "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "siteAccessDocumentId" TEXT,
    "status" "RentalRequestStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierOffer" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SupplierOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperationOrder" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OperationOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentRecord" (
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

-- CreateTable
CREATE TABLE "FleetStatus" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FleetStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupplierSubscription" (
    "id" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'FREE',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "notes" TEXT,

    CONSTRAINT "SupplierSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "rentalRequestId" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'DRAFT',
    "rentalDurationDays" INTEGER NOT NULL,
    "equipmentPrice" DECIMAL(12,2) NOT NULL,
    "transportCost" DECIMAL(12,2) NOT NULL,
    "operatorCost" DECIMAL(12,2) NOT NULL,
    "deposit" DECIMAL(12,2) NOT NULL,
    "platformFee" DECIMAL(12,2) NOT NULL,
    "vat" DECIMAL(12,2) NOT NULL,
    "totalPayable" DECIMAL(12,2) NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "validUntil" TIMESTAMP(3) NOT NULL,
    "pdfFileId" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteItem" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,

    CONSTRAINT "QuoteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RentalOrder" (
    "id" TEXT NOT NULL,
    "rentalRequestId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "supplierId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,
    "status" "RentalRequestStatus" NOT NULL DEFAULT 'CONFIRMED',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentalOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" TEXT NOT NULL,
    "orderId" TEXT,
    "type" "ContractType" NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "pdfFileId" TEXT,
    "legalDocumentVersion" TEXT,
    "digitalAccepted" BOOLEAN NOT NULL DEFAULT false,
    "acceptedByTypedName" TEXT,
    "acceptedAt" TIMESTAMP(3),
    "ipAddressPlaceholder" TEXT,
    "attachmentsList" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HandoverReport" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "photos" TEXT[],
    "videoFileId" TEXT,
    "hourMeterReading" INTEGER NOT NULL,
    "fuelLevel" TEXT NOT NULL,
    "equipmentCondition" TEXT NOT NULL,
    "customerSigned" BOOLEAN NOT NULL DEFAULT false,
    "typedName" TEXT,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HandoverReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReturnReport" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "photos" TEXT[],
    "hourMeterReading" INTEGER NOT NULL,
    "fuelLevel" TEXT NOT NULL,
    "equipmentCondition" TEXT NOT NULL,
    "damageFound" BOOLEAN NOT NULL DEFAULT false,
    "comparisonNotes" TEXT NOT NULL,
    "customerSigned" BOOLEAN NOT NULL DEFAULT false,
    "typedName" TEXT,
    "signedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReturnReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "receiptFileId" TEXT,
    "confirmedById" TEXT,
    "confirmedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deposit" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "deductionAmount" DECIMAL(12,2),
    "refundAmount" DECIMAL(12,2),
    "notes" TEXT,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispatch" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "driverId" TEXT,
    "status" "DispatchStatus" NOT NULL DEFAULT 'PENDING',
    "rejectReason" TEXT,
    "dispatchTime" TIMESTAMP(3),
    "truckPlate" TEXT,
    "driverMobile" TEXT,
    "deliveredAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dispatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "supplierId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "iqamaNumber" TEXT,
    "licenseType" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" "NotificationType" NOT NULL,
    "channel" "NotificationChannel" NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "payload" JSONB,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dispute" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "reason" "DisputeReason" NOT NULL,
    "status" "DisputeStatus" NOT NULL DEFAULT 'OPEN',
    "evidenceFiles" TEXT[],
    "adminNotes" TEXT,
    "supplierNotes" TEXT,
    "customerNotes" TEXT,
    "openedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Dispute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "notes" TEXT,
    "paymentReliability" INTEGER,
    "returnCompliance" INTEGER,
    "damageHistory" INTEGER,
    "cancellationRate" DOUBLE PRECISION,
    "responseSpeed" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "action" "AuditAction" NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "ipAddress" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalDocument" (
    "id" TEXT NOT NULL,
    "type" "LegalDocumentType" NOT NULL,
    "title" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "status" "LegalDocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "body" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "editedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalDocumentTemplate" (
    "id" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "arabicName" TEXT NOT NULL,
    "englishName" TEXT NOT NULL,
    "templateContent" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LegalDocumentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratedDocument" (
    "id" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "orderId" TEXT,
    "customerId" TEXT,
    "supplierId" TEXT,
    "generatedPdfUrl" TEXT NOT NULL,
    "generatedHtml" TEXT NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "signedBy" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalAcceptanceLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "documentType" "LegalDocumentType" NOT NULL,
    "documentVersion" TEXT NOT NULL,
    "relatedOrderId" TEXT,
    "contractId" TEXT,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT NOT NULL,
    "typedFullName" TEXT NOT NULL,
    "nationalIdOrCr" TEXT NOT NULL,
    "userAgent" TEXT,

    CONSTRAINT "LegalAcceptanceLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT,
    "originalName" TEXT NOT NULL,
    "storagePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "sizeBytes" INTEGER NOT NULL,
    "checksum" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlatformSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProfile_userId_key" ON "CustomerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SupplierProfile_userId_key" ON "SupplierProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_plateOrSerialNumber_key" ON "Equipment"("plateOrSerialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentCategory_slug_key" ON "EquipmentCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentType_slug_key" ON "EquipmentType"("slug");

-- CreateIndex
CREATE INDEX "EquipmentType_categoryId_isActive_idx" ON "EquipmentType"("categoryId", "isActive");

-- CreateIndex
CREATE INDEX "EquipmentPhoto_equipmentId_idx" ON "EquipmentPhoto"("equipmentId");

-- CreateIndex
CREATE INDEX "SupplierOffer_rentalRequestId_supplierId_idx" ON "SupplierOffer"("rentalRequestId", "supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "OperationOrder_orderNumber_key" ON "OperationOrder"("orderNumber");

-- CreateIndex
CREATE INDEX "OperationOrder_rentalRequestId_supplierId_status_idx" ON "OperationOrder"("rentalRequestId", "supplierId", "status");

-- CreateIndex
CREATE INDEX "PaymentRecord_operationOrderId_rentalOrderId_status_idx" ON "PaymentRecord"("operationOrderId", "rentalOrderId", "status");

-- CreateIndex
CREATE INDEX "FleetStatus_supplierId_status_idx" ON "FleetStatus"("supplierId", "status");

-- CreateIndex
CREATE INDEX "SupplierSubscription_supplierId_plan_status_idx" ON "SupplierSubscription"("supplierId", "plan", "status");

-- CreateIndex
CREATE UNIQUE INDEX "RentalOrder_quoteId_key" ON "RentalOrder"("quoteId");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_userId_key" ON "Driver"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocument_type_version_key" ON "LegalDocument"("type", "version");

-- CreateIndex
CREATE INDEX "LegalDocumentTemplate_documentType_isPublished_idx" ON "LegalDocumentTemplate"("documentType", "isPublished");

-- CreateIndex
CREATE UNIQUE INDEX "LegalDocumentTemplate_documentType_version_key" ON "LegalDocumentTemplate"("documentType", "version");

-- CreateIndex
CREATE INDEX "GeneratedDocument_documentType_orderId_idx" ON "GeneratedDocument"("documentType", "orderId");

-- CreateIndex
CREATE INDEX "LegalAcceptanceLog_userId_documentType_relatedOrderId_idx" ON "LegalAcceptanceLog"("userId", "documentType", "relatedOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "PlatformSetting_key_key" ON "PlatformSetting"("key");

-- AddForeignKey
ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupplierProfile" ADD CONSTRAINT "SupplierProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "SupplierProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EquipmentCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "EquipmentType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentType" ADD CONSTRAINT "EquipmentType_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "EquipmentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentDocument" ADD CONSTRAINT "EquipmentDocument_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentDocument" ADD CONSTRAINT "EquipmentDocument_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "UploadedFile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalRequest" ADD CONSTRAINT "RentalRequest_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_rentalRequestId_fkey" FOREIGN KEY ("rentalRequestId") REFERENCES "RentalRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteItem" ADD CONSTRAINT "QuoteItem_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalOrder" ADD CONSTRAINT "RentalOrder_rentalRequestId_fkey" FOREIGN KEY ("rentalRequestId") REFERENCES "RentalRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalOrder" ADD CONSTRAINT "RentalOrder_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalOrder" ADD CONSTRAINT "RentalOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalOrder" ADD CONSTRAINT "RentalOrder_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "SupplierProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentalOrder" ADD CONSTRAINT "RentalOrder_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HandoverReport" ADD CONSTRAINT "HandoverReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReturnReport" ADD CONSTRAINT "ReturnReport_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispatch" ADD CONSTRAINT "Dispatch_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispatch" ADD CONSTRAINT "Dispatch_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "SupplierProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dispute" ADD CONSTRAINT "Dispute_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "RentalOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalDocument" ADD CONSTRAINT "LegalDocument_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalAcceptanceLog" ADD CONSTRAINT "LegalAcceptanceLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalAcceptanceLog" ADD CONSTRAINT "LegalAcceptanceLog_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "LegalDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalAcceptanceLog" ADD CONSTRAINT "LegalAcceptanceLog_relatedOrderId_fkey" FOREIGN KEY ("relatedOrderId") REFERENCES "RentalOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegalAcceptanceLog" ADD CONSTRAINT "LegalAcceptanceLog_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;


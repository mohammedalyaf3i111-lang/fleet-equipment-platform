# فليت معدات

**Fleet Equipment** is an Arabic-first B2B heavy equipment rental marketplace and operations MVP for Saudi Arabia. The main public brand is **فليت معدات**, with the English brand used for technical, SEO, and domain contexts.

Domains:

- `fleetequipment.sa`
- `fleet-equipment.com`

## Stack

- Next.js / React / TypeScript
- Tailwind CSS with RTL Arabic UI
- Node.js API routes
- PostgreSQL + Prisma ORM
- Zod validation
- PDF contract draft route
- Manual payment confirmation MVP
- Notification architecture placeholders for WhatsApp, SMS, and email

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
copy .env.example .env
```

3. Update `DATABASE_URL` in `.env` for your PostgreSQL database.

4. Generate Prisma Client:

```bash
npm run prisma:generate
```

5. Create database tables:

```bash
npm run prisma:migrate
```

6. Seed demo data:

```bash
npm run prisma:seed
```

7. Start development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Seed Credentials

- Admin: `admin901@fleetequipment.sa`
- Super Admin: `super_admin900@fleetequipment.sa`
- Customer: `customer1@fleetequipment.sa`
- Supplier: `supplier11@fleetequipment.sa`
- Password for all seeded users: `FleetEquipment@123`

## Main Routes

Public:

- `/`
- `/about`
- `/equipment`
- `/become-supplier`
- `/request-equipment`
- `/contact`
- `/terms`
- `/privacy`

Auth:

- `/login`
- `/register/customer`
- `/register/supplier`

Customer:

- `/customer/dashboard`
- `/customer/requests`
- `/customer/quotes`
- `/customer/orders`
- `/customer/payments`
- `/customer/contracts`
- `/customer/profile`

Supplier:

- `/supplier/dashboard`
- `/supplier/equipment`
- `/supplier/orders`
- `/supplier/documents`
- `/supplier/payments`
- `/supplier/profile`

Admin:

- `/admin/dashboard`
- `/admin/requests`
- `/admin/quotes`
- `/admin/orders`
- `/admin/equipment`
- `/admin/suppliers`
- `/admin/customers`
- `/admin/payments`
- `/admin/disputes`
- `/admin/contracts`
- `/admin/reports`
- `/admin/settings`

## MVP Notes

- Payment gateway is represented by manual admin confirmation.
- WhatsApp/SMS/email are represented by notification records and mock-send route.
- Digital signature is represented by acceptance checkbox, typed name, timestamp, and IP placeholder.
- Contract PDFs are professional drafts and include the required legal disclaimer.
- Supplier approval and equipment approval are modeled as server-side states.
- Equipment booking rules, VAT, commission, late fee, and confirmation logic are centralized in `lib/business.ts`.
- Operational APIs are available for quotes, handover, return reports, disputes, ratings, payments, and summary reports.

## Operations API Routes

- `POST /api/quotes`
- `POST /api/handover`
- `POST /api/return-report`
- `POST /api/disputes`
- `POST /api/ratings`
- `POST /api/payments/confirm`
- `GET /api/reports/summary`

## Brand Assets

- Logo: `public/logo.svg`
- Favicon: `public/favicon.svg`
- App icon: `public/app-icon.svg`
- Social preview: `public/social-preview.svg`

## Legal Disclaimer

هذه النماذج أولية ويجب مراجعتها من مستشار قانوني مرخص داخل المملكة العربية السعودية قبل الاعتماد النهائي.

## Remaining Integrations

- Payment gateway: Mada / cards / bank reconciliation
- WhatsApp Business API
- Nafath / Absher verification
- ZATCA e-invoicing
- Digital signature provider
- GPS provider
- Insurance provider

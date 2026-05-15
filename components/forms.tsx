import { Field, SubmitButton } from "@/components/ui";
import { brand } from "@/lib/brand";
import { SupplierEquipmentListFields } from "@/components/supplier-equipment-list";
import { CoverageAreasField } from "@/components/city-fields";
import { equipmentTypeGroups } from "@/constants/equipmentTypes";

export function LoginForm() {
  return (
    <form action="/api/auth/login" method="post" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <Field label="البريد الإلكتروني" name="email" type="email" />
      <Field label="كلمة المرور" name="password" type="password" />
      <label className="block text-sm font-bold text-navy">
        الدور
        <select name="role" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm">
          <option value="CUSTOMER">عميل</option>
          <option value="SUPPLIER">مزود معدات</option>
          <option value="ADMIN">مشرف</option>
          <option value="SUPER_ADMIN">مدير عام</option>
        </select>
      </label>
      <SubmitButton>تسجيل الدخول</SubmitButton>
      <p className="text-sm text-steel">بيانات المدير التجريبية: admin901@fleetequipment.sa / {brand.seedPassword}</p>
    </form>
  );
}

export function CustomerRegisterForm() {
  return (
    <form action="/api/register/customer" method="post" encType="multipart/form-data" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-2">
      <Field label="الاسم الكامل" name="fullName" />
      <Field label="رقم الجوال" name="mobile" />
      <Field label="البريد الإلكتروني" name="email" type="email" />
      <Field label="رقم الهوية أو الإقامة اختياري" name="nationalIdOrIqama" required={false} />
      <Field label="اسم الشركة" name="companyName" />
      <Field label="رقم السجل التجاري" name="commercialRegistrationNumber" />
      <Field label="الرقم الضريبي اختياري" name="vatNumber" required={false} />
      <Field label="المدينة" name="city" as="select" />
      <Field label="العنوان" name="address" />
      <Field label="اسم الشخص المفوض" name="authorizedPersonName" />
      <Field label="رفع السجل التجاري" name="crDocument" type="file" />
      <Field label="رفع شهادة الضريبة اختياري" name="vatCertificate" type="file" required={false} />
      <label className="flex items-center gap-2 text-sm font-bold text-navy md:col-span-2">
        <input name="acceptTerms" type="checkbox" value="true" required className="h-4 w-4" />
        أوافق على الشروط والأحكام واتفاقية العميل وسياسات المنصة.
      </label>
      <div className="md:col-span-2"><SubmitButton>إنشاء حساب عميل</SubmitButton></div>
    </form>
  );
}

export function SupplierRegisterForm() {
  return (
    <form action="/api/register/supplier" method="post" encType="multipart/form-data" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-2">
      <Field label="اسم المالك" name="ownerName" />
      <Field label="اسم المنشأة" name="companyName" />
      <Field label="رقم الجوال" name="mobile" />
      <Field label="البريد الإلكتروني" name="email" type="email" />
      <Field label="رقم السجل التجاري" name="commercialNumber" />
      <Field label="الرقم الضريبي" name="vatNumber" />
      <Field label="المدينة" name="city" as="select" />
      <CoverageAreasField />
      <SupplierEquipmentListFields />
      <Field label="الآيبان البنكي" name="bankIban" />
      <Field label="رفع السجل التجاري" name="crDocument" type="file" />
      <Field label="رفع شهادة الضريبة" name="vatCertificate" type="file" />
      <Field label="رفع خطاب التفويض اختياري" name="authorizationLetter" type="file" required={false} />
      <label className="flex items-center gap-2 text-sm font-bold text-navy md:col-span-2">
        <input name="acceptAgreement" type="checkbox" value="true" required className="h-4 w-4" />
        أوافق على اتفاقية المزود وسياسة العمولة والتلف والتأخير والنزاعات.
      </label>
      <div className="md:col-span-2"><SubmitButton>إنشاء حساب مزود</SubmitButton></div>
    </form>
  );
}

export function RentalRequestForm() {
  return (
    <form action="/api/rental-requests" method="post" encType="multipart/form-data" className="grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft md:grid-cols-2">
      <label className="block text-sm font-bold text-navy">
        نوع المعدة
        <select name="equipmentType" required className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm">
          <option value="">اختر نوع المعدة</option>
          {equipmentTypeGroups.map((group) => (
            <optgroup key={group.category} label={group.category}>
              {group.items.map((type) => <option key={type.slug} value={type.arabicName}>{type.arabicName}</option>)}
            </optgroup>
          ))}
        </select>
      </label>
      <input type="hidden" name="category" value="معدات" />
      <Field label="نوع العمل" name="workType" />
      <Field label="المدينة" name="city" as="select" />
      <Field label="من مدينة" name="fromCity" as="select" required={false} />
      <Field label="إلى مدينة" name="toCity" as="select" required={false} />
      <Field label="موقع المشروع" name="siteLocation" />
      <Field label="GPS coordinates" name="gpsCoordinates" required={false} />
      <Field label="تاريخ ووقت البداية" name="startAt" type="datetime-local" />
      <Field label="مدة التشغيل بالأيام" name="durationDays" type="number" />
      <Field label="مرفقات الموقع" name="siteAccessDocument" type="file" required={false} />
      <div className="md:col-span-2"><Field label="ملاحظات وتفاصيل العمل" name="projectDetails" as="textarea" /></div>
      <label className="flex items-center gap-2 text-sm font-bold text-navy">
        <input name="operatorRequired" type="checkbox" value="true" className="h-4 w-4" />
        مشغل مطلوب
      </label>
      <label className="flex items-center gap-2 text-sm font-bold text-navy">
        <input name="transportRequired" type="checkbox" value="true" className="h-4 w-4" />
        نقل مطلوب
      </label>
      <div className="md:col-span-2"><SubmitButton>إرسال طلب المعدة</SubmitButton></div>
    </form>
  );
}

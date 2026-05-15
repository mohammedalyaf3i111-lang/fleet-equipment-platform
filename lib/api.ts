import { NextResponse } from "next/server";
import type { ZodError, ZodSchema } from "zod";

export async function parseForm<T>(request: Request, schema: ZodSchema<T>) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  return schema.parse(data);
}

export function ok(data: unknown, status = 200) {
  return NextResponse.json({ ok: true, data }, { status });
}

export function created(data: unknown) {
  return ok(data, 201);
}

export function validationError(error: ZodError) {
  return NextResponse.json(
    {
      ok: false,
      message: "فشل التحقق من البيانات",
      issues: error.issues
    },
    { status: 422 }
  );
}

export function serverError(error: unknown) {
  return NextResponse.json(
    {
      ok: false,
      message: error instanceof Error ? error.message : "حدث خطأ غير متوقع"
    },
    { status: 500 }
  );
}

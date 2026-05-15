import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const redirectTo = String(formData.get("redirectTo") || "/");
  const actor = String(formData.get("actor") || "user");
  const orderId = String(formData.get("orderId") || "");
  const url = new URL(redirectTo, request.url);

  url.searchParams.set("accepted", actor);
  if (orderId) url.searchParams.set("orderId", orderId);
  url.searchParams.set("acceptedAt", new Date().toISOString());

  return NextResponse.redirect(url, { status: 303 });
}

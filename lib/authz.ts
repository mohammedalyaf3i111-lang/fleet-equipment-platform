import { NextResponse } from "next/server";
import type { Role } from "@/lib/security";
import { assertRole } from "@/lib/security";

export function readRole(request: Request): Role {
  const role = request.headers.get("x-demo-role") ?? "ADMIN";
  return role as Role;
}

export function requireRole(request: Request, allowed: Role[]) {
  try {
    assertRole(readRole(request), allowed);
    return null;
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "غير مصرح" },
      { status: 403 }
    );
  }
}

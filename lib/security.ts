export type Role = "CUSTOMER" | "SUPPLIER" | "DRIVER" | "ADMIN" | "SUPER_ADMIN";

export function assertRole(userRole: Role, allowed: Role[]) {
  if (!allowed.includes(userRole)) {
    throw new Error("غير مصرح بتنفيذ هذا الإجراء");
  }
}

export function isAllowedFile(mimeType: string, sizeBytes: number) {
  const allowed = ["application/pdf", "image/png", "image/jpeg", "image/webp", "video/mp4"];
  return allowed.includes(mimeType) && sizeBytes <= 25 * 1024 * 1024;
}

export function rateLimitPlaceholder(ip: string) {
  return {
    ip,
    allowed: true,
    remaining: 100,
    note: "Placeholder for Redis-backed rate limiting."
  };
}

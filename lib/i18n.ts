export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export function isLocale(value: string | undefined): value is Locale {
  return value === "ar" || value === "en";
}

export function getDirection(locale: Locale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export async function getMessages(locale: Locale) {
  const messages = locale === "en" ? await import("@/messages/en.json") : await import("@/messages/ar.json");
  return messages.default;
}

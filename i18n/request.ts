import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { defaultLocale, getMessages, isLocale } from "@/lib/i18n";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: await getMessages(locale)
  };
});

"use server";
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "ko";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export async function setLocale(locale: "ko" | "en") {
  const cookieStore = cookies();
  cookieStore.set("NEXT_LOCALE", locale);
  return;
}

export async function getLocale() {
  const cookieStore = cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value || "ko";
  return locale as "ko" | "en";
}

export type Locale = "en-GB" | "en-US";

export const SUPPORTED_LOCALES: Locale[] = ["en-GB", "en-US"];

export const DEFAULT_LOCALE: Locale = "en-GB";

export const BROWSER_LOCALE_MAP: Record<string, Locale> = {
  "en-US": "en-US",
  "en-GB": "en-GB",
};

export const LOCALE_CURRENCY_MAP: Record<Locale, string> = {
  "en-GB": "GBP",
  "en-US": "USD",
};

export function getLocaleFromBrowserLang(lang: string): Locale {
  return BROWSER_LOCALE_MAP[lang] ?? DEFAULT_LOCALE;
}

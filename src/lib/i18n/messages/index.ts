import type { Locale } from "@/lib/i18n/config";
import enGB from "./en-GB";
import enUS from "./en-US";

const messagesByLocale: Record<Locale, Record<string, string>> = {
  "en-GB": enGB,
  "en-US": enUS,
};

export default messagesByLocale;

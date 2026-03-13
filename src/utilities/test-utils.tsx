import { type ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { LocaleContext } from "@/lib/i18n/LocaleContext";
import { CartProvider } from "@/utilities/CartContext";
import enGB from "@/lib/i18n/messages/en-GB";
import enUS from "@/lib/i18n/messages/en-US";
import type { Locale } from "@/lib/i18n/config";

const MESSAGES: Record<Locale, Record<string, string>> = {
  "en-GB": enGB,
  "en-US": enUS,
};

interface TestWrapperProps {
  children: ReactNode;
  locale?: Locale;
}

export function TestWrapper({ children, locale = "en-GB" }: TestWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      <LocaleContext.Provider value={{ locale, setLocale: () => {} }}>
        <CartProvider>{children}</CartProvider>
      </LocaleContext.Provider>
    </IntlProvider>
  );
}

export function IntlWrapper({ children, locale = "en-GB" }: TestWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={MESSAGES[locale]}>
      {children}
    </IntlProvider>
  );
}

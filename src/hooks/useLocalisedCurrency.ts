"use client";
import { useIntl } from "react-intl";
import { LOCALE_CURRENCY_MAP, type Locale } from "@/lib/i18n/config";

export function useLocalisedCurrency() {
  const intl = useIntl();
  const currency =
    LOCALE_CURRENCY_MAP[intl.locale as Locale] ?? LOCALE_CURRENCY_MAP["en-GB"];

  const formatCurrency = (amount: number) =>
    intl.formatNumber(amount, { style: "currency", currency });

  return { currency, formatCurrency };
}

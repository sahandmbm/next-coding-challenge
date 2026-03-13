'use client';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { type Locale, getLocaleFromBrowserLang } from '@/lib/i18n/config';
import messagesByLocale from '@/lib/i18n/messages';

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocale(getLocaleFromBrowserLang(navigator.language));
  }, []);

  return (
    <IntlProvider locale={locale} messages={messagesByLocale[locale]}>
      {children}
    </IntlProvider>
  );
}

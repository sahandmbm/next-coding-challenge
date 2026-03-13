'use client';
import { useIntl } from 'react-intl';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n/config';
import styles from './Header.module.css';

const LOCALE_LABELS: Record<Locale, string> = {
  'en-GB': 'EN-GB',
  'en-US': 'EN-US',
};

export function Header() {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.title}>
          {intl.formatMessage({ id: 'store.title' })}
        </span>
        <select
          className={styles.localeSelect}
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label="Select locale"
        >
          {SUPPORTED_LOCALES.map((loc) => (
            <option key={loc} value={loc}>
              {LOCALE_LABELS[loc]}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

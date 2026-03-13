"use client";
import { useIntl } from "react-intl";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/config";
import { useLocalisedCurrency } from "@/hooks/useLocalisedCurrency";
import styles from "./Header.module.css";

const LOCALE_LABELS: Record<Locale, string> = {
  "en-GB": "EN-GB",
  "en-US": "EN-US",
};

const MOCK_CART = [
  { id: "1", name: "Wireless Headphones", price: 79.99, qty: 1 },
  { id: "2", name: "Mechanical Keyboard", price: 129.99, qty: 2 },
  { id: "3", name: "USB-C Hub", price: 49.99, qty: 1 },
];

function BasketIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function Header() {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();

  const { formatCurrency } = useLocalisedCurrency();
  const total = MOCK_CART.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = MOCK_CART.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <span className={styles.title}>
          {intl.formatMessage({ id: "store.title" })}
        </span>

        <div className={styles.controls}>
          <div className={styles.basketWrapper}>
            <button
              className={styles.basketButton}
              aria-label={`Cart, ${itemCount} items`}
            >
              <BasketIcon />
              <span className={styles.basketBadge}>{itemCount}</span>
            </button>

            <div className={styles.dropdown}>
              <p className={styles.dropdownTitle}>
                {intl.formatMessage({ id: "store.cart" })}
              </p>
              <ul className={styles.dropdownList}>
                {MOCK_CART.map((item) => (
                  <li key={item.id} className={styles.dropdownItem}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemMeta}>
                      x{item.qty} &mdash;{" "}
                      {formatCurrency(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className={styles.dropdownFooter}>
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

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
      </div>
    </header>
  );
}

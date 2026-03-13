"use client";
import { useIntl } from "react-intl";
import styles from "./ImageBanner.module.css";

export function ImageBanner() {
  const intl = useIntl();

  return (
    <section
      className={styles.banner}
      aria-label={intl.formatMessage({ id: "banner.title" })}
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          {intl.formatMessage({ id: "banner.eyebrow" })}
        </p>
        <h1 className={styles.title}>
          {intl.formatMessage({ id: "banner.title" })}
        </h1>
        <p className={styles.subtitle}>
          {intl.formatMessage({ id: "banner.subtitle" })}
        </p>
        <button className={styles.cta}>
          {intl.formatMessage({ id: "banner.cta" })}
        </button>
      </div>
    </section>
  );
}

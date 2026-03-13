"use client";
import { useIntl } from "react-intl";
import styles from "./Footer.module.css";

export function Footer() {
  const intl = useIntl();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandName}>
              {intl.formatMessage({ id: "footer.brandName" })}
            </span>
            <p className={styles.tagline}>
              {intl.formatMessage({ id: "footer.tagline" })}
            </p>
          </div>

          <nav className={styles.links} aria-label={intl.formatMessage({ id: "footer.nav.aria" })}>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>
                {intl.formatMessage({ id: "footer.shop" })}
              </span>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.shop.allProducts" })}</a>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.shop.newArrivals" })}</a>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.shop.sale" })}</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>
                {intl.formatMessage({ id: "footer.support" })}
              </span>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.support.faq" })}</a>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.support.shipping" })}</a>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.support.returns" })}</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>
                {intl.formatMessage({ id: "footer.company" })}
              </span>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.company.about" })}</a>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.company.blog" })}</a>
              <a className={styles.link}>{intl.formatMessage({ id: "footer.company.contact" })}</a>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            {intl.formatMessage({ id: "footer.copy" }, { year })}
          </span>
          <div className={styles.badges}>
            <span className={styles.badge}>TypeScript</span>
            <span className={styles.badge}>Next.js</span>
            <span className={styles.badge}>react-intl</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

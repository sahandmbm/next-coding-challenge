import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.glow} aria-hidden="true" />

        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.brandName}>Michael&apos;s Store</span>
            <p className={styles.tagline}>
              Sahand Shahriari is proud of what he creates&nbsp;:D
            </p>
          </div>

          <nav className={styles.links} aria-label="Footer navigation">
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>Shop</span>
              <a className={styles.link}>All products</a>
              <a className={styles.link}>New arrivals</a>
              <a className={styles.link}>Sale</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>Support</span>
              <a className={styles.link}>FAQ</a>
              <a className={styles.link}>Shipping</a>
              <a className={styles.link}>Returns</a>
            </div>
            <div className={styles.linkGroup}>
              <span className={styles.linkGroupTitle}>Company</span>
              <a className={styles.link}>About</a>
              <a className={styles.link}>Blog</a>
              <a className={styles.link}>Contact</a>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} Michael&apos;s Amazing Web Store. All rights reserved.
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

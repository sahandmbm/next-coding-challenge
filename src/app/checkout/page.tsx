"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useIntl } from "react-intl";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useLocalisedCurrency } from "@/hooks/useLocalisedCurrency";
import { useCart } from "@/utilities/CartContext";
import { Modal } from "@/components/modal/Modal";
import { BackIcon, ConfirmedIcon } from "@/utilities/IconProvider";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  const intl = useIntl();
  const { locale } = useLocale();
  const { formatCurrency } = useLocalisedCurrency();
  const { items, totalItems } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  const orderTotal = items.reduce((sum, { product, qty }) => {
    const price = locale === "en-US" ? product.price.usd : product.price.gbp;
    return sum + price * qty;
  }, 0);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          <BackIcon />
          {intl.formatMessage({ id: "checkout.continueShopping" })}
        </Link>

        <h1 className={styles.title}>
          {intl.formatMessage({ id: "checkout.title" })}
        </h1>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <p>{intl.formatMessage({ id: "checkout.empty" })}</p>
            <Link href="/" className={styles.emptyLink}>
              {intl.formatMessage({ id: "checkout.continueShopping" })}
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <ul className={styles.itemList}>
              {items.map(({ product, qty }) => {
                const price =
                  locale === "en-US" ? product.price.usd : product.price.gbp;
                return (
                  <li key={product.id} className={styles.item}>
                    <div className={styles.itemImage} aria-hidden="true" />
                    <div className={styles.itemDetails}>
                      <span className={styles.itemName}>{product.name.uk}</span>
                      <span className={styles.itemQty}>×{qty}</span>
                    </div>
                    <span className={styles.itemPrice}>
                      {formatCurrency(price * qty)}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>
                  {intl.formatMessage(
                    { id: "checkout.totalItems" },
                    { count: totalItems },
                  )}
                </span>
              </div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                <span>{intl.formatMessage({ id: "checkout.orderTotal" })}</span>
                <span>{formatCurrency(orderTotal)}</span>
              </div>
            </div>

            <button
              className={styles.checkoutButton}
              onClick={() => setModalOpen(true)}
            >
              {intl.formatMessage({ id: "checkout.completeButton" })}
            </button>
          </React.Fragment>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className={styles.modalContent}>
          <ConfirmedIcon styles={styles} />
          <h2 className={styles.modalTitle}>
            {intl.formatMessage({ id: "modal.orderConfirmed" })}
          </h2>
          <p className={styles.modalMessage}>
            {intl.formatMessage({ id: "modal.deliveryMessage" })}
          </p>
          <button
            className={styles.modalClose}
            onClick={() => setModalOpen(false)}
          >
            {intl.formatMessage({ id: "modal.close" })}
          </button>
        </div>
      </Modal>
    </div>
  );
}

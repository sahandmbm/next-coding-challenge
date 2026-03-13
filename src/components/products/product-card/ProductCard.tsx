"use client";
import { useIntl } from "react-intl";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  qty: number;
  outOfStock: boolean;
  onAdd: () => void;
  onRemove: () => void;
}

export function ProductCard({ name, description, price, qty, outOfStock, onAdd, onRemove }: ProductCardProps) {
  const intl = useIntl();
  const inCart = qty > 0;

  return (
    <div className={`${styles.card} ${inCart ? styles.inCart : ""}`}>
      <div className={styles.imageArea}>
        {inCart && <span className={styles.qtyBadge}>×{qty}</span>}
        <div className={styles.overlay}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.price}>{price}</span>
        <div className={styles.actions}>
          {inCart && (
            <button
              className={styles.stepButton}
              onClick={onRemove}
              aria-label={intl.formatMessage({ id: "item.remove.aria" }, { name })}
            >
              −
            </button>
          )}
          {inCart && <span className={styles.qtyCount}>{qty}</span>}
          <button
            className={styles.stepButton}
            onClick={onAdd}
            disabled={outOfStock}
            aria-label={
              outOfStock
                ? intl.formatMessage({ id: "item.outOfStock.aria" }, { name })
                : intl.formatMessage({ id: "item.add.aria" }, { name })
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

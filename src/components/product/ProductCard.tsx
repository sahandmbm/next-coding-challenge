"use client";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  onAdd: () => void;
}

function CartPlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      <line x1="12" y1="10" x2="12" y2="16" />
      <line x1="9" y1="13" x2="15" y2="13" />
    </svg>
  );
}

export function ProductCard({ name, description, price, onAdd }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <div className={styles.overlay}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{price}</span>
        <button
          className={styles.addButton}
          onClick={onAdd}
          aria-label={`Add ${name} to cart`}
        >
          <CartPlusIcon />
          Add
        </button>
      </div>
    </div>
  );
}

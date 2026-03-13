"use client";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useLocalisedCurrency } from "@/hooks/useLocalisedCurrency";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGrid } from "@/components/product/ProductGrid";
import styles from "./page.module.css";

const PRODUCTS = [
  { id: "1", price: 9.99 },
  { id: "2", price: 14.99 },
  { id: "3", price: 19.99 },
  { id: "4", price: 24.99 },
  { id: "5", price: 9.99 },
  { id: "6", price: 14.99 },
  { id: "7", price: 19.99 },
  { id: "8", price: 24.99 },
];

export default function Home() {
  const intl = useIntl();
  const { formatCurrency } = useLocalisedCurrency();
  const [items, setItems] = useState<{ name: string; quantity: number }[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);

  const addToCart = (product: string) => {
    const alreadyInCart = items.find((item) => item.name === product);
    if (alreadyInCart) {
      // @TODO need to find out how to update cart items
    } else {
      setItems([...items, { name: product, quantity: 1 }]);
    }
    setItemCount(itemCount + 1);
  };

  return (
    <div className={styles.main}>
      <ProductGrid>
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            name={intl.formatMessage({ id: `item.${p.id}.name` })}
            description={intl.formatMessage({ id: `item.${p.id}.description` })}
            price={formatCurrency(p.price)}
            onAdd={() =>
              addToCart(intl.formatMessage({ id: `item.${p.id}.name` }))
            }
          />
        ))}
      </ProductGrid>
    </div>
  );
}

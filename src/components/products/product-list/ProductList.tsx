"use client";
import { useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { useLocalisedCurrency } from "@/hooks/useLocalisedCurrency";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { useProducts } from "@/utilities/ProductsContext";
import { useCart } from "@/utilities/CartContext";
import { ProductCard } from "../product-card/ProductCard";
import { ProductGrid } from "../product-grid/ProductGrid";
import styles from "./ProductList.module.css";
import type { ApiProduct } from "@/types/product";

export function ProductList() {
  const { initialProducts, moreProducts, loadMore, isLoadingMore } =
    useProducts();
  const { formatCurrency } = useLocalisedCurrency();
  const { locale } = useLocale();
  const { addToCart, removeFromCart, getQty } = useCart();
  const intl = useIntl();
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const price = (p: ApiProduct) =>
    formatCurrency(locale === "en-US" ? p.price.usd : p.price.gbp);

  const remaining = (p: ApiProduct) => p.stock - getQty(p.id);

  const stockLabel = (p: ApiProduct) => {
    const r = remaining(p);
    return r > 0
      ? intl.formatMessage({ id: "stock.available" }, { count: r })
      : intl.formatMessage({ id: "stock.outOfStock" });
  };

  return (
    <>
      <ProductGrid>
        {initialProducts.map((p) => (
          <ProductCard
            key={`init-${p.id}`}
            name={p.name.uk}
            description={stockLabel(p)}
            price={price(p)}
            qty={getQty(p.id)}
            outOfStock={remaining(p) <= 0}
            onAdd={() => addToCart(p)}
            onRemove={() => removeFromCart(p.id)}
          />
        ))}
        {moreProducts.map((p, i) => (
          <div
            key={`more-${p.id}`}
            className={styles.newCard}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <ProductCard
              name={p.name.uk}
              description={stockLabel(p)}
              price={price(p)}
              qty={getQty(p.id)}
              outOfStock={remaining(p) <= 0}
              onAdd={() => addToCart(p)}
              onRemove={() => removeFromCart(p.id)}
            />
          </div>
        ))}
      </ProductGrid>

      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true">
        {isLoadingMore && <div className={styles.spinner} />}
      </div>
    </>
  );
}

'use client';
import { useEffect, useRef, useState } from 'react';
import { useLocalisedCurrency } from '@/hooks/useLocalisedCurrency';
import { useLocale } from '@/lib/i18n/LocaleContext';
import { useProducts } from '@/components/utilities/ProductsContext';
import { ProductCard } from './ProductCard';
import { ProductGrid } from './ProductGrid';
import styles from './ProductList.module.css';
import type { ApiProduct } from '@/types/product';

export function ProductList() {
  const { initialProducts, moreProducts, loadMore, isLoadingMore } = useProducts();
  const { formatCurrency } = useLocalisedCurrency();
  const { locale } = useLocale();
  const [, setCartItems] = useState<{ id: number; qty: number }[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const addToCart = (id: number) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  const price = (p: ApiProduct) =>
    formatCurrency(locale === 'en-US' ? p.price.usd : p.price.gbp);

  return (
    <>
      <ProductGrid>
        {initialProducts.map((p) => (
          <ProductCard
            key={`init-${p.id}`}
            name={p.name.uk}
            description={`${p.stock} in stock`}
            price={price(p)}
            onAdd={() => addToCart(p.id)}
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
              description={`${p.stock} in stock`}
              price={price(p)}
              onAdd={() => addToCart(p.id)}
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

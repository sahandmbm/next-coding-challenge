'use client';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import type { ApiProduct } from '@/types/product';
import { fetchMoreProducts } from '@/lib/products';

interface ProductsContextValue {
  initialProducts: ApiProduct[];
  moreProducts: ApiProduct[];
  loadMore: () => void;
  isLoadingMore: boolean;
  hasMore: boolean;
}

const ProductsContext = createContext<ProductsContextValue>({
  initialProducts: [],
  moreProducts: [],
  loadMore: () => {},
  isLoadingMore: false,
  hasMore: true,
});

export function ProductsProvider({
  initialProducts,
  children,
}: {
  initialProducts: ApiProduct[];
  children: ReactNode;
}) {
  const [moreProducts, setMoreProducts] = useState<ApiProduct[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isLoadingMoreRef = useRef(false);
  const hasMoreRef = useRef(true);

  const loadMore = useCallback(() => {
    if (isLoadingMoreRef.current || !hasMoreRef.current) return;

    isLoadingMoreRef.current = true;
    hasMoreRef.current = false;
    setIsLoadingMore(true);

    fetchMoreProducts()
      .then((more) => {
        if (more.length > 0) {
          setMoreProducts(more);
        }
      })
      .catch(() => {})
      .finally(() => {
        isLoadingMoreRef.current = false;
        setIsLoadingMore(false);
        setHasMore(false);
      });
  }, []);

  return (
    <ProductsContext.Provider value={{ initialProducts, moreProducts, loadMore, isLoadingMore, hasMore }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}

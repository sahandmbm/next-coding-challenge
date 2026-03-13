'use client';
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { ApiProduct } from '@/types/product';

export interface CartItem {
  product: ApiProduct;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: ApiProduct) => void;
  removeFromCart: (productId: number) => void;
  getQty: (productId: number) => number;
  totalItems: number;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  getQty: () => 0,
  totalItems: 0,
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: ApiProduct) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) =>
      prev
        .map((i) => i.product.id === productId ? { ...i, qty: i.qty - 1 } : i)
        .filter((i) => i.qty > 0)
    );
  }, []);

  const getQty = useCallback(
    (productId: number) => items.find((i) => i.product.id === productId)?.qty ?? 0,
    [items]
  );

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getQty, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

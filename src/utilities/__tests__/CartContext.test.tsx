import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/utilities/CartContext";
import type { ApiProduct } from "@/types/product";

const productA: ApiProduct = {
  id: 1,
  name: { us: "Widget A", uk: "Widget A" },
  price: { usd: 10, gbp: 8 },
  stock: 5,
};

const productB: ApiProduct = {
  id: 2,
  name: { us: "Widget B", uk: "Widget B" },
  price: { usd: 20, gbp: 16 },
  stock: 3,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("CartContext", () => {
  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("adds a product to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].qty).toBe(1);
    expect(result.current.totalItems).toBe(1);
  });

  it("increments qty when the same product is added again", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    act(() => result.current.addToCart(productA));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].qty).toBe(2);
    expect(result.current.totalItems).toBe(2);
  });

  it("tracks multiple different products independently", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    act(() => result.current.addToCart(productB));
    act(() => result.current.addToCart(productB));
    expect(result.current.items).toHaveLength(2);
    expect(result.current.totalItems).toBe(3);
  });

  it("decrements qty on removeFromCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    act(() => result.current.addToCart(productA));
    act(() => result.current.removeFromCart(productA.id));
    expect(result.current.items[0].qty).toBe(1);
    expect(result.current.totalItems).toBe(1);
  });

  it("removes the item entirely when qty reaches zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    act(() => result.current.removeFromCart(productA.id));
    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
  });

  it("getQty returns 0 for a product not in the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.getQty(99)).toBe(0);
  });

  it("getQty returns the correct quantity for a product in the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    act(() => result.current.addToCart(productA));
    expect(result.current.getQty(productA.id)).toBe(2);
  });

  it("only removes the target product on removeFromCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    act(() => result.current.addToCart(productA));
    act(() => result.current.addToCart(productB));
    act(() => result.current.removeFromCart(productA.id));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].product.id).toBe(productB.id);
  });
});

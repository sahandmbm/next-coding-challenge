import { render, screen, fireEvent } from "@testing-library/react";
import { TestWrapper } from "@/utilities/test-utils";
import { Header } from "@/components/layouts/modules/header/Header";
import { useCart } from "@/utilities/CartContext";
import type { ApiProduct } from "@/types/product";

const mockProduct: ApiProduct = {
  id: 1,
  name: { us: "Widget", uk: "Widget" },
  price: { usd: 10, gbp: 8 },
  stock: 5,
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TestWrapper>{children}</TestWrapper>
);

function HeaderWithCartHelper() {
  const { addToCart } = useCart();
  return (
    <>
      <button onClick={() => addToCart(mockProduct)}>add to cart</button>
      <Header />
    </>
  );
}

describe("Header", () => {
  it("renders the store title", () => {
    render(<Header />, { wrapper });
    expect(screen.getByText("Michael's Amazing Web Store")).toBeInTheDocument();
  });

  it("renders the locale selector", () => {
    render(<Header />, { wrapper });
    expect(
      screen.getByRole("combobox", { name: /select locale/i }),
    ).toBeInTheDocument();
  });

  it("shows empty basket message when cart is empty", () => {
    render(<Header />, { wrapper });
    expect(screen.getByText("Your basket is empty")).toBeInTheDocument();
  });

  it("does not show a badge when cart is empty", () => {
    render(<Header />, { wrapper });
    const btn = screen.getByRole("button", { name: /cart, 0 items/i });
    expect(btn).toBeInTheDocument();
    expect(btn.querySelector("span")).not.toBeInTheDocument();
  });

  it("shows a badge with the correct count when items are in the cart", () => {
    render(<HeaderWithCartHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "add to cart" }));
    fireEvent.click(screen.getByRole("button", { name: "add to cart" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("shows product name in dropdown when item is added to cart", () => {
    render(<HeaderWithCartHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "add to cart" }));
    expect(screen.getByText("Widget")).toBeInTheDocument();
  });

  it("shows checkout link when cart has items", () => {
    render(<HeaderWithCartHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "add to cart" }));
    expect(screen.getByRole("link", { name: /checkout/i })).toBeInTheDocument();
  });

  it("locale selector has both supported locales as options", () => {
    render(<Header />, { wrapper });
    const select = screen.getByRole("combobox", { name: /select locale/i });
    const options = Array.from(select.querySelectorAll("option")).map(
      (o) => o.value,
    );
    expect(options).toContain("en-GB");
    expect(options).toContain("en-US");
  });
});

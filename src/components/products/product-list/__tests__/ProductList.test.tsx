import { render, screen, fireEvent } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { LocaleContext } from "@/lib/i18n/LocaleContext";
import { CartProvider } from "@/utilities/CartContext";
import { ProductsProvider } from "@/utilities/ProductsContext";
import { ProductList } from "@/components/products/product-list/ProductList";
import enGB from "@/lib/i18n/messages/en-GB";
import type { ApiProduct } from "@/types/product";

jest.mock("@/lib/api/products", () => ({
  fetchInitialProducts: jest.fn().mockResolvedValue([]),
  fetchMoreProducts: jest.fn().mockResolvedValue([]),
}));

const mockProducts: ApiProduct[] = [
  {
    id: 1,
    name: { us: "Alpha", uk: "Alpha" },
    price: { usd: 10, gbp: 8 },
    stock: 5,
  },
  {
    id: 2,
    name: { us: "Beta", uk: "Beta" },
    price: { usd: 20, gbp: 16 },
    stock: 0,
  },
];

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <IntlProvider locale="en-GB" messages={enGB}>
      <LocaleContext.Provider value={{ locale: "en-GB", setLocale: () => {} }}>
        <CartProvider>
          <ProductsProvider initialProducts={mockProducts}>
            {children}
          </ProductsProvider>
        </CartProvider>
      </LocaleContext.Provider>
    </IntlProvider>
  );
}

describe("ProductList", () => {
  it("renders all initial products", () => {
    render(<ProductList />, { wrapper: Wrapper });
    expect(screen.getByText("Alpha")).toBeInTheDocument();
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("shows stock count for an in-stock product", () => {
    render(<ProductList />, { wrapper: Wrapper });
    expect(screen.getByText("5 in stock")).toBeInTheDocument();
  });

  it("shows out-of-stock label for a zero-stock product", () => {
    render(<ProductList />, { wrapper: Wrapper });
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });

  it("disables the add button for an out-of-stock product", () => {
    render(<ProductList />, { wrapper: Wrapper });
    const btn = screen.getByRole("button", { name: /beta is out of stock/i });
    expect(btn).toBeDisabled();
  });

  it("updates stock label after adding a product to the cart", () => {
    render(<ProductList />, { wrapper: Wrapper });
    fireEvent.click(
      screen.getByRole("button", { name: /add alpha to basket/i }),
    );
    expect(screen.getByText("4 in stock")).toBeInTheDocument();
  });

  it("renders the scroll sentinel element", () => {
    render(<ProductList />, { wrapper: Wrapper });
    const sentinel = document.querySelector("[aria-hidden='true']");
    expect(sentinel).toBeInTheDocument();
  });
});

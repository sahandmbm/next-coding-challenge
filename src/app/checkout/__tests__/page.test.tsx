import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { TestWrapper } from "@/utilities/test-utils";
import CheckoutPage from "@/app/checkout/page";
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

function CheckoutWithHelper() {
  const { addToCart } = useCart();
  return (
    <React.Fragment>
      <button onClick={() => addToCart(mockProduct)}>populate cart</button>
      <CheckoutPage />
    </React.Fragment>
  );
}

describe("Checkout page", () => {
  it("renders the checkout heading", () => {
    render(<CheckoutPage />, { wrapper });
    expect(
      screen.getByRole("heading", { name: /checkout/i }),
    ).toBeInTheDocument();
  });

  it("shows the empty basket message when cart is empty", () => {
    render(<CheckoutPage />, { wrapper });
    expect(screen.getByText("Your basket is empty")).toBeInTheDocument();
  });

  it("does not show the complete checkout button when cart is empty", () => {
    render(<CheckoutPage />, { wrapper });
    expect(
      screen.queryByRole("button", { name: /complete checkout/i }),
    ).not.toBeInTheDocument();
  });

  it("renders cart items and total when the cart has products", () => {
    render(<CheckoutWithHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "populate cart" }));
    expect(screen.getByText("Widget")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /complete checkout/i }),
    ).toBeInTheDocument();
  });

  it("shows the order summary with item count", () => {
    render(<CheckoutWithHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "populate cart" }));
    expect(screen.getByText(/1 item total/i)).toBeInTheDocument();
  });

  it("opens the order confirmed modal on clicking complete checkout", () => {
    render(<CheckoutWithHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "populate cart" }));
    fireEvent.click(screen.getByRole("button", { name: /complete checkout/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Order confirmed!")).toBeInTheDocument();
  });

  it("shows the delivery message in the modal", () => {
    render(<CheckoutWithHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "populate cart" }));
    fireEvent.click(screen.getByRole("button", { name: /complete checkout/i }));
    expect(
      screen.getByText("Sahand will deliver your product somehow"),
    ).toBeInTheDocument();
  });

  it("closes the modal when the close button is clicked", () => {
    render(<CheckoutWithHelper />, { wrapper });
    fireEvent.click(screen.getByRole("button", { name: "populate cart" }));
    fireEvent.click(screen.getByRole("button", { name: /complete checkout/i }));
    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders continue shopping links", () => {
    render(<CheckoutPage />, { wrapper });
    const links = screen.getAllByRole("link", { name: /continue shopping/i });
    expect(links.length).toBeGreaterThanOrEqual(1);
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { IntlWrapper } from "@/utilities/test-utils";
import { ProductCard } from "@/components/products/product-card/ProductCard";

const defaultProps = {
  name: "Test Widget",
  description: "5 in stock",
  price: "£15.99",
  qty: 0,
  outOfStock: false,
  onAdd: jest.fn(),
  onRemove: jest.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlWrapper>{children}</IntlWrapper>
);

describe("ProductCard", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders the product name, description and price", () => {
    render(<ProductCard {...defaultProps} />, { wrapper });
    expect(screen.getByText("Test Widget")).toBeInTheDocument();
    expect(screen.getByText("5 in stock")).toBeInTheDocument();
    expect(screen.getByText("£15.99")).toBeInTheDocument();
  });

  it("shows the add (+) button when not in cart", () => {
    render(<ProductCard {...defaultProps} />, { wrapper });
    expect(
      screen.getByRole("button", { name: /add test widget to basket/i }),
    ).toBeInTheDocument();
  });

  it("does not show the remove (−) button when qty is 0", () => {
    render(<ProductCard {...defaultProps} />, { wrapper });
    expect(
      screen.queryByRole("button", { name: /remove one/i }),
    ).not.toBeInTheDocument();
  });

  it("shows both add and remove buttons when qty > 0", () => {
    render(<ProductCard {...defaultProps} qty={2} />, { wrapper });
    expect(
      screen.getByRole("button", { name: /add test widget to basket/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /remove one test widget from basket/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows the quantity count when in cart", () => {
    render(<ProductCard {...defaultProps} qty={3} />, { wrapper });
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("shows a qty badge in the image area when in cart", () => {
    render(<ProductCard {...defaultProps} qty={2} />, { wrapper });
    expect(screen.getByText("×2")).toBeInTheDocument();
  });

  it("disables the add button and changes aria-label when out of stock", () => {
    render(<ProductCard {...defaultProps} outOfStock={true} />, { wrapper });
    const btn = screen.getByRole("button", {
      name: /test widget is out of stock/i,
    });
    expect(btn).toBeDisabled();
  });

  it("calls onAdd when the add button is clicked", () => {
    const onAdd = jest.fn();
    render(<ProductCard {...defaultProps} onAdd={onAdd} />, { wrapper });
    fireEvent.click(
      screen.getByRole("button", { name: /add test widget to basket/i }),
    );
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it("calls onRemove when the remove button is clicked", () => {
    const onRemove = jest.fn();
    render(<ProductCard {...defaultProps} qty={1} onRemove={onRemove} />, {
      wrapper,
    });
    fireEvent.click(
      screen.getByRole("button", {
        name: /remove one test widget from basket/i,
      }),
    );
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

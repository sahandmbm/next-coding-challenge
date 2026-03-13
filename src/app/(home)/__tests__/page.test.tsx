import { render, screen } from "@testing-library/react";
import { TestWrapper } from "@/utilities/test-utils";
import Home from "@/app/(home)/page";
import enGB from "@/lib/i18n/messages/en-GB";

// Home is an async server component — mock the data-fetching layer so it
// can be awaited and rendered in jsdom without network calls.
jest.mock("@/lib/api/products", () => ({
  fetchInitialProducts: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: { us: "Widget A", uk: "Widget A" },
      price: { usd: 10, gbp: 8 },
      stock: 5,
    },
    {
      id: 2,
      name: { us: "Widget B", uk: "Widget B" },
      price: { usd: 20, gbp: 16 },
      stock: 0,
    },
  ]),
  fetchMoreProducts: jest.fn().mockResolvedValue([]),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TestWrapper>{children}</TestWrapper>
);

describe("Home page", () => {
  it("renders the image banner", async () => {
    const jsx = await Home();
    render(jsx, { wrapper });
    expect(screen.getByText(enGB["banner.eyebrow"])).toBeInTheDocument();
    expect(screen.getByText(enGB["banner.title"])).toBeInTheDocument();
  });

  it("renders the initial product list", async () => {
    const jsx = await Home();
    render(jsx, { wrapper });
    expect(screen.getByText("Widget A")).toBeInTheDocument();
    expect(screen.getByText("Widget B")).toBeInTheDocument();
  });

  it("shows stock information for products", async () => {
    const jsx = await Home();
    render(jsx, { wrapper });
    expect(screen.getByText("5 in stock")).toBeInTheDocument();
    expect(screen.getByText("Out of stock")).toBeInTheDocument();
  });
});

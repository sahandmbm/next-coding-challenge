import { render, screen } from "@testing-library/react";
import { IntlWrapper } from "@/utilities/test-utils";
import { Footer } from "@/components/layouts/modules/footer/Footer";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <IntlWrapper>{children}</IntlWrapper>
);

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("Michael's Store")).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Footer />, { wrapper });
    expect(
      screen.getByText(/Sahand Shahriari is proud of what he creates/),
    ).toBeInTheDocument();
  });

  it("renders footer navigation landmark", () => {
    render(<Footer />, { wrapper });
    expect(
      screen.getByRole("navigation", { name: /footer navigation/i }),
    ).toBeInTheDocument();
  });

  it("renders all three link group headings", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("Shop")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
  });

  it("renders shop links", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("All products")).toBeInTheDocument();
    expect(screen.getByText("New arrivals")).toBeInTheDocument();
    expect(screen.getByText("Sale")).toBeInTheDocument();
  });

  it("renders support links", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Shipping")).toBeInTheDocument();
    expect(screen.getByText("Returns")).toBeInTheDocument();
  });

  it("renders company links", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders copyright text with the current year", () => {
    render(<Footer />, { wrapper });
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });

  it("renders tech stack badges", () => {
    render(<Footer />, { wrapper });
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("react-intl")).toBeInTheDocument();
  });
});

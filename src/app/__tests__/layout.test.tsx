import { render, screen } from "@testing-library/react";
import { LocaleProvider } from "@/utilities/LocaleProvider";
import { useLocale } from "@/lib/i18n/LocaleContext";

function Wrapper({ children }: { children: React.ReactNode }) {
  return <LocaleProvider initialLocale="en-GB">{children}</LocaleProvider>;
}

function LocaleDisplay() {
  const { locale } = useLocale();
  return <span data-testid="locale">{locale}</span>;
}

describe("LocaleProvider", () => {
  it("renders children", () => {
    render(
      <Wrapper>
        <p>hello world</p>
      </Wrapper>
    );
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });

  it("provides a locale value to children via context", () => {
    render(
      <Wrapper>
        <LocaleDisplay />
      </Wrapper>
    );

    // The provider initialises with en-GB but useEffect may override it
    // based on navigator.language — either way a valid locale is rendered.
    const localeEl = screen.getByTestId("locale");
    expect(["en-GB", "en-US"]).toContain(localeEl.textContent);
  });
});

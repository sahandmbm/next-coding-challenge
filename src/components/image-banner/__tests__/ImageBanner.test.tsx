import { render, screen } from "@testing-library/react";
import { IntlWrapper } from "@/utilities/test-utils";
import { ImageBanner } from "@/components/image-banner/ImageBanner";
import enGB from "@/lib/i18n/messages/en-GB";
import enUS from "@/lib/i18n/messages/en-US";

describe("ImageBanner", () => {
  it("renders the eyebrow, title, subtitle and CTA in en-GB", () => {
    render(
      <IntlWrapper locale="en-GB">
        <ImageBanner />
      </IntlWrapper>,
    );
    expect(screen.getByText(enGB["banner.eyebrow"])).toBeInTheDocument();
    expect(screen.getByText(enGB["banner.title"])).toBeInTheDocument();
    expect(screen.getByText(enGB["banner.subtitle"])).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: enGB["banner.cta"] }),
    ).toBeInTheDocument();
  });

  it("renders localised en-US content", () => {
    render(
      <IntlWrapper locale="en-US">
        <ImageBanner />
      </IntlWrapper>,
    );
    expect(screen.getByText(enUS["banner.eyebrow"])).toBeInTheDocument();
    expect(screen.getByText(enUS["banner.title"])).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: enUS["banner.cta"] }),
    ).toBeInTheDocument();
  });

  it("has a section landmark with an accessible label", () => {
    render(
      <IntlWrapper>
        <ImageBanner />
      </IntlWrapper>,
    );
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});

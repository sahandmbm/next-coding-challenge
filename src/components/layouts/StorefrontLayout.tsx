import React from "react";
import { Header } from "@/components/layouts/modules/header/Header";
import { Footer } from "@/components/layouts/modules/footer/Footer";

export function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

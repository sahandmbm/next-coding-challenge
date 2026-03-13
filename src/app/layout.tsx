import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { LocaleProvider } from "@/components/utilities/LocaleProvider";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/config";
import messagesByLocale from "@/lib/i18n/messages";

const inter = Inter({ subsets: ["latin"] });

function getLocale(): Locale {
  return (headers().get("x-locale") ?? DEFAULT_LOCALE) as Locale;
}

export async function generateMetadata(): Promise<Metadata> {
  const messages = messagesByLocale[getLocale()];
  return {
    title: messages["meta.title"],
    description: messages["meta.description"],
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = getLocale();
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}

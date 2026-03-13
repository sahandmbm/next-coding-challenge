import { getLocaleFromBrowserLang, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const locale =
    getLocaleFromBrowserLang(
      (request.headers.get("accept-language") ?? "")
        .split(",")[0]
        ?.split(";")[0]
        ?.trim() ?? "",
    ) ?? DEFAULT_LOCALE;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};

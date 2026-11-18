import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 1. Redirect Blogger legacy posts: /[year]/[month]/[slug].html -> /bhajan/[slug]
  const postPattern = /^\/(\d{4})\/(\d{2})\/([a-zA-Z0-9-_]+)\.html$/;
  const postMatch = pathname.match(postPattern);
  if (postMatch) {
    const slug = postMatch[3];
    return NextResponse.redirect(new URL(`/bhajan/${slug}`, request.url), 301);
  }

  // 2. Redirect /aarati/[slug] -> /aarti/[slug]
  if (pathname.startsWith("/aarati/")) {
    const slug = pathname.replace("/aarati/", "");
    return NextResponse.redirect(new URL(`/aarti/${slug}`, request.url), 301);
  }

  // 3. Redirect /temple/[slug] -> /mandir/[slug]
  if (pathname.startsWith("/temple/")) {
    const slug = pathname.replace("/temple/", "");
    return NextResponse.redirect(new URL(`/mandir/${slug}`, request.url), 301);
  }

  // 4. Redirect /books/[slug] -> /granth/[slug]
  if (pathname.startsWith("/books/")) {
    const slug = pathname.replace("/books/", "");
    return NextResponse.redirect(new URL(`/granth/${slug}`, request.url), 301);
  }

  // 5. Redirect /pages/[slug] -> /tools/[slug] or /panchang
  if (pathname.startsWith("/pages/")) {
    const slug = pathname.replace("/pages/", "");
    if (slug === "panchang" || slug === "aaj-ka-panchang") {
      return NextResponse.redirect(new URL("/panchang", request.url), 301);
    }
    return NextResponse.redirect(new URL(`/tools/${slug}`, request.url), 301);
  }

  // 6. Redirect legacy static pages
  if (pathname === "/about-us") {
    return NextResponse.redirect(new URL("/about", request.url), 301);
  }
  if (pathname === "/contact-us") {
    return NextResponse.redirect(new URL("/contact", request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/(\\d{4})/(\\d{2})/:path*",
    "/aarati/:path*",
    "/temple/:path*",
    "/books/:path*",
    "/pages/:path*",
    "/about-us",
    "/contact-us",
  ],
};

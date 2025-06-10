import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname !== "/" && !token) {
    console.log("NO TOKEN");
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/chat", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat",
    // "/admin/:path*", // protect admin routes
  ],
};

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  console.log("middleware hit");
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  console.log(session, "from mw");

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: "/chakam/:path*",
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("admin_session");

  if (!session?.value) {
    // Let the admin page render its own login form
    // We set a header so the page knows auth is missing
    const response = NextResponse.next();
    response.headers.set("x-admin-auth", "missing");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

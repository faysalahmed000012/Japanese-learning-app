import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./services/UserServices";

export async function middleware(request: NextRequest) {
  const currentUser = await getCurrentUser();
  const path = request.nextUrl.pathname;

  if (!currentUser && path !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (currentUser) {
    const user = currentUser;

    if (path === "/") {
      if (user.role === "user") {
        return NextResponse.redirect(new URL("/lessons", request.url));
      } else if (user.role === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    if (path.startsWith("/dashboard") && user.role !== "admin") {
      return NextResponse.redirect(new URL("/lessons", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

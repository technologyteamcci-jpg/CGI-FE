import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieKey } from "./stores/auth.store";

export function proxy(req: NextRequest) {
    // read cookie value safely
    const token = req.cookies.get(cookieKey)?.value;

    console.log(token, cookieKey)
    // if not logged in and not already on /login => send to /login
    if (!token && req.nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // if logged in and requesting /login => send to /dashboard
    if (token && req.nextUrl.pathname === "/login") {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // otherwise continue
    return NextResponse.next();
}

export const config = {
    // include /login so middleware can redirect logged-in users away from it
    matcher: ["/",
        "/dashboard/:path*",
        "/profile/:path*",
        "/login",
        "/settings/:path*",
        "/users/:path*",
        "/prompts/:path*",
        "/data-library/:path*",
        "/campus/:path*",
        "/events/:path*",
        "/members/:path*",
        "/pastors/:path*"],
};

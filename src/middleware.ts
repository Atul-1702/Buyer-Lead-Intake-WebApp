import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/buyers")) {
      return NextResponse.redirect(new URL("owner/auth", req.nextUrl.origin));
    }
  } else {
    if (req.nextUrl.pathname.includes("/owner/auth")) {
      return NextResponse.redirect(new URL("buyers", req.nextUrl.origin));
    }

    const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY);
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      if (!payload) {
        return NextResponse.redirect(new URL("owner/auth", req.nextUrl.origin));
      } else {
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set("x-owner-id", String(payload.id));

        return NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
      }
    } catch (error) {
      req.cookies.delete("token");
      return NextResponse.redirect(new URL("owner/auth", req.nextUrl.origin));
    }
  }
  return NextResponse.next();
}

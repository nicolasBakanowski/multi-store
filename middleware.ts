import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PROTECTED_ADMIN_PREFIXES = ["/admin", "/orders"];
const ADMIN_LIKE_ROLE_IDS = new Set([1, 4]);

async function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
  if (!secret) return null;
  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return payload as { roleId?: number } & Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAdmin =
    PROTECTED_ADMIN_PREFIXES.some((p) => pathname.startsWith(p)) ||
    pathname.startsWith("/category/") ||
    pathname.startsWith("/product/");

  if (!needsAdmin) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.next();

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.next();

  if (pathname.startsWith("/admin") || pathname.startsWith("/orders")) {
    if (!ADMIN_LIKE_ROLE_IDS.has(Number(payload.roleId))) {
      const url = req.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};


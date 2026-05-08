import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

const PUBLIC_PATHS = ['/login', '/register'];
const PROTECTED_PATHS = ['/dashboard', '/member'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));

  if (isPublicPath) {
    if (!token) return NextResponse.next();

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch {
      const res = NextResponse.next();
      res.cookies.delete('token');
      return res;
    }
  }

  if (isProtectedPath) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL('/login', req.url));
      res.cookies.delete('token');
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard/:path*', '/member/:path*'],
};

import { NextResponse, type NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/jwt';

export const config = {
  matcher: '/admin/:path*',
};

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;
  const secret = process.env.JWT_SECRET;

  if (!token || !secret) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const payload = await verifyJWT(token, secret);
  if (!payload) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

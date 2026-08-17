import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = [
  '/dashboard',
  '/leads',
  '/applications',
  '/banks',
  '/commissions',
  '/partners',
  '/documents',
  '/tasks',
  '/calls',
  '/whatsapp',
  '/accounting',
  '/hr',
  '/reports',
  '/ai-assistant',
  '/schemes',
  '/scheme-master',
  '/settings',
  '/notifications',
  '/onboarding',
];

const authRoutes = ['/login', '/register', '/forgot-password'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isAuthRoute = authRoutes.some((route) => pathname === route);

  // 1. Redirect unauthenticated users trying to access protected CRM routes to /login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users trying to access login/register routes to /dashboard
  if (isAuthRoute && token) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/leads/:path*',
    '/applications/:path*',
    '/banks/:path*',
    '/commissions/:path*',
    '/partners/:path*',
    '/documents/:path*',
    '/tasks/:path*',
    '/calls/:path*',
    '/whatsapp/:path*',
    '/accounting/:path*',
    '/hr/:path*',
    '/reports/:path*',
    '/ai-assistant/:path*',
    '/schemes/:path*',
    '/scheme-master/:path*',
    '/settings/:path*',
    '/notifications/:path*',
    '/onboarding/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};

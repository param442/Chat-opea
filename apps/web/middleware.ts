import NextAuth from 'next-auth';
import authConfig from './auth.config';
const { auth } = NextAuth(authConfig);
import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  defaultLoggedPrefix,
} from '@repo/lib/routes';

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth;
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPUblicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isApiRoute) {
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(defaultLoggedPrefix, nextUrl));
    }
    return;
  }
  if (!isLoggedIn && !isPUblicRoute) {
    return Response.redirect(new URL('/auth/register', nextUrl));
  }
});
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
};

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkServerSession } from './lib/api/serverApi';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

  // Немає accessToken
  if (!accessToken) {
    if (refreshToken) {
      const { authenticated, headers } = await checkServerSession();

      // якщо сервер повернув нові cookie — додаємо їх
      const res = NextResponse.next();
      const setCookieHeader = headers?.get?.('set-cookie');
      if (setCookieHeader) {
        res.headers.append('set-cookie', setCookieHeader);
      }

      if (authenticated) {
        if (isAuthRoute) return NextResponse.redirect(new URL('/', request.url));
        if (isPrivateRoute) return res;
      } else {
        if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    } else {
      if (isAuthRoute) return NextResponse.next();
      if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  } else {
    if (isAuthRoute) return NextResponse.redirect(new URL('/', request.url));
    if (isPrivateRoute) return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/notes/:path*',
    '/notes/filter/:path*',
    '/sign-in',
    '/sign-up',
  ],
};

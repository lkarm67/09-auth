import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkServerSession } from './lib/api/serverApi';

const PRIVATE_ROUTES = ['/profile'];
const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
  const isPrivateRoute = PRIVATE_ROUTES.some(route => pathname.startsWith(route));

  // Якщо немає accessToken
  if (!accessToken) {
    if (refreshToken) {
      // Перевірка сесії через refreshToken
      const data = await checkServerSession();

      if (data.authenticated) {
        // Авторизований користувач
        if (isAuthRoute) {
          return NextResponse.redirect(new URL('/', request.url));
        }
        if (isPrivateRoute) {
          return NextResponse.next();
        }
      } else {
        // Неавторизований
        if (isPrivateRoute) {
          return NextResponse.redirect(new URL('/sign-in', request.url));
        }
      }
    } else {
      // Немає refreshToken
      if (isAuthRoute) return NextResponse.next();
      if (isPrivateRoute) return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  } else {
    // Є accessToken
    if (isAuthRoute) return NextResponse.redirect(new URL('/', request.url));
    if (isPrivateRoute) return NextResponse.next();
  }
}

export const config = {
  matcher: ['/profile/:path*', '/sign-in', '/sign-up'],
};

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Define paths that require authentication
    if (path.startsWith('/admin')) {
        // Exclude the login page itself
        if (path === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the admin_user cookie
        // Note: The current implementation uses localStorage, which is not accessible here.
        // To fix the "going directly" issue immediately without rewriting the entire auth flow to cookies:
        // We will rely on the client-side check in AdminLayoutContent.tsx, BUT we can add a simple cookie check if we migrate.

        // HOWEVER, since the user says "it is going directly", it implies the client-side check is failing or too slow.
        // The best fix is to use a cookie.

        // PLAN:
        // 1. Update the login page to set a cookie 'admin_session' in addition to localStorage.
        // 2. Use this middleware to check for 'admin_session'.

        const adminSession = request.cookies.get('admin_session');

        if (!adminSession) {
            // Redirect to login page
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};

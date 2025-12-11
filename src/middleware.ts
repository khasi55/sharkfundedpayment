import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // ------------------------------------------------------------------------
    // 1. GLOBAL MAINTENANCE MODE CHECK
    // ------------------------------------------------------------------------
    // Bypass maintenance for the maintenance page itself, assets, and API routes if needed
    if (process.env.MAINTENANCE_MODE === 'true') {
        if (!path.startsWith('/maintenance') && !path.startsWith('/api/') && !path.startsWith('/_next')) {
            return NextResponse.redirect(new URL('/maintenance', request.url));
        }
    }

    // ------------------------------------------------------------------------
    // 2. ADMIN AUTH CHECK
    // ------------------------------------------------------------------------
    // Define paths that require authentication
    if (path.startsWith('/sharkfunded2logintoadminwithpermission')) {

        // Exclude the login page itself
        if (path === '/sharkfunded2logintoadminwithpermission/login') {
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
            return NextResponse.redirect(new URL('/sharkfunded2logintoadminwithpermission/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // Match all request paths except for the ones starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

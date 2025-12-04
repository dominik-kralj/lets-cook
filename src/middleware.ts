import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from './lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const { response, user } = await updateSession(request);

    if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
        return NextResponse.redirect(new URL('/auth?mode=login', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/auth') && user) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};

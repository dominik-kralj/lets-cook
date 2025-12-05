import { createServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

import db from '@/lib/prisma/db';

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    response = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        try {
            const dbUser = await db.user.findUnique({
                where: { id: user.id },
                select: { id: true },
            });

            // User in Supabase but not in database - sign them out
            if (!dbUser) {
                await supabase.auth.signOut();
                return { response, user: null };
            }
        } catch (error) {
            console.error('Error checking user in database:', error);
        }
    }

    return { response, user };
}

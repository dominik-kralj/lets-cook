import { NextResponse } from 'next/server';

import db from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const profile = await db.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                bio: true,
                avatar: true,
                _count: {
                    select: {
                        recipes: true,
                        collections: true,
                        favoriteRecipes: true,
                    },
                },
            },
        });

        if (!profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        const { id, email, username, createdAt, _count, bio, avatar } = profile;

        return NextResponse.json({
            id,
            email,
            username,
            createdAt,
            bio,
            avatar,
            statistics: {
                recipes: _count.recipes,
                collections: _count.collections,
                favorites: _count.favoriteRecipes,
            },
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
    }
}

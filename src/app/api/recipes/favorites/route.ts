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

        const favorites = await db.recipe.findMany({
            where: {
                userId: user.id,
                isFavorite: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(favorites);
    } catch (error) {
        console.error('Error fetching favorite recipes:', error);
        return NextResponse.json(
            { error: 'Failed to fetch favorite recipes' },
            { status: 500 },
        );
    }
}

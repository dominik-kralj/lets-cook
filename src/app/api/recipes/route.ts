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

        const recipes = await db.recipe.findMany({
            where: { userId: user.id },
            select: {
                id: true,
                title: true,
                description: true,
                cookTime: true,
                imageUrl: true,
                ingredients: true,
                instructions: true,
                isFavorite: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const collectionRecipes = await db.collectionRecipe.findMany({
            where: {
                recipeId: params.id,
                collection: {
                    userId: user.id,
                },
            },
            select: {
                collectionId: true,
            },
        });

        const collectionIds = collectionRecipes.map((cr) => cr.collectionId);

        return NextResponse.json(collectionIds);
    } catch (error) {
        console.error('Error fetching recipe collections:', error);
        return NextResponse.json(
            { error: 'Failed to fetch recipe collections' },
            { status: 500 },
        );
    }
}

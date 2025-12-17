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

        const collections = await db.collection.findMany({
            where: { userId: user.id },
            include: {
                recipes: {
                    select: {
                        recipe: {
                            select: {
                                id: true,
                                title: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        const formattedCollections = collections.map((collection) => ({
            id: collection.id,
            name: collection.name,
            description: collection.description,
            recipes: collection.recipes.map((cr) => cr.recipe),
            recipeCount: collection.recipes.length,
            createdAt: collection.createdAt,
            updatedAt: collection.updatedAt,
        }));

        return NextResponse.json(formattedCollections);
    } catch (error) {
        console.error('Error fetching collections:', error);
        return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
    }
}

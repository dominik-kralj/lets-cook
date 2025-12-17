import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { id } = await params;

        const collection = await db.collection.findFirst({
            where: {
                id,
                userId: user.id,
            },
            include: {
                recipes: {
                    select: {
                        recipe: {
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
                        },
                    },
                },
            },
        });

        if (!collection) {
            return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
        }

        const formattedCollection = {
            id: collection.id,
            name: collection.name,
            description: collection.description,
            recipes: collection.recipes.map((cr) => cr.recipe),
            recipeCount: collection.recipes.length,
            createdAt: collection.createdAt,
            updatedAt: collection.updatedAt,
        };

        return NextResponse.json(formattedCollection);
    } catch (error) {
        console.error('Error fetching collection:', error);
        return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
    }
}

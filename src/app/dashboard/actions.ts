'use server';

import db from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';
import { RecipeFormData } from '@/models/recipe';

export async function createRecipeAction(data: RecipeFormData) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
            console.error('Error getting user:', userError);
            return { error: 'Authentication error' };
        }

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const existingRecipe = await db.recipe.findFirst({
            where: {
                userId: user.id,
                title: data.title,
            },
        });

        if (existingRecipe) {
            return { error: 'A recipe with this title already exists' };
        }

        const ingredients = data.ingredients.map((item) => item.value);
        const instructions = data.instructions.map((item) => item.value);

        const recipe = await db.recipe.create({
            data: {
                userId: user.id,
                title: data.title,
                description: data.description || null,
                cookTime: parseInt(data.cookTime),
                imageUrl: data.imageUrl || null,
                ingredients,
                instructions,
                collections:
                    data.collectionIds && data.collectionIds.length > 0
                        ? {
                              create: data.collectionIds.map((collectionId) => ({
                                  collectionId,
                              })),
                          }
                        : undefined,
            },
        });

        return { data: recipe };
    } catch (error) {
        console.error('Unexpected error in createRecipeAction:', error);
        return { error: 'An unexpected error occurred' };
    }
}

export async function uploadRecipeImage(file: File): Promise<string | null> {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `recipes/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('recipe-images')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (uploadError) {
        console.error('Error uploading recipe image:', uploadError);
        return null;
    }

    const {
        data: { publicUrl },
    } = supabase.storage.from('recipe-images').getPublicUrl(filePath);

    return publicUrl;
}

export async function updateRecipeAction(recipeId: string, updates: Partial<RecipeFormData>) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        if (updates.title !== undefined) {
            const existingRecipe = await db.recipe.findFirst({
                where: {
                    userId: user.id,
                    title: updates.title,
                    NOT: {
                        id: recipeId,
                    },
                },
            });

            if (existingRecipe) {
                return { success: false, error: 'A recipe with this title already exists' };
            }
        }

        const updateData: {
            title?: string;
            cookTime?: number;
            description?: string | null;
            imageUrl?: string | null;
            ingredients?: string[];
            instructions?: string[];
        } = {};

        if (updates.title !== undefined) updateData.title = updates.title;
        if (updates.cookTime !== undefined) updateData.cookTime = parseInt(updates.cookTime);
        if (updates.description !== undefined) updateData.description = updates.description || null;
        if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl || null;

        if (updates.ingredients !== undefined) {
            updateData.ingredients = updates.ingredients.map((item) => item.value);
        }

        if (updates.instructions !== undefined) {
            updateData.instructions = updates.instructions.map((item) => item.value);
        }

        const recipe = await db.recipe.update({
            where: {
                id: recipeId,
                userId: user.id,
            },
            data: {
                ...updateData,
                collections:
                    updates.collectionIds !== undefined
                        ? {
                              deleteMany: {},
                              create: updates.collectionIds.map((collectionId) => ({
                                  collectionId,
                              })),
                          }
                        : undefined,
            },
        });

        return { success: true, data: recipe };
    } catch (error) {
        console.error('Error updating recipe:', error);
        return { success: false, error: 'Failed to update recipe' };
    }
}

export async function deleteRecipeAction(recipeId: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { success: false, error: 'Unauthorized' };
    }

    const { data: recipe } = await supabase
        .from('recipes')
        .select('imageUrl')
        .eq('id', recipeId)
        .eq('userId', user.id)
        .single();

    const { error: deleteError } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId)
        .eq('userId', user.id);

    if (deleteError) {
        return { success: false, error: 'Failed to delete recipe' };
    }

    if (recipe?.imageUrl) {
        const imagePath = recipe.imageUrl.split('/recipe-images/')[1];
        if (imagePath) {
            await supabase.storage.from('recipe-images').remove([`recipes/${imagePath}`]);
        }
    }

    return { success: true };
}

export async function toggleFavoriteAction(recipeId: string) {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { success: false, error: 'Unauthorized' };
    }

    const { data: currentRecipe, error: fetchError } = await supabase
        .from('recipes')
        .select('isFavorite')
        .eq('id', recipeId)
        .eq('userId', user.id)
        .single();

    if (fetchError || !currentRecipe) {
        return { success: false, error: 'Recipe not found' };
    }

    const { error: updateError } = await supabase
        .from('recipes')
        .update({ isFavorite: !currentRecipe.isFavorite })
        .eq('id', recipeId)
        .eq('userId', user.id);

    if (updateError) {
        return { success: false, error: 'Failed to update favorite status' };
    }

    return { success: true };
}

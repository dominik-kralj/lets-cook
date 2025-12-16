'use server';

import { createClient } from '@/lib/supabase/server';
import { RecipeFormData } from '@/models/recipe';
import { Recipe } from '@/types/recipe';

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

        const ingredients = data.ingredients.map((item) => item.value);
        const instructions = data.instructions.map((item) => item.value);

        const { data: recipe, error } = await supabase
            .from('recipes')
            .insert({
                userId: user.id,
                title: data.title,
                description: data.description || null,
                cookTime: parseInt(data.cookTime),
                imageUrl: data.imageUrl || null,
                ingredients,
                instructions,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating recipe:', error);
            return { error: `Failed to create recipe: ${error.message}` };
        }

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
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return { success: false, error: 'Unauthorized' };
    }

    const updateData: Partial<Recipe> = {};

    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.cookTime !== undefined) updateData.cookTime = parseInt(updates.cookTime);
    if (updates.description !== undefined)
        updateData.description = updates.description || undefined;
    if (updates.imageUrl !== undefined) updateData.imageUrl = updates.imageUrl || undefined;

    if (updates.ingredients !== undefined) {
        updateData.ingredients = updates.ingredients.map((item) => item.value);
    }

    if (updates.instructions !== undefined) {
        updateData.instructions = updates.instructions.map((item) => item.value);
    }

    const { data: recipe, error } = await supabase
        .from('recipes')
        .update(updateData)
        .eq('id', recipeId)
        .eq('userId', user.id)
        .select()
        .single();

    if (error) {
        console.error('Error updating recipe:', error);
        return { success: false, error: 'Failed to update recipe' };
    }

    return { success: true, data: recipe };
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

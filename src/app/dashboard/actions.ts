'use server';

import { revalidatePath } from 'next/cache';

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

        revalidatePath('/dashboard');
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

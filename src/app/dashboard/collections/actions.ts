'use server';

import { createClient } from '@/lib/supabase/server';

export async function createCollectionAction(data: { name: string; description?: string }) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        const { data: existingCollection } = await supabase
            .from('collections')
            .select('id')
            .eq('userId', user.id)
            .eq('name', data.name)
            .single();

        if (existingCollection) {
            return { success: false, error: 'A collection with this name already exists' };
        }

        const { data: collection, error } = await supabase
            .from('collections')
            .insert({
                userId: user.id,
                name: data.name,
                description: data.description || null,
            })
            .select()
            .single();

        if (error) {
            console.error('Error creating collection:', error);
            return { success: false, error: 'Failed to create collection' };
        }

        return { success: true, data: collection };
    } catch (error) {
        console.error('Unexpected error in createCollectionAction:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function updateCollectionAction(
    collectionId: string,
    data: { name?: string; description?: string },
) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        if (data.name !== undefined) {
            const { data: existingCollection } = await supabase
                .from('collections')
                .select('id')
                .eq('userId', user.id)
                .eq('name', data.name)
                .neq('id', collectionId)
                .single();

            if (existingCollection) {
                return { success: false, error: 'A collection with this name already exists' };
            }
        }

        const updateData: { name?: string; description?: string | null } = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.description !== undefined) updateData.description = data.description || null;

        const { data: collection, error } = await supabase
            .from('collections')
            .update(updateData)
            .eq('id', collectionId)
            .eq('userId', user.id)
            .select()
            .single();

        if (error) {
            console.error('Error updating collection:', error);
            return { success: false, error: 'Failed to update collection' };
        }

        return { success: true, data: collection };
    } catch (error) {
        console.error('Unexpected error in updateCollectionAction:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function deleteCollectionAction(collectionId: string) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        const { error } = await supabase
            .from('collections')
            .delete()
            .eq('id', collectionId)
            .eq('userId', user.id);

        if (error) {
            console.error('Error deleting collection:', error);
            return { success: false, error: 'Failed to delete collection' };
        }

        return { success: true };
    } catch (error) {
        console.error('Unexpected error in deleteCollectionAction:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function addRecipeToCollectionAction(collectionId: string, recipeId: string) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        const { error } = await supabase.from('collection_recipes').insert({
            collectionId,
            recipeId,
        });

        if (error) {
            console.error('Error adding recipe to collection:', error);
            return { success: false, error: 'Failed to add recipe to collection' };
        }

        return { success: true };
    } catch (error) {
        console.error('Unexpected error in addRecipeToCollectionAction:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

export async function removeRecipeFromCollectionAction(collectionId: string, recipeId: string) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            return { success: false, error: 'Unauthorized' };
        }

        const { error } = await supabase
            .from('collection_recipes')
            .delete()
            .eq('collectionId', collectionId)
            .eq('recipeId', recipeId);

        if (error) {
            console.error('Error removing recipe from collection:', error);
            return { success: false, error: 'Failed to remove recipe from collection' };
        }

        return { success: true };
    } catch (error) {
        console.error('Unexpected error in removeRecipeFromCollectionAction:', error);
        return { success: false, error: 'An unexpected error occurred' };
    }
}

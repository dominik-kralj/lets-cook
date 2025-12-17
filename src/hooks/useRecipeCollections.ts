import useSWR from 'swr';

import { fetcher } from '@/lib/fetcher';

export function useRecipeCollections(recipeId: string | null) {
    const { data, error, isLoading } = useSWR<string[]>(
        recipeId ? `/api/recipes/${recipeId}/collections` : null,
        fetcher,
    );

    return {
        collectionIds: data,
        isLoading,
        error,
    };
}

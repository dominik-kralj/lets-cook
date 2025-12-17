import useSWR from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Recipe } from '@/types/recipe';

export function useFavorites() {
    const { data, error, isLoading, mutate } = useSWR<Array<Recipe>>(
        '/api/recipes/favorites',
        fetcher,
    );

    return {
        favorites: data,
        isLoading,
        error,
        mutate,
    };
}

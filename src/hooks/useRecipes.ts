import useSWR from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Recipe } from '@/types/recipe';

export function useRecipes() {
    const { data, error, isLoading, mutate } = useSWR<Array<Recipe>>('/api/recipes', fetcher);

    return {
        recipes: data,
        isLoading,
        error,
        mutate,
    };
}

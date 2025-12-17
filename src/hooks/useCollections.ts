import useSWR from 'swr';

import { fetcher } from '@/lib/fetcher';
import { Collection } from '@/types/collection';

export function useCollections() {
    const { data, error, isLoading, mutate } = useSWR<Array<Collection>>(
        '/api/collections',
        fetcher,
    );

    return {
        collections: data,
        isLoading,
        error,
        mutate,
    };
}

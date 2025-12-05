import useSWR from 'swr';

import { fetcher } from '@/lib/fetcher';
import { UserProfile } from '@/types/user';

export function useProfile() {
    const { data, error, isLoading, mutate } = useSWR<UserProfile>('/api/profile', fetcher);

    return {
        profile: data,
        isLoading,
        isError: error,
        mutate,
    };
}

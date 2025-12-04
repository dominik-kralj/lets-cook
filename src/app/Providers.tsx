'use client';

import { ReactNode } from 'react';
import { SWRConfig } from 'swr';

import { fetcher } from '@/lib/fetcher';

import { Provider } from '../components/chakra-ui/provider';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                refreshInterval: 0,
                revalidateOnFocus: false,
            }}
        >
            <Provider>{children}</Provider>
        </SWRConfig>
    );
}

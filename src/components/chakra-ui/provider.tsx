'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { system } from '@/style/theme';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

export function Provider(props: ColorModeProviderProps) {
    const [mounted, setMounted] = useState(false);

    // Fix for the hydration warning

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <ChakraProvider value={system}>
            <ColorModeProvider {...props} />
        </ChakraProvider>
    );
}

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from './colors';
import { semanticTokens } from './semanticTokens';

const config = defineConfig({
    theme: {
        tokens: { colors },
        semanticTokens,
    },
});

export const system = createSystem(defaultConfig, config);

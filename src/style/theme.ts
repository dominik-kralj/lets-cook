import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from './colors';
import { buttonRecipe } from './components/buttonRecipe';
import { cardRecipe } from './components/cardRecipe';
import { semanticTokens } from './semanticTokens';

const config = defineConfig({
    theme: {
        tokens: { colors },
        semanticTokens,
        recipes: {
            button: buttonRecipe,
            card: cardRecipe,
        },
    },
});

export const system = createSystem(defaultConfig, config);

import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from './colors';
import { buttonRecipe } from './components/buttonRecipe';
import { cardRecipe } from './components/cardRecipe';
import { inputRecipe } from './components/inputRecipe';
import { linkRecipe } from './components/linkRecipe';
import { semanticTokens } from './semanticTokens';
import { spacing } from './spacing';

const config = defineConfig({
    theme: {
        tokens: { colors, spacing },
        semanticTokens,
        recipes: {
            button: buttonRecipe,
            card: cardRecipe,
            input: inputRecipe,
            link: linkRecipe,
        },
    },
});

export const system = createSystem(defaultConfig, config);

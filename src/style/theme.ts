import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from './colors';
import { buttonRecipe } from './components/buttonRecipe';
import { cardRecipe } from './components/cardRecipe';
import { inputRecipe } from './components/inputRecipe';
import { linkRecipe } from './components/linkRecipe';
import { spinnerRecipe } from './components/spinnerRecipe';
import { textareaRecipe } from './components/textareaRecipe';
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
            spinner: spinnerRecipe,
            textarea: textareaRecipe,
        },
        slotRecipes: {
            card: cardRecipe,
        },
    },
});

export const system = createSystem(defaultConfig, config);

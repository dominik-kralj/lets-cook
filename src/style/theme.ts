import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { colors } from './colors';
import { buttonRecipe } from './components/buttonRecipe';
import { cardRecipe } from './components/cardRecipe';
import { fileUploadSlotRecipe } from './components/fileUploadRecipe';
import { inputRecipe } from './components/inputRecipe';
import { linkRecipe } from './components/linkRecipe';
import { spinnerRecipe } from './components/spinnerRecipe';
import { tabsRecipe } from './components/tabsRecipe';
import { textareaRecipe } from './components/textareaRecipe';
import { semanticTokens } from './semanticTokens';
import { spacing } from './spacing';
import { fontSizes, fontWeights, letterSpacings, lineHeights } from './typography';

const config = defineConfig({
    theme: {
        tokens: {
            colors,
            spacing,
            fontSizes,
            fontWeights,
            lineHeights,
            letterSpacings,
        },
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
            tabs: tabsRecipe,
            fileUpload: fileUploadSlotRecipe,
        },
    },
});

export const system = createSystem(defaultConfig, config);

import { defineRecipe } from '@chakra-ui/react';

export const linkRecipe = defineRecipe({
    base: {
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s',
        outline: 'none',

        _hover: {
            textDecoration: 'none',
        },
        _focus: {
            outline: 'none',
            boxShadow: 'none',
        },
        _focusVisible: {
            outline: 'none',
            boxShadow: 'none',
        },
    },
});

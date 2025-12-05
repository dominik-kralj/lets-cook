import { defineSlotRecipe } from '@chakra-ui/react';
import { cardAnatomy } from '@chakra-ui/react/anatomy';

export const cardRecipe = defineSlotRecipe({
    slots: cardAnatomy.keys(),
    base: {
        root: {
            bg: 'fills.surfaces.cardElevated',
            borderRadius: '2xl',
            borderWidth: '1px',
            borderColor: 'neutrals.10',
        },
        body: {
            p: 6,
        },
    },
    variants: {
        variant: {
            elevated: {
                root: {
                    boxShadow: 'sm',
                },
            },
            outline: {
                root: {
                    boxShadow: 'none',
                },
            },
        },
    },
    defaultVariants: {
        variant: 'outline',
    },
});

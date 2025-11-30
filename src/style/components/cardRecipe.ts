import { defineRecipe } from '@chakra-ui/react';

export const cardRecipe = defineRecipe({
    base: {
        borderRadius: 'lg',
        transition: 'all 0.2s',
        overflow: 'hidden',
    },

    variants: {
        variant: {
            elevated: {
                bg: 'fills.surfaces.card',
                boxShadow: 'sm',
                _hover: {
                    boxShadow: 'md',
                    transform: 'translateY(-2px)',
                },
            },
            outline: {
                bg: 'fills.surfaces.card',
                borderWidth: '1px',
                borderColor: 'outlines.withControlsNeutral.default',
                _hover: {
                    borderColor: 'outlines.withControlsNeutral.hover',
                },
            },
            filled: {
                bg: 'fills.surfaces.card',
            },
        },
    },

    defaultVariants: {
        variant: 'elevated',
    },
});

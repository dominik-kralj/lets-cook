import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
    base: {
        borderRadius: 'md',
        transition: 'all 0.2s',
    },

    variants: {
        variant: {
            solid: {
                bg: 'fills.actionsBrandStrong.default',
                color: 'textAndIcons.onControlsBrand.default',
                fontWeight: 'bold',
                _hover: {
                    bg: 'fills.actionsBrandStrong.hover',
                },
            },
            outline: {
                borderColor: 'outlines.withControlsNeutral.default',
                bg: 'fills.surfaces.background',
                color: 'textAndIcons.onSurfaces.lead',
                _hover: {
                    bg: 'fills.surfaces.card',
                    color: 'textAndIcons.onSurfaces.lead',
                },
            },
        },
    },

    defaultVariants: {
        variant: 'solid',
    },
});

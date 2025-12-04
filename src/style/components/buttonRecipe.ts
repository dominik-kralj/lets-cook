import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
    base: {
        borderRadius: 'md',
        transition: 'all 0.2s',
        fontWeight: 'bold',
    },

    variants: {
        variant: {
            solid: {
                bg: 'fills.actionsBrandStrong.default',
                color: 'textAndIcons.onControlsBrand.default',

                _hover: {
                    bg: 'fills.actionsBrandStrong.hover',
                },
                _active: {
                    bg: 'fills.actionsBrandStrong.pressed',
                },
                _focus: {
                    borderColor: 'outlines.withActionsBrandWeak.focus',
                },
                _focusVisible: {
                    borderColor: 'outlines.withActionsBrandWeak.focus',
                },
                _disabled: {
                    bg: 'fills.actionsBrandStrong.disabled',
                    color: 'textAndIcons.onActionsBrandPrimary.disabled',
                    opacity: 0.6,
                },
                _pressed: {
                    bg: 'fills.actionsBrandStrong.pressed',
                },
            },
            outline: {
                bg: 'fills.controlsNeutral.inactive',
                color: 'textAndIcons.onSurfaces.lead',
                border: '1px solid var(--chakra-colors-neutrals-15) !important',

                _hover: {
                    bg: 'fills.surfaces.card',
                    borderColor: 'outlines.withControlsNeutral.hover',
                },
                _active: {
                    bg: 'fills.controlsNeutral.hover',
                    borderColor: 'outlines.withControlsNeutral.pressed',
                },
                _focus: {
                    borderColor: 'outlines.withControlsNeutral.focusHeavy',
                },
                _focusVisible: {
                    borderColor: 'outlines.withControlsNeutral.focusHeavy',
                },
                _disabled: {
                    borderColor: 'outlines.withControlsNeutral.disabled',
                    color: 'textAndIcons.onControlsNeutral.disabled',
                    opacity: 0.6,
                },
                _pressed: {
                    bg: 'fills.controlsNeutral.hover',
                    borderColor: 'outlines.withControlsNeutral.pressed',
                },
            },
        },
    },

    defaultVariants: {
        variant: 'solid',
    },
});

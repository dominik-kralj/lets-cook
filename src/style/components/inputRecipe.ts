import { defineRecipe } from '@chakra-ui/react';

export const inputRecipe = defineRecipe({
    base: {
        bg: 'fills.controlsNeutral.inactive',
        borderColor: 'outlines.withControlsNeutral.default',
        color: 'textAndIcons.onControlsNeutral.default',

        _placeholder: {
            color: 'textAndIcons.onControlsNeutral.placeholder',
        },
        _hover: {
            borderColor: 'fills.actionsBrandStrong.hover',
            bg: 'fills.controlsNeutral.hover',
        },
        _focus: {
            borderColor: 'fills.actionsBrandStrong.default',
            bg: 'fills.controlsNeutral.activeOnFill',
        },
        _focusVisible: {
            // Chakra overrides this so important is needed
            outline: '1px solid var(--chakra-colors-primary-40) !important',
            border: '1px solid var(--chakra-colors-primary-40) !important',
        },
        _active: {
            borderColor: 'fills.actionsBrandStrong.pressed',
        },
        _disabled: {
            bg: 'fills.controlsNeutral.disabled',
            borderColor: 'outlines.withControlsNeutral.disabled',
            color: 'textAndIcons.onControlsNeutral.disabled',
            cursor: 'not-allowed',
            opacity: 0.6,
        },
        _invalid: {
            borderColor: 'outlines.withControlsNeutral.error',
            bg: 'fills.controlsNeutral.error',

            _focus: {
                borderColor: 'outlines.withControlsNeutral.error',
                boxShadow: '0 0 0 3px token(colors.error.10)',
            },
        },
    },
});

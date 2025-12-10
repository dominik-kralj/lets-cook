import { defineSlotRecipe } from '@chakra-ui/react';
import { tabsAnatomy } from '@chakra-ui/react/anatomy';

export const tabsRecipe = defineSlotRecipe({
    slots: tabsAnatomy.keys(),
    base: {
        list: {
            borderBottom: 'none',
        },
        trigger: {
            borderRadius: 0,
            borderBottomWidth: '2px',
            borderBottomColor: 'transparent',
            _selected: {
                color: 'fills.actionsBrandStrong.default',

                '&::before': {
                    background: 'fills.actionsBrandStrong.default !important',
                },
            },
        },
        indicator: {
            color: 'fills.actionsBrandStrong.default',
            borderBottomColor: 'fills.actionsBrandStrong.default',
            background: 'fills.actionsBrandStrong.default !important',
        },
    },
    variants: {
        size: {
            sm: {
                trigger: {
                    fontSize: { base: 'xs', md: 'sm' },
                    px: { base: 2, md: 4 },
                },
            },
        },
    },
});

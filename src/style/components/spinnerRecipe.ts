import { defineRecipe } from '@chakra-ui/react';

export const spinnerRecipe = defineRecipe({
    base: {
        borderColor: 'fills.actionsBrandStrong.default',
        borderBottomColor: 'transparent',
    },
    variants: {
        size: {
            xs: {
                width: '1rem',
                height: '1rem',
                borderWidth: '2px',
            },
            sm: {
                width: '1.5rem',
                height: '1.5rem',
                borderWidth: '2px',
            },
            md: {
                width: '2rem',
                height: '2rem',
                borderWidth: '3px',
            },
            lg: {
                width: '2.5rem',
                height: '2.5rem',
                borderWidth: '3px',
            },
            xl: {
                width: '3rem',
                height: '3rem',
                borderWidth: '4px',
            },
        },
    },
    defaultVariants: {
        size: 'lg',
    },
});

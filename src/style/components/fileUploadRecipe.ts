import { fileUploadAnatomy } from '@chakra-ui/react/anatomy';
import { defineSlotRecipe } from '@chakra-ui/react';

export const fileUploadSlotRecipe = defineSlotRecipe({
    className: 'chakra-file-upload',
    slots: fileUploadAnatomy.keys(),
    base: {
        root: {
            width: 'full',
        },
        dropzone: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'element',
            borderWidth: '2px',
            borderStyle: 'dashed',
            borderColor: 'borders.default',
            borderRadius: 'md',
            padding: 'component',
            transition: 'all 0.2s',
            cursor: 'pointer',
            bg: 'surfaces.default',
            _hover: {
                borderColor: 'fills.actionsBrandStrong.default',
                bg: 'fills.surfaces.soft',
            },
            _disabled: {
                opacity: 0.5,
                cursor: 'not-allowed',
            },
        },
        item: {
            display: 'flex',
            alignItems: 'center',
            gap: 'element',
            padding: 'element',
            borderRadius: 'md',
            bg: 'fills.surfaces.soft',
            borderWidth: '1px',
            borderColor: 'borders.default',
        },
        itemName: {
            flex: 1,
            fontSize: 'sm',
            color: 'textAndIcons.onSurfaces.lead',
            fontWeight: 'medium',
        },
        itemSizeText: {
            fontSize: 'xs',
            color: 'textAndIcons.onSurfaces.helper',
        },
        itemDeleteTrigger: {
            color: 'textAndIcons.onSurfaces.helper',
            cursor: 'pointer',
            transition: 'color 0.2s',
            _hover: {
                color: 'fills.criticalStrong.default',
            },
        },
        itemGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: 'element',
            marginTop: 'element',
        },
    },
});
import { Box, BoxProps } from '@chakra-ui/react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';

export interface ImageProps extends NextImageProps {
    containerProps?: Omit<BoxProps, 'children'>;
}

export const Image = ({ containerProps, style, fill, ...rest }: ImageProps) => {
    return (
        <Box pos="relative" {...containerProps}>
            <NextImage {...rest} style={{ objectFit: 'cover', ...style }} fill={fill} />
        </Box>
    );
};

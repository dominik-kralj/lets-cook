import { Box, Text } from '@chakra-ui/react';

export const Footer = () => {
    return (
        <Box as="footer" bg="fills.surfaces.card" py={8} borderTopWidth="1px" width="100%">
            <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                © 2025 Let&apos;s Cook. Made with love for home cooks.
            </Text>
        </Box>
    );
};

import { Container, Text } from '@chakra-ui/react';

export const Footer = () => {
    return (
        <Container as="footer" bg="fills.surfaces.card" py={8} mt={16} borderTopWidth="1px">
            <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                © 2024 Let&apos;s Cook. Made with love for home cooks.
            </Text>
        </Container>
    );
};

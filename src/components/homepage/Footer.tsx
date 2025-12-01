import { Container, Text } from '@chakra-ui/react';

export const Footer = () => {
    return (
        <Container as="footer" bg="fills.surfaces.card" py={8} borderTopWidth="1px" mt="section">
            <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                © 2024 Let&apos;s Cook. Made with love for home cooks.
            </Text>
        </Container>
    );
};

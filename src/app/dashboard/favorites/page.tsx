// src/app/dashboard/favorites/page.tsx
'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

import { DashboardLayout } from '../components/DashsboardLayout';

export default function FavoritesPage() {
    return (
        <DashboardLayout>
            <VStack align="stretch" gap="component">
                <Box>
                    <Heading as="h1" fontSize="3xl" color="textAndIcons.onSurfaces.lead" mb="tight">
                        Favorites
                    </Heading>
                    <Text color="textAndIcons.onSurfaces.helper">
                        Your favorite recipes in one place
                    </Text>
                </Box>

                <Container
                    maxW="full"
                    p={6}
                    bg="fills.surfaces.cardElevated"
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="outlines.withControlsNeutral.default"
                >
                    <Text color="textAndIcons.onSurfaces.helper" textAlign="center">
                        Your favorite recipes will appear here
                    </Text>
                </Container>
            </VStack>
        </DashboardLayout>
    );
}

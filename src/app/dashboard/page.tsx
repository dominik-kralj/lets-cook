'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { Suspense } from 'react';

import { DashboardLayout } from './components/DashsboardLayout';

function DashboardContent() {
    return (
        <DashboardLayout>
            <VStack align="stretch" gap="component">
                <Box>
                    <Heading as="h1" fontSize="3xl" color="textAndIcons.onSurfaces.lead" mb="tight">
                        Recipes
                    </Heading>
                    <Text color="textAndIcons.onSurfaces.helper">
                        Manage your recipe collection
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
                        Your recipes will appear here
                    </Text>
                </Container>
            </VStack>
        </DashboardLayout>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={null}>
            <DashboardContent />
        </Suspense>
    );
}

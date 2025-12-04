'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

import { DashboardLayout } from '../components/DashsboardLayout';

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <VStack align="stretch" gap="component">
                <Box>
                    <Heading as="h1" fontSize="3xl" color="textAndIcons.onSurfaces.lead" mb="tight">
                        Settings
                    </Heading>
                    <Text color="textAndIcons.onSurfaces.helper">Customize your experience</Text>
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
                        Settings options will appear here
                    </Text>
                </Container>
            </VStack>
        </DashboardLayout>
    );
}

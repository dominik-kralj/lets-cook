'use client';

import { Box, Card, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaBook, FaBookmark, FaUtensils } from 'react-icons/fa';

export const Body = () => {
    const features = [
        {
            title: 'Save & Organize',
            description:
                'Add recipes with ease and keep them organized in your personal collection',
            icon: FaBookmark,
        },
        {
            title: 'Your Collection',
            description: 'Build your digital cookbook with unlimited recipes at your fingertips',
            icon: FaBook,
        },
        {
            title: 'Cook with Ease',
            description: 'Access your recipes anytime, anywhere, and start cooking instantly',
            icon: FaUtensils,
        },
    ];

    return (
        <Container>
            <VStack gap={6} textAlign="center" mb={12}>
                <Heading
                    as="h2"
                    fontSize={{ base: '3xl', md: '5xl' }}
                    color="textAndIcons.onSurfaces.lead"
                >
                    Everything you need
                </Heading>

                <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color="textAndIcons.onSurfaces.helper"
                    maxW="2xl"
                >
                    A simple, beautiful way to organize all your favorite recipes in one place
                </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
                {features.map((feature) => (
                    <Card.Root key={feature.title}>
                        <Card.Body>
                            <VStack align="center" gap={6}>
                                <Box
                                    p={3}
                                    bg="fills.actionsBrandStrong.default"
                                    borderRadius="lg"
                                    color="textAndIcons.onControlsBrand.default"
                                >
                                    <Box as={feature.icon} boxSize={6} />
                                </Box>

                                <Heading as="h3" fontSize="xl" color="textAndIcons.onSurfaces.lead">
                                    {feature.title}
                                </Heading>

                                <Text color="textAndIcons.onSurfaces.helper" textAlign="center">
                                    {feature.description}
                                </Text>
                            </VStack>
                        </Card.Body>
                    </Card.Root>
                ))}
            </SimpleGrid>
        </Container>
    );
};

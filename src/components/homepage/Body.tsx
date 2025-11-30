'use client';

import {
    Box,
    Card,
    Container,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FaBook, FaBookmark, FaEdit, FaMobileAlt, FaSearch, FaUtensils } from 'react-icons/fa';

import { Image } from '../ui/Image';

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

    const benefits = [
        {
            icon: FaSearch,
            text: 'Quick search to find any recipe instantly',
        },
        {
            icon: FaEdit,
            text: 'Edit and customize recipes to your taste',
        },
        {
            icon: FaMobileAlt,
            text: 'Works seamlessly on all your devices',
        },
    ];

    return (
        <Container>
            <VStack gap="component" textAlign="center" mb="container">
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

            <SimpleGrid columns={{ base: 1, md: 3 }} gap="component" mb="section">
                {features.map((feature) => (
                    <Card.Root key={feature.title}>
                        <Card.Body>
                            <VStack align="center" gap="component">
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

            <Grid
                templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                gap="container"
                alignItems="center"
            >
                <GridItem>
                    <VStack align="start" gap="component">
                        <Heading
                            as="h2"
                            fontSize={{ base: '3xl', md: '4xl' }}
                            color="textAndIcons.onSurfaces.lead"
                        >
                            Beautiful & Intuitive
                        </Heading>

                        <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            color="textAndIcons.onSurfaces.helper"
                        >
                            Clean, modern design that makes managing your recipes a joy. Everything
                            you need is just a tap away.
                        </Text>

                        <Stack gap="element" w="full">
                            {benefits.map((benefit) => (
                                <Box key={benefit.text} display="flex" alignItems="center" gap={3}>
                                    <Box
                                        p={2}
                                        bg="fills.actionsBrandStrong.default"
                                        borderRadius="md"
                                        color="textAndIcons.onControlsBrand.default"
                                    >
                                        <Box as={benefit.icon} boxSize={4} />
                                    </Box>

                                    <Text color="textAndIcons.onSurfaces.lead">{benefit.text}</Text>
                                </Box>
                            ))}
                        </Stack>
                    </VStack>
                </GridItem>

                <GridItem>
                    <Box p={8} borderRadius="2xl" borderWidth="1px">
                        <Box position="relative" borderRadius="lg" overflow="hidden">
                            <Image
                                src="/images/dashboard.jpg"
                                alt="App preview"
                                fill
                                containerProps={{ h: '400px' }}
                            />
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    );
};

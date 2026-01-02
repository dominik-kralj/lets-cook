import { Box, Card, Flex, Grid, GridItem, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { FaBook, FaBookmark, FaUtensils } from 'react-icons/fa';

import { Image } from '../ui/Image';

export const Body = () => {
    return (
        <VStack gap="container" mb="section" p={8} maxW="1200px">
            <VStack gap="component" textAlign="center">
                <Heading
                    id="features-heading"
                    as="h2"
                    fontSize="h1"
                    color="textAndIcons.onSurfaces.lead"
                >
                    Everything you need
                </Heading>

                <Text fontSize="lead" color="textAndIcons.onSurfaces.helper">
                    A simple, beautiful way to organize all your favorite recipes in one place
                </Text>
            </VStack>

            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                gap="component"
                w="100%"
            >
                <Card.Root maxW="340px">
                    <Card.Body alignItems="center" gap="element">
                        <Icon boxSize={6} fill="fills.actionsBrandStrong.default">
                            <FaBookmark />
                        </Icon>

                        <Card.Title color="textAndIcons.onSurfaces.lead">
                            Save & Organize
                        </Card.Title>

                        <Card.Description textAlign="center" color="textAndIcons.onSurfaces.helper">
                            Add recipes with ease and keep them organized in your personal
                            collection
                        </Card.Description>
                    </Card.Body>
                </Card.Root>

                <Card.Root maxW="340px">
                    <Card.Body alignItems="center" gap="element">
                        <Icon boxSize={6} fill="fills.actionsBrandStrong.default">
                            <FaBook />
                        </Icon>

                        <Card.Title color="textAndIcons.onSurfaces.lead">
                            Your Collection
                        </Card.Title>

                        <Card.Description color="textAndIcons.onSurfaces.helper" textAlign="center">
                            Build your digital cookbook with unlimited recipes at your fingertips
                        </Card.Description>
                    </Card.Body>
                </Card.Root>

                <Card.Root maxW="340px">
                    <Card.Body alignItems="center" gap="element">
                        <Icon boxSize={6} fill="fills.actionsBrandStrong.default">
                            <FaUtensils />
                        </Icon>

                        <Card.Title color="textAndIcons.onSurfaces.lead">Cook with Ease</Card.Title>

                        <Card.Description color="textAndIcons.onSurfaces.helper" textAlign="center">
                            Access your recipes anytime, anywhere, and start cooking instantly
                        </Card.Description>
                    </Card.Body>
                </Card.Root>
            </Flex>

            <Grid
                templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
                gap="container"
                alignItems="center"
            >
                <GridItem>
                    <VStack align="start" gap="component">
                        <Heading as="h2" fontSize="h2" color="textAndIcons.onSurfaces.lead">
                            Beautiful & Intuitive
                        </Heading>

                        <Text fontSize="bodyLg" color="textAndIcons.onSurfaces.helper">
                            Clean, modern design that makes managing your recipes a joy. Everything
                            you need is just a tap away.
                        </Text>

                        <VStack
                            as="ul"
                            listStyle="outside"
                            pl="1.25rem"
                            gap="element"
                            align="start"
                        >
                            <Box
                                as="li"
                                _marker={{
                                    color: 'fills.actionsBrandStrong.default',
                                }}
                            >
                                <Text color="textAndIcons.onSurfaces.lead" fontSize="bodyMd">
                                    Quick search to find any recipe instantly
                                </Text>
                            </Box>

                            <Box
                                as="li"
                                _marker={{
                                    color: 'fills.actionsBrandStrong.default',
                                }}
                            >
                                <Text color="textAndIcons.onSurfaces.lead" fontSize="bodyMd">
                                    Edit and customize recipes to your taste
                                </Text>
                            </Box>

                            <Box
                                as="li"
                                _marker={{
                                    color: 'fills.actionsBrandStrong.default',
                                }}
                            >
                                <Text color="textAndIcons.onSurfaces.lead" fontSize="bodyMd">
                                    Works seamlessly on all your devices
                                </Text>
                            </Box>
                        </VStack>
                    </VStack>
                </GridItem>

                <GridItem>
                    <Box p={8} borderRadius="2xl" borderWidth="1px">
                        <Box position="relative" borderRadius="lg" overflow="hidden">
                            <Image
                                src="/images/dashboard.jpg"
                                alt="Let's Cook dashboard interface showing organized recipe cards in a modern grid layout with collection management and favorites functionality"
                                fill
                                loading="lazy"
                                containerProps={{ h: '400px' }}
                            />
                        </Box>
                    </Box>
                </GridItem>
            </Grid>
        </VStack>
    );
};

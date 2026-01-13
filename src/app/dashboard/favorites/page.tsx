'use client';

import { Box, Container, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { RiHeartFill } from 'react-icons/ri';

import Loading from '@/components/ui/Loading';
import { useFavorites } from '@/hooks/useFavorites';

import { DashboardLayout } from '../components/DashsboardLayout';
import { RecipeCard } from '../components/RecipeCard';

export default function FavoritesPage() {
    const { favorites, isLoading, mutate } = useFavorites();

    if (isLoading) return <Loading />;

    return (
        <DashboardLayout scrollable={false}>
            <Container maxW="6xl" px={{ base: 'component', md: 'section' }} h="100vh">
                <VStack align="stretch" gap="component" h="100vh">
                    <Box position="sticky" top={0} zIndex={10} bg="surfaces.default" pb="component">
                        <HStack gap="tight" align="center" mb="tight">
                            <Icon fontSize="3xl">
                                <RiHeartFill color="var(--chakra-colors-primary-40)" />
                            </Icon>
                            <Heading
                                as="h1"
                                fontSize={{ base: '2xl', md: '3xl' }}
                                color="textAndIcons.onSurfaces.lead"
                            >
                                Favorites ({favorites?.length || 0})
                            </Heading>
                        </HStack>
                        <Text color="textAndIcons.onSurfaces.helper">
                            Your favorite recipes in one place
                        </Text>
                    </Box>

                    <Box
                        flex="1"
                        overflowY="auto"
                        css={{
                            '&::-webkit-scrollbar': { display: 'none' },
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {!favorites || favorites.length === 0 ? (
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                py="section"
                                textAlign="center"
                            >
                                <Icon
                                    fontSize="6xl"
                                    color="textAndIcons.onSurfaces.subdued"
                                    mb="component"
                                >
                                    <RiHeartFill />
                                </Icon>
                                <Heading
                                    as="h3"
                                    fontSize="xl"
                                    color="textAndIcons.onSurfaces.lead"
                                    mb="tight"
                                >
                                    No favorite recipes yet
                                </Heading>
                                <Text
                                    color="textAndIcons.onSurfaces.helper"
                                    mb="component"
                                    maxW="md"
                                >
                                    Mark recipes as favorites to see them here
                                </Text>
                            </Box>
                        ) : (
                            <VStack align="stretch" gap={4} mt={1} pb={6}>
                                {favorites.map((recipe) => (
                                    <RecipeCard
                                        key={recipe.id}
                                        recipe={recipe}
                                        onRecipeDelete={mutate}
                                        onRecipeEdit={mutate}
                                    />
                                ))}
                            </VStack>
                        )}
                    </Box>
                </VStack>
            </Container>
        </DashboardLayout>
    );
}

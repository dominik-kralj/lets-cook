'use client';

import { Box, Container, Heading, HStack, Icon, Input, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { RiRestaurantLine, RiSearchLine } from 'react-icons/ri';

import Loading from '@/components/ui/Loading';
import { useProfile } from '@/hooks/useProfile';
import { useRecipes } from '@/hooks/useRecipes';
import { Recipe } from '@/types/recipe';

import { logoutAction } from '../auth/actions';
import { AddRecipeDialog } from './components/AddRecipeDialog';
import { DashboardLayout } from './components/DashsboardLayout';
import { RecipeCard } from './components/RecipeCard';

export default function RecipesPage() {
    const { profile, isLoading: isProfileLoading, isError } = useProfile();
    const { recipes, isLoading: isRecipesLoading, mutate } = useRecipes();

    const [searchQuery, setSearchQuery] = useState('');

    if (isProfileLoading || isRecipesLoading) return <Loading />;

    if (isError || !profile) {
        logoutAction();
        return null;
    }

    const filteredRecipes =
        recipes?.filter((recipe: Recipe) =>
            recipe.title.toLowerCase().includes(searchQuery.toLowerCase()),
        ) ?? [];

    return (
        <DashboardLayout scrollable={false}>
            <Container maxW="6xl" px={{ base: 'component', md: 'section' }} h="100vh">
                <VStack align="stretch" gap="component" h="100vh">
                    <Box position="sticky" top={0} zIndex={10} bg="surfaces.default" pb="component">
                        <HStack
                            justify="space-between"
                            align={{ base: 'stretch', md: 'start' }}
                            flexDir={{ base: 'column', md: 'row' }}
                            gap="component"
                        >
                            <Box>
                                <Heading
                                    as="h1"
                                    fontSize={{ base: '2xl', md: '3xl' }}
                                    color="textAndIcons.onSurfaces.lead"
                                    mb="tight"
                                >
                                    Recipe Collection
                                </Heading>
                                <Text color="textAndIcons.onSurfaces.helper">
                                    Search through your saved recipes
                                </Text>
                            </Box>

                            <Box
                                w={{ base: 'full', md: 'auto' }}
                                display="flex"
                                justifyContent="center"
                            >
                                <AddRecipeDialog onRecipeAdd={mutate} />
                            </Box>
                        </HStack>

                        <HStack gap="element" position="relative" mt={4}>
                            <Icon
                                position="absolute"
                                left={3}
                                color="textAndIcons.onSurfaces.helper"
                                zIndex={1}
                            >
                                <RiSearchLine />
                            </Icon>
                            <Input
                                placeholder="Search recipes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                pl={10}
                                variant="outline"
                            />
                        </HStack>
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
                        {filteredRecipes.length === 0 ? (
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
                                    <RiRestaurantLine />
                                </Icon>
                                <Heading
                                    as="h3"
                                    fontSize="xl"
                                    color="textAndIcons.onSurfaces.lead"
                                    mb="tight"
                                >
                                    No recipes yet
                                </Heading>
                                <Text
                                    color="textAndIcons.onSurfaces.helper"
                                    mb="component"
                                    maxW="md"
                                >
                                    Start building your recipe collection by adding your first
                                    recipe
                                </Text>
                            </Box>
                        ) : (
                            <VStack align="stretch" gap={4} mt={1} pb={6}>
                                {filteredRecipes.map((recipe: Recipe) => (
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

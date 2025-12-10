'use client';

import {
    Box,
    Container,
    Heading,
    HStack,
    Icon,
    Input,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiRestaurantLine, RiSearchLine } from 'react-icons/ri';

import { logoutAction } from '@/app/auth/actions';
import { useProfile } from '@/hooks/useProfile';

import { AddRecipeDialog } from './components/AddRecipeDialog';
import { DashboardLayout } from './components/DashsboardLayout';

export default function RecipesPage() {
    const { profile, isLoading, isError } = useProfile();
    const [searchQuery, setSearchQuery] = useState('');

    // TODO: Replace with real recipes data
    const recipes: any[] = [];

    if (isLoading) {
        return (
            <DashboardLayout>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    h="calc(100vh - 200px)"
                >
                    <Spinner />
                </Box>
            </DashboardLayout>
        );
    }

    if (isError || !profile) {
        logoutAction();
        return null;
    }

    return (
        <DashboardLayout>
            <Container maxW="6xl" px={{ base: 'component', md: 'section' }}>
                <VStack align="stretch" gap="component">
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
                            <AddRecipeDialog />
                        </Box>
                    </HStack>

                    <HStack gap="element" position="relative">
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

                    {recipes.length === 0 && (
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
                            <Text color="textAndIcons.onSurfaces.helper" mb="component" maxW="md">
                                Start building your recipe collection by adding your first recipe
                            </Text>
                        </Box>
                    )}
                </VStack>
            </Container>
        </DashboardLayout>
    );
}

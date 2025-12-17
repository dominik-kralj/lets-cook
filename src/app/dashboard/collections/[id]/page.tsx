'use client';

import { Box, Button, Container, Heading, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { RiArrowLeftLine } from 'react-icons/ri';
import useSWR, { KeyedMutator } from 'swr';

import { Collection } from '@/types/collection';
import { Recipe } from '@/types/recipe';

import { RecipeCard } from '../../components/RecipeCard';
import { DashboardLayout } from '../../components/DashsboardLayout';

const fetchCollection = async (collectionId: string): Promise<Collection> => {
    const response = await fetch(`/api/collections/${collectionId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch collection');
    }
    return response.json();
};

export default function CollectionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const collectionId = params.id as string;

    const { data: collection, mutate, isLoading } = useSWR<Collection>(
        collectionId ? ['collection', collectionId] : null,
        () => fetchCollection(collectionId),
    );

    const handleBack = () => {
        router.push('/dashboard/collections');
    };

    // Create a wrapper mutator that refetches the collection when recipes change
    const createRecipeMutator = (): KeyedMutator<Recipe[]> => {
        return (async () => {
            await mutate();
            return collection?.recipes || [];
        }) as KeyedMutator<Recipe[]>;
    };

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

    return (
        <DashboardLayout>
            <Container maxW="6xl" px={{ base: 'component', md: 'section' }}>
                <VStack align="stretch" gap="component">
                    <Box>
                        <Button
                            variant="ghost"
                            size="sm"
                            mb="element"
                            onClick={handleBack}
                            colorPalette="gray"
                        >
                            <Icon>
                                <RiArrowLeftLine />
                            </Icon>
                            Back to Collections
                        </Button>
                        {collection && (
                            <>
                                <Heading
                                    as="h1"
                                    fontSize={{ base: '2xl', md: '3xl' }}
                                    color="textAndIcons.onSurfaces.lead"
                                    mb="tight"
                                >
                                    {collection.name}
                                </Heading>
                                {collection.description && (
                                    <Text color="textAndIcons.onSurfaces.helper">
                                        {collection.description}
                                    </Text>
                                )}
                            </>
                        )}
                    </Box>

                    {collection && collection.recipes && collection.recipes.length > 0 ? (
                        <VStack align="stretch" gap={4}>
                            {collection.recipes.map((recipe) => (
                                <RecipeCard
                                    key={recipe.id}
                                    recipe={recipe}
                                    onRecipeDelete={createRecipeMutator()}
                                    onRecipeEdit={createRecipeMutator()}
                                />
                            ))}
                        </VStack>
                    ) : (
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            py="section"
                            textAlign="center"
                        >
                            <Text color="textAndIcons.onSurfaces.helper">
                                No recipes in this collection yet.
                            </Text>
                        </Box>
                    )}
                </VStack>
            </Container>
        </DashboardLayout>
    );
}

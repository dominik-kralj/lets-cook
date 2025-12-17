'use client';

import { Box, Button, Flex, Grid, Heading, Icon, Text, VStack } from '@chakra-ui/react';
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

    return (
        <DashboardLayout>
            <VStack align="stretch" gap="component">
                <Flex justify="space-between" align="start" gap="component">
                    <Box flex="1">
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
                                    fontSize="3xl"
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
                </Flex>

                {isLoading ? (
                    <Box
                        p={6}
                        bg="fills.surfaces.cardElevated"
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="outlines.withControlsNeutral.default"
                    >
                        <Text color="textAndIcons.onSurfaces.helper" textAlign="center">
                            Loading collection...
                        </Text>
                    </Box>
                ) : collection && collection.recipes && collection.recipes.length > 0 ? (
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            lg: 'repeat(2, 1fr)',
                        }}
                        gap="component"
                    >
                        {collection.recipes.map((recipe) => (
                            <RecipeCard
                                key={recipe.id}
                                recipe={recipe}
                                onRecipeDelete={createRecipeMutator()}
                                onRecipeEdit={createRecipeMutator()}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Box
                        p={6}
                        bg="fills.surfaces.cardElevated"
                        borderRadius="xl"
                        borderWidth="1px"
                        borderColor="outlines.withControlsNeutral.default"
                    >
                        <Text color="textAndIcons.onSurfaces.helper" textAlign="center">
                            No recipes in this collection yet.
                        </Text>
                    </Box>
                )}
            </VStack>
        </DashboardLayout>
    );
}

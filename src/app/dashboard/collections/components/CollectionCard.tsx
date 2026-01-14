'use client';

import { Box, Flex, Grid, Icon, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { RiFolder2Line } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { Collection } from '@/types/collection';

import { DeleteCollectionDialog } from './DeleteCollectionDialog';
import { EditCollectionDialog } from './EditCollectionDialog';

interface CollectionCardProps {
    collection: Collection;
    onCollectionDelete: KeyedMutator<Collection[]>;
    onCollectionEdit: KeyedMutator<Collection[]>;
}

export function CollectionCard({
    collection,
    onCollectionDelete,
    onCollectionEdit,
}: CollectionCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/dashboard/collections/${collection.id}`);
    };

    const recipeImages = collection.recipes?.slice(0, 2) || [];
    const hasRecipes = recipeImages.length > 0;

    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            position="relative"
            bg="surfaces.default"
            h="280px"
            display="flex"
            flexDirection="column"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
            }}
            onClick={handleCardClick}
        >
            <Flex
                position="absolute"
                top={2}
                right={2}
                zIndex={1}
                gap="tight"
                onClick={(e) => e.stopPropagation()}
            >
                <EditCollectionDialog collection={collection} onCollectionEdit={onCollectionEdit} />

                <DeleteCollectionDialog
                    collectionName={collection.name}
                    collectionId={collection.id}
                    onCollectionDelete={onCollectionDelete}
                />
            </Flex>

            {hasRecipes ? (
                <Grid
                    templateColumns={recipeImages.length === 1 ? '1fr' : '1fr 1fr'}
                    gap={0}
                    h="180px"
                    w="100%"
                    bg="fills.surfaces.default"
                >
                    {recipeImages.map((recipe, index) => (
                        <Image
                            key={index}
                            src={
                                recipe.imageUrl && recipe.imageUrl.trim() !== ''
                                    ? recipe.imageUrl
                                    : 'images/recipe-placeholder.jpg'
                            }
                            alt={recipe.title || 'Recipe'}
                            objectFit="cover"
                            w="100%"
                            h="100%"
                        />
                    ))}
                </Grid>
            ) : (
                <Flex
                    h="180px"
                    w="100%"
                    bg="fills.surfaces.soft"
                    align="center"
                    justify="center"
                    direction="column"
                    gap={2}
                >
                    <Icon fontSize="4xl" color="textAndIcons.onSurfaces.subdued">
                        <RiFolder2Line />
                    </Icon>
                    <Text fontSize="sm" color="textAndIcons.onSurfaces.subdued">
                        No recipes yet
                    </Text>
                </Flex>
            )}

            <Box p={4} flex="1" display="flex" flexDirection="column" gap={1}>
                <Text fontWeight="bold" fontSize="lg" color="textAndIcons.onSurfaces.lead">
                    {collection.name}
                </Text>
                {collection.description && (
                    <Text
                        fontSize="sm"
                        color="textAndIcons.onSurfaces.helper"
                        lineClamp="2"
                        flex="1"
                    >
                        {collection.description}
                    </Text>
                )}
                <Text fontSize="sm" color="textAndIcons.onSurfaces.helper" mt="auto">
                    {collection.recipeCount || 0}{' '}
                    {collection.recipeCount === 1 ? 'recipe' : 'recipes'}
                </Text>
            </Box>
        </Box>
    );
}

import { Box, Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { RiHeartFill, RiHeartLine, RiTimeLine } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { toggleFavoriteAction } from '@/app/dashboard/actions';
import { toaster } from '@/components/chakra-ui/toaster';
import { Tooltip } from '@/components/chakra-ui/tooltip';
import { Recipe } from '@/types/recipe';

import { DeleteRecipeDialog } from './DeleteRecipeDialog';
import { EditRecipeDialog } from './EditRecipeDialog';

interface RecipeCardProps {
    recipe: Recipe;
    onRecipeDelete: KeyedMutator<Recipe[]>;
    onRecipeEdit: KeyedMutator<Recipe[]>;
}

export function RecipeCard({ recipe, onRecipeDelete, onRecipeEdit }: RecipeCardProps) {
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsTogglingFavorite(true);

        const result = await toggleFavoriteAction(recipe.id);

        if (!result.success) {
            toaster.create({
                title: 'Error',
                description: result.error || 'Failed to update favorite status',
                type: 'error',
            });
            setIsTogglingFavorite(false);
            return;
        }

        await onRecipeEdit();
        setIsTogglingFavorite(false);
    };

    return (
        <EditRecipeDialog recipe={recipe} onRecipeEdit={onRecipeEdit}>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                position="relative"
                bg="surfaces.default"
                h={{ base: '340px', md: '200px' }}
                display="flex"
                flexDirection={{ base: 'column', md: 'row' }}
                cursor="pointer"
                transition="all 0.2s"
                _hover={{
                    transform: 'translateY(-2px)',
                }}
            >
                <Flex
                    position="absolute"
                    top={2}
                    right={2}
                    zIndex={1}
                    gap="tight"
                    onClick={(e) => e.stopPropagation()}
                >
                    <DeleteRecipeDialog
                        recipeTitle={recipe.title}
                        recipeId={recipe.id}
                        onRecipeDelete={onRecipeDelete}
                    />
                    <IconButton
                        aria-label={
                            recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'
                        }
                        variant="subtle"
                        size="xs"
                        rounded="full"
                        colorPalette="red"
                        onClick={handleToggleFavorite}
                        loading={isTogglingFavorite}
                        disabled={isTogglingFavorite}
                    >
                        {recipe.isFavorite ? <RiHeartFill /> : <RiHeartLine />}
                    </IconButton>
                </Flex>
                <Image
                    src={
                        recipe.imageUrl && recipe.imageUrl.trim() !== ''
                            ? recipe.imageUrl
                            : 'images/recipe-placeholder.jpg'
                    }
                    alt={recipe.title}
                    objectFit="cover"
                    w={{ base: '100%', md: '250px' }}
                    h={{ base: '180px', md: '100%' }}
                    flexShrink={0}
                    bg="fills.surfaces.default"
                />
                <Box p={4} pr={{ base: 16, md: 4 }} flex="1" display="flex" flexDirection="column" gap={1}>
                    <Text fontWeight="bold" fontSize="lg" color="textAndIcons.onSurfaces.lead" lineClamp={{ base: 2, md: 1 }}>
                        {recipe.title}
                    </Text>
                    {recipe.description && (
                        <Tooltip
                            content={recipe.description}
                            showArrow
                            contentProps={{ css: { '--tooltip-bg': '#FB923C' } }}
                        >
                            <Text
                                fontSize="sm"
                                color="textAndIcons.onSurfaces.helper"
                                lineClamp="2"
                                cursor="pointer"
                                w="max-content"
                            >
                                {recipe.description}
                            </Text>
                        </Tooltip>
                    )}
                    <Flex
                        align="center"
                        mt="auto"
                        color="textAndIcons.onSurfaces.helper"
                        fontSize="sm"
                    >
                        <Icon as={RiTimeLine} mr={1} />
                        {recipe.cookTime} min
                    </Flex>
                </Box>
            </Box>
        </EditRecipeDialog>
    );
}

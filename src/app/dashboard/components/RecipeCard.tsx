import { Box, Flex, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { RiHeartLine, RiTimeLine } from 'react-icons/ri';

import { Tooltip } from '@/components/chakra-ui/tooltip';
import { Recipe } from '@/types/recipe';

interface RecipeCardProps {
    recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            position="relative"
            bg="surfaces.default"
            minH="340px"
            h="340px"
            display="flex"
            flexDirection="column"
        >
            <Flex position="absolute" top={2} right={2} zIndex={1}>
                <IconButton
                    aria-label="Add to favorites"
                    size="sm"
                    variant="ghost"
                    color="textAndIcons.onSurfaces.lead"
                >
                    <RiHeartLine />
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
                w="100%"
                h="180px"
                bg="fills.surfaces.default"
            />
            <Box p={4} flex="1" display="flex" flexDirection="column" gap={1}>
                <Text fontWeight="bold" fontSize="lg" color="textAndIcons.onSurfaces.lead">
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
                <Flex align="center" mt="auto" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                    <Icon as={RiTimeLine} mr={1} />
                    {recipe.cookTime} min
                </Flex>
            </Box>
        </Box>
    );
}

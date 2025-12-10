'use client';

import {
    Box,
    Button,
    DialogActionTrigger,
    DialogBackdrop,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    Field,
    HStack,
    Icon,
    IconButton,
    Image,
    Input,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { RiAddLine, RiCloseLine, RiImageAddLine } from 'react-icons/ri';

interface RecipeDialogProps {
    isOpen: boolean;
    onClose: () => void;
    recipeId?: string | null;
}

export function EditRecipeDialog({ isOpen, onClose, recipeId }: RecipeDialogProps) {
    const [imageUrl, setImageUrl] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);

    const isEditMode = !!recipeId;

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleRemoveInstruction = (index: number) => {
        setInstructions(instructions.filter((_, i) => i !== index));
    };

    return (
        <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="lg">
            <DialogBackdrop />
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditMode ? 'Edit Recipe' : 'Create New Recipe'}</DialogTitle>
                    <DialogCloseTrigger />
                </DialogHeader>

                <DialogBody>
                    <VStack align="stretch" gap="component">
                        {/* Recipe Image */}
                        <Field.Root>
                            <Field.Label>Recipe Image</Field.Label>
                            <VStack gap="element">
                                {imageUrl ? (
                                    <Box position="relative" w="full">
                                        <Image
                                            src={imageUrl}
                                            alt="Recipe preview"
                                            aspectRatio="16/9"
                                            objectFit="cover"
                                            borderRadius="md"
                                        />
                                        <IconButton
                                            position="absolute"
                                            top={2}
                                            right={2}
                                            size="sm"
                                            variant="subtle"
                                            bg="fills.surfaces.cardDefault"
                                            onClick={() => setImageUrl('')}
                                        >
                                            <Icon>
                                                <RiCloseLine />
                                            </Icon>
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box
                                        aspectRatio="16/9"
                                        borderWidth="2px"
                                        borderStyle="dashed"
                                        borderColor="outlines.withControlsNeutral.default"
                                        borderRadius="md"
                                        display="flex"
                                        flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center"
                                        gap="element"
                                        p="component"
                                        cursor="pointer"
                                        _hover={{
                                            borderColor: 'fills.actionsBrandStrong.default',
                                        }}
                                    >
                                        <Icon fontSize="4xl" color="textAndIcons.onSurfaces.helper">
                                            <RiImageAddLine />
                                        </Icon>
                                        <VStack gap="0">
                                            <Text
                                                fontSize="sm"
                                                color="textAndIcons.onSurfaces.helper"
                                            >
                                                Click to upload or drag and drop
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                color="textAndIcons.onSurfaces.subdued"
                                            >
                                                PNG, JPG up to 10MB
                                            </Text>
                                        </VStack>
                                    </Box>
                                )}
                                <Input
                                    placeholder="Or paste image URL..."
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    size="sm"
                                />
                            </VStack>
                        </Field.Root>

                        {/* Recipe Title */}
                        <Field.Root required>
                            <Field.Label>Recipe Title</Field.Label>
                            <Input placeholder="e.g., Homemade Pasta" />
                        </Field.Root>

                        {/* Cook Time */}
                        <Field.Root>
                            <Field.Label>Cook Time</Field.Label>
                            <Input type="number" placeholder="e.g., 45 min" />
                        </Field.Root>

                        {/* Description */}
                        <Field.Root>
                            <Field.Label>Description</Field.Label>
                            <Textarea
                                placeholder="A brief description of your recipe..."
                                rows={3}
                            />
                        </Field.Root>

                        {/* Ingredients */}
                        <Field.Root>
                            <Field.Label>Ingredients</Field.Label>
                            <VStack align="stretch" gap="element">
                                {ingredients.map((ingredient, index) => (
                                    <HStack key={index} gap="element">
                                        <Input
                                            placeholder={`Ingredient ${index + 1}`}
                                            value={ingredient}
                                            onChange={(e) => {
                                                const newIngredients = [...ingredients];
                                                newIngredients[index] = e.target.value;
                                                setIngredients(newIngredients);
                                            }}
                                        />
                                        {ingredients.length > 1 && (
                                            <IconButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveIngredient(index)}
                                            >
                                                <Icon>
                                                    <RiCloseLine />
                                                </Icon>
                                            </IconButton>
                                        )}
                                    </HStack>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddIngredient}
                                    alignSelf="start"
                                >
                                    <Icon>
                                        <RiAddLine />
                                    </Icon>
                                    Add Ingredient
                                </Button>
                            </VStack>
                        </Field.Root>

                        {/* Instructions */}
                        <Field.Root>
                            <Field.Label>Instructions</Field.Label>
                            <VStack align="stretch" gap="element">
                                {instructions.map((instruction, index) => (
                                    <HStack key={index} gap="element" align="start">
                                        <Box
                                            minW="8"
                                            h="8"
                                            borderRadius="md"
                                            bg="fills.actionsBrandStrong.default"
                                            color="textAndIcons.onControlsBrand.default"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontWeight="bold"
                                            fontSize="sm"
                                            flexShrink={0}
                                        >
                                            {index + 1}
                                        </Box>
                                        <Textarea
                                            placeholder={`Step ${index + 1}`}
                                            value={instruction}
                                            onChange={(e) => {
                                                const newInstructions = [...instructions];
                                                newInstructions[index] = e.target.value;
                                                setInstructions(newInstructions);
                                            }}
                                            rows={2}
                                        />
                                        {instructions.length > 1 && (
                                            <IconButton
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveInstruction(index)}
                                            >
                                                <Icon>
                                                    <RiCloseLine />
                                                </Icon>
                                            </IconButton>
                                        )}
                                    </HStack>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddInstruction}
                                    alignSelf="start"
                                >
                                    <Icon>
                                        <RiAddLine />
                                    </Icon>
                                    Add Step
                                </Button>
                            </VStack>
                        </Field.Root>
                    </VStack>
                </DialogBody>

                <DialogFooter>
                    <DialogActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button>{isEditMode ? 'Save Changes' : 'Create Recipe'}</Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
}

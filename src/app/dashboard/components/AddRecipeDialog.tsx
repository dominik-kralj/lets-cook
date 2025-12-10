'use client';

import {
    Button,
    CloseButton,
    Dialog,
    Field,
    FileUpload,
    HStack,
    Icon,
    IconButton,
    Input,
    Portal,
    Tabs,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
    RiAddLine,
    RiDeleteBin6Line,
    RiFileListLine,
    RiImageAddLine,
    RiInformationLine,
    RiRestaurantLine,
} from 'react-icons/ri';

export function AddRecipeDialog() {
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = (index: number) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    };

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, '']);
    };

    const handleRemoveInstruction = (index: number) => {
        if (instructions.length > 1) {
            setInstructions(instructions.filter((_, i) => i !== index));
        }
    };

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };

    return (
        <Dialog.Root placement="center" size="lg">
            <Dialog.Trigger asChild>
                <Button size={{ base: 'sm', md: 'md' }}>
                    <Icon>
                        <RiAddLine />
                    </Icon>
                    Add Recipe
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner px={{ base: 'element', md: 0 }}>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <Dialog.Header>
                            <Dialog.Title>Add New Recipe</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Tabs.Root
                                defaultValue="details"
                                fitted
                                size="sm"
                                css={{
                                    '--tabs-indicator-color': 'transparent',
                                }}
                            >
                                <Tabs.List mb="component">
                                    <Tabs.Trigger value="details">
                                        <Icon fontSize={{ base: 'sm', md: 'md' }}>
                                            <RiInformationLine />
                                        </Icon>
                                        <Text display={{ base: 'none', sm: 'block' }}>Details</Text>
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="ingredients">
                                        <Icon fontSize={{ base: 'sm', md: 'md' }}>
                                            <RiRestaurantLine />
                                        </Icon>
                                        <Text display={{ base: 'none', sm: 'block' }}>
                                            Ingredients
                                        </Text>
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="instructions">
                                        <Icon fontSize={{ base: 'sm', md: 'md' }}>
                                            <RiFileListLine />
                                        </Icon>
                                        <Text display={{ base: 'none', sm: 'block' }}>
                                            Instructions
                                        </Text>
                                    </Tabs.Trigger>
                                </Tabs.List>

                                <Tabs.Content value="details">
                                    <VStack align="stretch" gap="component">
                                        <Field.Root>
                                            <Field.Label>Recipe Image</Field.Label>
                                            <FileUpload.Root maxFiles={1} accept="image/*">
                                                <FileUpload.HiddenInput />
                                                <FileUpload.Dropzone w="full" cursor="pointer">
                                                    <Icon
                                                        fontSize="4xl"
                                                        color="textAndIcons.onSurfaces.helper"
                                                    >
                                                        <RiImageAddLine />
                                                    </Icon>
                                                    <FileUpload.DropzoneContent>
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
                                                    </FileUpload.DropzoneContent>
                                                </FileUpload.Dropzone>
                                                <FileUpload.List clearable showSize />
                                            </FileUpload.Root>
                                        </Field.Root>

                                        <Field.Root required>
                                            <Field.Label>Recipe Title</Field.Label>
                                            <Input placeholder="e.g., Homemade Pasta" />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Cook Time (minutes)</Field.Label>
                                            <Input type="number" placeholder="e.g., 45" />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label>Description</Field.Label>
                                            <Input placeholder="A brief description of your recipe..." />
                                        </Field.Root>
                                    </VStack>
                                </Tabs.Content>

                                <Tabs.Content value="ingredients">
                                    <VStack align="stretch" gap="element">
                                        {ingredients.map((ingredient, index) => (
                                            <HStack key={index} gap="element">
                                                <Input
                                                    placeholder={`Ingredient ${index + 1}`}
                                                    value={ingredient}
                                                    onChange={(e) =>
                                                        handleIngredientChange(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    size="sm"
                                                />
                                                {ingredients.length > 1 && (
                                                    <IconButton
                                                        variant="ghost"
                                                        size="sm"
                                                        colorPalette="red"
                                                        onClick={() =>
                                                            handleRemoveIngredient(index)
                                                        }
                                                        aria-label="Remove ingredient"
                                                    >
                                                        <Icon>
                                                            <RiDeleteBin6Line />
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
                                </Tabs.Content>

                                <Tabs.Content value="instructions">
                                    <VStack align="stretch" gap="element">
                                        {instructions.map((instruction, index) => (
                                            <HStack key={index} gap="element" align="center">
                                                <Text
                                                    minW="8"
                                                    h="8"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    borderRadius="md"
                                                    bg="fills.actionsBrandStrong.default"
                                                    color="textAndIcons.onControlsBrand.default"
                                                    fontWeight="bold"
                                                    fontSize="sm"
                                                    flexShrink={0}
                                                >
                                                    {index + 1}
                                                </Text>
                                                <Input
                                                    placeholder={`Step ${index + 1}`}
                                                    value={instruction}
                                                    onChange={(e) =>
                                                        handleInstructionChange(
                                                            index,
                                                            e.target.value,
                                                        )
                                                    }
                                                    size="sm"
                                                />
                                                {instructions.length > 1 && (
                                                    <IconButton
                                                        variant="ghost"
                                                        size="sm"
                                                        colorPalette="red"
                                                        onClick={() =>
                                                            handleRemoveInstruction(index)
                                                        }
                                                        aria-label="Remove instruction"
                                                    >
                                                        <Icon>
                                                            <RiDeleteBin6Line />
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
                                </Tabs.Content>
                            </Tabs.Root>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button>Create Recipe</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

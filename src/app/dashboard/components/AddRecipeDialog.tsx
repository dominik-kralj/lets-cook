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
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
    RiAddLine,
    RiDeleteBin6Line,
    RiFileListLine,
    RiImageAddLine,
    RiInformationLine,
    RiRestaurantLine,
} from 'react-icons/ri';

import { createRecipeAction, uploadRecipeImage } from '@/app/dashboard/actions';
import { toaster } from '@/components/chakra-ui/toaster';
import { useRecipes } from '@/hooks/useRecipes';
import { defaultRecipeValues, RecipeFormData, recipeSchema } from '@/models/recipe';
import { validateImageFile } from '@/utils/helper';

export function AddRecipeDialog() {
    const { mutate } = useRecipes();

    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
    } = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        defaultValues: defaultRecipeValues,
        mode: 'onChange',
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const {
        fields: instructionFields,
        append: appendInstruction,
        remove: removeInstruction,
    } = useFieldArray({
        control,
        name: 'instructions',
    });

    const handleFileChange = (details: { acceptedFiles: File[] }) => {
        const file = details.acceptedFiles[0];
        if (!file) return;

        const validation = validateImageFile(file);

        if (!validation.valid) {
            toaster.create({
                title: 'Invalid file',
                description: validation.error,
                type: 'error',
            });
            return;
        }

        setImageFile(file);
    };

    const onSubmit = async (data: RecipeFormData) => {
        try {
            const { title, cookTime, ingredients, instructions, description, imageUrl } = data;

            let imgUrl = imageUrl;

            if (imageFile) {
                const uploadedUrl = await uploadRecipeImage(imageFile);

                if (!uploadedUrl) {
                    toaster.create({
                        title: 'Failed to upload image',
                        description: 'Please try again',
                        type: 'error',
                    });
                    return;
                }

                imgUrl = uploadedUrl;
            }

            const payload = {
                title: title,
                cookTime: cookTime,
                ingredients: ingredients,
                instructions: instructions,
                description: description?.trim() ? description : undefined,
                imageUrl: imgUrl?.trim() ? imgUrl : undefined,
            };

            const response = await createRecipeAction(payload);

            if (response.error) {
                toaster.create({
                    title: 'Error',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Success',
                description: 'Recipe created successfully!',
                type: 'success',
            });

            reset();
            setImageFile(null);
            setOpen(false);
            await mutate();
        } catch (error) {
            console.error('Error creating recipe:', error);

            toaster.create({
                title: 'Something went wrong',
                description: 'Please try again later.',
                type: 'error',
            });
        }
    };

    const handleOpenChange = (details: { open: boolean }) => {
        setOpen(details.open);

        if (!details.open) {
            reset();
            setImageFile(null);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="lg">
            <Dialog.Trigger asChild>
                <Button size={{ base: 'sm', md: 'md' }} w="full">
                    <RiAddLine />
                    Add Recipe
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner px={{ base: 'element', md: 0 }}>
                    <Dialog.Content minH="500px">
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <Dialog.Header>
                            <Dialog.Title>Add New Recipe</Dialog.Title>
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog.Body>
                                <Tabs.Root defaultValue="details" fitted>
                                    <Tabs.List mb="component">
                                        <Tabs.Trigger value="details">
                                            <Icon fontSize={{ base: 'sm', md: 'md' }}>
                                                <RiInformationLine />
                                            </Icon>
                                            <Text display={{ base: 'none', sm: 'block' }}>
                                                Details
                                            </Text>
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
                                            <Field.Root invalid={!!errors.imageUrl}>
                                                <Field.Label>Recipe Image</Field.Label>
                                                <FileUpload.Root
                                                    maxFiles={1}
                                                    accept="image/*"
                                                    onFileChange={handleFileChange}
                                                >
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
                                                </FileUpload.Root>
                                                {imageFile && (
                                                    <Text fontSize="sm" color="green.600">
                                                        ✓ {imageFile.name}
                                                    </Text>
                                                )}
                                                {errors.imageUrl && (
                                                    <Field.ErrorText>
                                                        {errors.imageUrl.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>

                                            <Field.Root required invalid={!!errors.title}>
                                                <Field.Label>Recipe Title</Field.Label>
                                                <Input
                                                    {...register('title')}
                                                    placeholder="e.g., Homemade Pasta"
                                                />
                                                {errors.title && (
                                                    <Field.ErrorText>
                                                        {errors.title.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>

                                            <Field.Root required invalid={!!errors.cookTime}>
                                                <Field.Label>Cook Time (minutes)</Field.Label>
                                                <Input
                                                    {...register('cookTime')}
                                                    type="number"
                                                    placeholder="e.g., 45"
                                                />
                                                {errors.cookTime && (
                                                    <Field.ErrorText>
                                                        {errors.cookTime.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>

                                            <Field.Root invalid={!!errors.description}>
                                                <Field.Label>Description</Field.Label>
                                                <Textarea
                                                    {...register('description')}
                                                    placeholder="A brief description of your recipe..."
                                                    minH="100px"
                                                />
                                                {errors.description && (
                                                    <Field.ErrorText>
                                                        {errors.description.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>
                                        </VStack>
                                    </Tabs.Content>

                                    <Tabs.Content value="ingredients">
                                        <VStack align="stretch" gap="element">
                                            <Text fontSize="sm" color="gray.500" mb={2}>
                                                Add all the ingredients needed for your recipe.
                                            </Text>
                                            {ingredientFields.map((field, index) => (
                                                <Field.Root
                                                    key={field.id}
                                                    required
                                                    invalid={!!errors.ingredients?.[index]?.value}
                                                >
                                                    <HStack gap="element" align="center" w="100%">
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
                                                            {...register(
                                                                `ingredients.${index}.value` as const,
                                                            )}
                                                            placeholder="e.g., 2 cups flour"
                                                            size="sm"
                                                            flex={1}
                                                        />
                                                        {ingredientFields.length > 1 && (
                                                            <IconButton
                                                                variant="ghost"
                                                                size="sm"
                                                                colorPalette="red"
                                                                onClick={() =>
                                                                    removeIngredient(index)
                                                                }
                                                                aria-label="Remove ingredient"
                                                            >
                                                                <Icon>
                                                                    <RiDeleteBin6Line />
                                                                </Icon>
                                                            </IconButton>
                                                        )}
                                                    </HStack>
                                                    {errors.ingredients?.[index]?.value && (
                                                        <Field.ErrorText>
                                                            {
                                                                errors.ingredients[index]?.value
                                                                    ?.message
                                                            }
                                                        </Field.ErrorText>
                                                    )}
                                                </Field.Root>
                                            ))}
                                            <Button
                                                variant="outline"
                                                size="md"
                                                w="full"
                                                onClick={() => appendIngredient({ value: '' })}
                                            >
                                                <RiAddLine />
                                                Add Ingredient
                                            </Button>
                                        </VStack>
                                    </Tabs.Content>

                                    <Tabs.Content value="instructions">
                                        <VStack align="stretch" gap="element">
                                            <Text fontSize="sm" color="gray.500" mb={2}>
                                                Add all the steps needed for your recipe.
                                            </Text>
                                            {instructionFields.map((field, index) => (
                                                <Field.Root
                                                    key={field.id}
                                                    required
                                                    invalid={!!errors.instructions?.[index]?.value}
                                                >
                                                    <HStack gap="element" align="center" w="100%">
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
                                                            {...register(
                                                                `instructions.${index}.value` as const,
                                                            )}
                                                            placeholder={`e.g., Mix all ingredients`}
                                                            size="sm"
                                                            flex={1}
                                                        />
                                                        {instructionFields.length > 1 && (
                                                            <IconButton
                                                                variant="ghost"
                                                                size="sm"
                                                                colorPalette="red"
                                                                onClick={() =>
                                                                    removeInstruction(index)
                                                                }
                                                                aria-label="Remove instruction"
                                                            >
                                                                <Icon>
                                                                    <RiDeleteBin6Line />
                                                                </Icon>
                                                            </IconButton>
                                                        )}
                                                    </HStack>
                                                    {errors.instructions?.[index]?.value && (
                                                        <Field.ErrorText>
                                                            {
                                                                errors.instructions[index]?.value
                                                                    ?.message
                                                            }
                                                        </Field.ErrorText>
                                                    )}
                                                </Field.Root>
                                            ))}
                                            <Button
                                                variant="outline"
                                                size="md"
                                                w="full"
                                                onClick={() => appendInstruction({ value: '' })}
                                            >
                                                <RiAddLine />
                                                Add Step
                                            </Button>
                                        </VStack>
                                    </Tabs.Content>
                                </Tabs.Root>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline" type="button">
                                        Cancel
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button type="submit" loading={isSubmitting} disabled={!isValid}>
                                    Create Recipe
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

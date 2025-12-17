'use client';

import {
    Button,
    Checkbox,
    CheckboxGroup,
    CloseButton,
    Dialog,
    Field,
    FileUpload,
    HStack,
    Icon,
    IconButton,
    Input,
    Portal,
    Stack,
    Tabs,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import {
    RiAddLine,
    RiDeleteBin6Line,
    RiFileListLine,
    RiImageAddLine,
    RiInformationLine,
    RiRestaurantLine,
} from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { updateRecipeAction, uploadRecipeImage } from '@/app/dashboard/actions';
import { toaster } from '@/components/chakra-ui/toaster';
import { useCollections } from '@/hooks/useCollections';
import { useRecipeCollections } from '@/hooks/useRecipeCollections';
import { RecipeFormData, recipeSchema } from '@/models/recipe';
import { Recipe } from '@/types/recipe';
import { validateImageFile } from '@/utils/helper';

interface EditRecipeDialogProps {
    recipe: Recipe;
    onRecipeEdit: KeyedMutator<Recipe[]>;
    children?: React.ReactNode;
}

export function EditRecipeDialog({ recipe, onRecipeEdit, children }: EditRecipeDialogProps) {
    const [open, setOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [fileUploadKey, setFileUploadKey] = useState(0);
    const { collections } = useCollections();
    const { collectionIds: recipeCollectionIds } = useRecipeCollections(open ? recipe?.id : null);

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isValid, dirtyFields, isDirty, isSubmitting },
        reset,
    } = useForm<RecipeFormData>({
        resolver: zodResolver(recipeSchema),
        defaultValues: {
            title: recipe?.title,
            cookTime: recipe?.cookTime.toString(),
            description: recipe?.description || '',
            imageUrl: recipe?.imageUrl || '',
            ingredients: recipe?.ingredients?.map((ing) => ({ value: ing })),
            instructions: recipe?.instructions?.map((inst) => ({ value: inst })),
            collectionIds: recipeCollectionIds || [],
        },
        mode: 'onChange',
    });

    useEffect(() => {
        if (recipeCollectionIds) {
            reset({
                title: recipe.title,
                cookTime: recipe.cookTime.toString(),
                description: recipe.description || '',
                imageUrl: recipe.imageUrl || '',
                ingredients: recipe.ingredients?.map((ing) => ({ value: ing })) || [{ value: '' }],
                instructions: recipe.instructions?.map((inst) => ({ value: inst })) || [{ value: '' }],
                collectionIds: recipeCollectionIds,
            });
        }
    }, [recipeCollectionIds, recipe, reset]);

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
        const payload: Partial<RecipeFormData> = {};

        if (dirtyFields.title) payload.title = data.title;
        if (dirtyFields.cookTime) payload.cookTime = data.cookTime;
        if (dirtyFields.description) payload.description = data.description?.trim() || undefined;
        if (dirtyFields.ingredients) payload.ingredients = data.ingredients;
        if (dirtyFields.instructions) payload.instructions = data.instructions;
        if (dirtyFields.collectionIds) payload.collectionIds = data.collectionIds;

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

            payload.imageUrl = uploadedUrl;
        } else if (dirtyFields.imageUrl) {
            payload.imageUrl = data.imageUrl?.trim() || undefined;
        }

        const result = await updateRecipeAction(recipe.id, payload);

        if (result.error) {
            toaster.create({
                title: 'Error',
                description: result.error,
                type: 'error',
            });
            return;
        }

        onRecipeEdit();

        toaster.create({
            title: 'Success',
            description: 'Recipe updated successfully!',
            type: 'success',
        });

        setImageFile(null);
        reset();
        setOpen(false);
    };

    const handleOpenChange = (details: { open: boolean }) => {
        if (!isSubmitting) {
            setOpen(details.open);

            if (details.open) {
                reset({
                    title: recipe.title,
                    cookTime: recipe.cookTime.toString(),
                    description: recipe.description || '',
                    imageUrl: recipe.imageUrl || '',
                    ingredients: recipe.ingredients?.map((ing) => ({ value: ing })) || [
                        { value: '' },
                    ],
                    instructions: recipe.instructions?.map((inst) => ({ value: inst })) || [
                        { value: '' },
                    ],
                    collectionIds: recipeCollectionIds || [],
                });
                setImageFile(null);
            }
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="lg">
            {children && <Dialog.Trigger asChild>{children}</Dialog.Trigger>}

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner px={{ base: 'element', md: 0 }}>
                    <Dialog.Content minH="500px">
                        <Dialog.Header>
                            <Dialog.Title>Edit Recipe</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" disabled={isSubmitting} />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog.Body>
                                <Tabs.Root defaultValue="details" fitted>
                                    <Tabs.List mb="component">
                                        <Tabs.Trigger value="details" disabled={isSubmitting}>
                                            <Icon fontSize={{ base: 'sm', md: 'md' }}>
                                                <RiInformationLine />
                                            </Icon>
                                            <Text display={{ base: 'none', sm: 'block' }}>
                                                Details
                                            </Text>
                                        </Tabs.Trigger>

                                        <Tabs.Trigger value="ingredients" disabled={isSubmitting}>
                                            <Icon fontSize={{ base: 'sm', md: 'md' }}>
                                                <RiRestaurantLine />
                                            </Icon>
                                            <Text display={{ base: 'none', sm: 'block' }}>
                                                Ingredients
                                            </Text>
                                        </Tabs.Trigger>

                                        <Tabs.Trigger value="instructions" disabled={isSubmitting}>
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
                                                    key={fileUploadKey}
                                                    maxFiles={1}
                                                    accept="image/*"
                                                    onFileChange={handleFileChange}
                                                    disabled={isSubmitting}
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
                                                                PNG, JPG up to 2MB
                                                            </Text>
                                                        </FileUpload.DropzoneContent>
                                                    </FileUpload.Dropzone>
                                                </FileUpload.Root>
                                                {imageFile && (
                                                    <HStack
                                                        mt="element"
                                                        p="element"
                                                        borderRadius="md"
                                                        bg="fills.surfaces.soft"
                                                        borderWidth="1px"
                                                        borderColor="borders.default"
                                                        justify="space-between"
                                                        w="full"
                                                    >
                                                        <VStack align="start" gap="0" flex="1">
                                                            <Text
                                                                fontSize="sm"
                                                                fontWeight="medium"
                                                                color="textAndIcons.onSurfaces.lead"
                                                            >
                                                                {imageFile.name}
                                                            </Text>
                                                            <Text
                                                                fontSize="xs"
                                                                color="textAndIcons.onSurfaces.helper"
                                                            >
                                                                {(imageFile.size / 1024).toFixed(2)}{' '}
                                                                KB
                                                            </Text>
                                                        </VStack>
                                                        <CloseButton
                                                            size="sm"
                                                            onClick={() => {
                                                                setImageFile(null);
                                                                setFileUploadKey(
                                                                    (prev) => prev + 1,
                                                                );
                                                            }}
                                                            aria-label="Remove file"
                                                        />
                                                    </HStack>
                                                )}
                                                {!imageFile && recipe.imageUrl && (
                                                    <Text
                                                        fontSize="sm"
                                                        mt="element"
                                                        color="textAndIcons.onSurfaces.helper"
                                                    >
                                                        Current image:{' '}
                                                        {recipe.imageUrl.split('/').pop()}
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
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
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
                                                    disabled={isSubmitting}
                                                />
                                                {errors.description && (
                                                    <Field.ErrorText>
                                                        {errors.description.message}
                                                    </Field.ErrorText>
                                                )}
                                            </Field.Root>

                                            <Field.Root>
                                                <Field.Label>Add to Collections (optional)</Field.Label>
                                                <Controller
                                                    name="collectionIds"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <CheckboxGroup
                                                            value={field.value}
                                                            onValueChange={field.onChange}
                                                            disabled={isSubmitting}
                                                        >
                                                            <Stack gap="element">
                                                                {collections && collections.length > 0 ? (
                                                                    collections.map((collection) => (
                                                                        <Checkbox.Root
                                                                            key={collection.id}
                                                                            value={collection.id}
                                                                        >
                                                                            <Checkbox.HiddenInput />
                                                                            <Checkbox.Control />
                                                                            <Checkbox.Label>
                                                                                {collection.name}
                                                                            </Checkbox.Label>
                                                                        </Checkbox.Root>
                                                                    ))
                                                                ) : (
                                                                    <Text
                                                                        fontSize="sm"
                                                                        color="textAndIcons.onSurfaces.subdued"
                                                                    >
                                                                        No collections yet. Create a collection first.
                                                                    </Text>
                                                                )}
                                                            </Stack>
                                                        </CheckboxGroup>
                                                    )}
                                                />
                                            </Field.Root>
                                        </VStack>
                                    </Tabs.Content>

                                    <Tabs.Content value="ingredients">
                                        <VStack align="stretch" gap="element">
                                            <Text fontSize="sm" color="gray.500" mb={2}>
                                                Edit your recipe ingredients.
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
                                                            disabled={isSubmitting}
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
                                                                disabled={isSubmitting}
                                                            >
                                                                <RiDeleteBin6Line />
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
                                                disabled={isSubmitting}
                                            >
                                                <RiAddLine />
                                                Add Ingredient
                                            </Button>
                                        </VStack>
                                    </Tabs.Content>

                                    <Tabs.Content value="instructions">
                                        <VStack align="stretch" gap="element">
                                            <Text fontSize="sm" color="gray.500" mb={2}>
                                                Edit your recipe steps.
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
                                                            disabled={isSubmitting}
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
                                                                disabled={isSubmitting}
                                                            >
                                                                <RiDeleteBin6Line />
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
                                                disabled={isSubmitting}
                                            >
                                                <RiAddLine />
                                                Add Step
                                            </Button>
                                        </VStack>
                                    </Tabs.Content>
                                </Tabs.Root>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    disabled={!isValid || isSubmitting || (!isDirty && !imageFile)}
                                >
                                    Update Recipe
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

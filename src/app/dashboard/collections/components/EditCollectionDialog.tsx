'use client';

import {
    Button,
    CloseButton,
    Dialog,
    Field,
    IconButton,
    Input,
    Portal,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiEdit2Line } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { toaster } from '@/components/chakra-ui/toaster';
import { CollectionFormData, collectionSchema } from '@/models/collection';
import { Collection } from '@/types/collection';

import { updateCollectionAction } from '../actions';

interface EditCollectionDialogProps {
    collection: Collection;
    onCollectionEdit: KeyedMutator<Collection[]>;
}

export function EditCollectionDialog({ collection, onCollectionEdit }: EditCollectionDialogProps) {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty, isSubmitting },
        reset,
    } = useForm<CollectionFormData>({
        resolver: zodResolver(collectionSchema),
        defaultValues: {
            name: collection?.name,
            description: collection?.description || '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: CollectionFormData) => {
        if (!isDirty) {
            setOpen(false);
            return;
        }

        const result = await updateCollectionAction(collection.id, {
            name: data.name,
            description: data.description?.trim() || undefined,
        });

        if (!result.success) {
            toaster.create({
                title: 'Error',
                description: result.error || 'Failed to update collection',
                type: 'error',
            });
            return;
        }

        onCollectionEdit();

        toaster.create({
            title: 'Success',
            description: 'Collection updated successfully!',
            type: 'success',
        });

        reset(data);
        setOpen(false);
    };

    const handleOpenChange = (details: { open: boolean }) => {
        if (!isSubmitting) {
            setOpen(details.open);

            if (!details.open) {
                reset({
                    name: collection?.name,
                    description: collection?.description || '',
                });
            }
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="sm">
            <Dialog.Trigger asChild>
                <IconButton aria-label="Edit collection" variant="subtle" size="xs" rounded="full">
                    <RiEdit2Line />
                </IconButton>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner>
                    <Dialog.Content
                        borderRadius={{ base: 0, md: 'lg' }}
                        h={{ base: '100vh', md: 'auto' }}
                        display={{ base: 'flex', md: 'block' }}
                        flexDirection={{ base: 'column', md: 'initial' }}
                    >
                        <Dialog.Header pb={{ base: 'element', md: 'component' }} flexShrink={0}>
                            <Dialog.Title fontSize={{ base: 'lg', md: 'xl' }}>
                                Edit Collection
                            </Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" disabled={isSubmitting} />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'contents' }}>
                            <Dialog.Body flex={{ base: '1', md: 'initial' }} overflowY="auto">
                                <VStack align="stretch" gap="component">
                                    <Field.Root required invalid={!!errors.name}>
                                        <Field.Label>Collection Name</Field.Label>
                                        <Input
                                            {...register('name')}
                                            placeholder="e.g., Desserts"
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && (
                                            <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.description}>
                                        <Field.Label>Description</Field.Label>
                                        <Textarea
                                            {...register('description')}
                                            placeholder="A brief description of your collection..."
                                            minH="100px"
                                            disabled={isSubmitting}
                                        />
                                        {errors.description && (
                                            <Field.ErrorText>
                                                {errors.description.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>
                                </VStack>
                            </Dialog.Body>

                            <Dialog.Footer
                                gap="element"
                                flexDir={{ base: 'column', sm: 'row' }}
                                flexShrink={0}
                            >
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    disabled={isSubmitting}
                                    w={{ base: 'full', sm: 'auto' }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    disabled={!isValid || isSubmitting}
                                    w={{ base: 'full', sm: 'auto' }}
                                >
                                    Save Changes
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

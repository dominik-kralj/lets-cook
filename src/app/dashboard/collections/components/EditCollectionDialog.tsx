'use client';

import {
    Button,
    CloseButton,
    Dialog,
    Field,
    Input,
    Portal,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';

import { toaster } from '@/components/chakra-ui/toaster';
import { collectionSchema, CollectionFormData } from '@/models/collection';
import { Collection } from '@/types/collection';

import { updateCollectionAction } from '../actions';

interface EditCollectionDialogProps {
    collection: Collection;
    onCollectionEdit: KeyedMutator<Collection[]>;
    children?: React.ReactNode;
}

export function EditCollectionDialog({
    collection,
    onCollectionEdit,
    children,
}: EditCollectionDialogProps) {
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
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="md">
            <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
                {children}
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner px={{ base: 'element', md: 0 }}>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit Collection</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" disabled={isSubmitting} />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog.Body>
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
                                    disabled={!isValid || isSubmitting}
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

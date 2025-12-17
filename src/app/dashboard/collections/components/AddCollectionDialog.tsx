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
import { RiAddLine } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { toaster } from '@/components/chakra-ui/toaster';
import { CollectionFormData, collectionSchema, defaultCollectionValues } from '@/models/collection';
import { Collection } from '@/types/collection';

import { createCollectionAction } from '../actions';

interface AddCollectionDialogProps {
    onCollectionAdd: KeyedMutator<Collection[]>;
}

export function AddCollectionDialog({ onCollectionAdd }: AddCollectionDialogProps) {
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
        reset,
    } = useForm<CollectionFormData>({
        resolver: zodResolver(collectionSchema),
        defaultValues: defaultCollectionValues,
        mode: 'onChange',
    });

    const onSubmit = async (data: CollectionFormData) => {
        const result = await createCollectionAction({
            name: data.name,
            description: data.description?.trim() || undefined,
        });

        if (!result.success) {
            toaster.create({
                title: 'Error',
                description: result.error || 'Failed to create collection',
                type: 'error',
            });
            return;
        }

        onCollectionAdd();

        toaster.create({
            title: 'Success',
            description: 'Collection created successfully!',
            type: 'success',
        });

        reset();
        setOpen(false);
    };

    const handleOpenChange = (details: { open: boolean }) => {
        if (!isSubmitting) {
            setOpen(details.open);

            if (!details.open) {
                reset();
            }
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="md">
            <Dialog.Trigger asChild>
                <Button size={{ base: 'sm', md: 'md' }}>
                    <RiAddLine />
                    Add Collection
                </Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />

                <Dialog.Positioner px={{ base: 'element', md: 0 }}>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add New Collection</Dialog.Title>
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
                                    Create Collection
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

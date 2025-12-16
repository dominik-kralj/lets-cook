'use client';

import { Button, CloseButton, Dialog, IconButton, Portal, Text } from '@chakra-ui/react';
import { useState, useTransition } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { toaster } from '@/components/chakra-ui/toaster';
import { Recipe } from '@/types/recipe';

import { deleteRecipeAction } from '../actions';

interface DeleteRecipeDialogProps {
    recipeTitle: string;
    recipeId: string;
    onRecipeDelete: KeyedMutator<Recipe[]>;
}

export function DeleteRecipeDialog({
    recipeTitle,
    recipeId,
    onRecipeDelete,
}: DeleteRecipeDialogProps) {
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleRecipeDelete = () => {
        startTransition(async () => {
            const result = await deleteRecipeAction(recipeId);

            if (!result.success) {
                toaster.create({
                    title: 'Error',
                    description: result.error || 'Failed to delete recipe',
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Success',
                description: `${recipeTitle} has been deleted`,
                type: 'success',
            });

            await onRecipeDelete();
            setOpen(false);
        });
    };

    const handleOpenChange = (details: { open: boolean }) => {
        setOpen(details.open);
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="sm">
            <Dialog.Trigger asChild>
                <IconButton
                    aria-label="Delete recipe"
                    variant="subtle"
                    size="xs"
                    rounded="full"
                    colorPalette="red"
                >
                    <RiDeleteBin6Line />
                </IconButton>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <Dialog.Header>
                            <Dialog.Title>Delete Recipe</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Text>
                                Are you sure you want to delete recipe: <b>{recipeTitle}</b>?
                            </Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>

                            <Button loading={isPending} onClick={handleRecipeDelete}>
                                Delete
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

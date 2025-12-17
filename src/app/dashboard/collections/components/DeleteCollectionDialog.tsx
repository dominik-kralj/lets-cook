'use client';

import { Button, CloseButton, Dialog, IconButton, Portal, Text } from '@chakra-ui/react';
import { useState, useTransition } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { toaster } from '@/components/chakra-ui/toaster';
import { Collection } from '@/types/collection';

import { deleteCollectionAction } from '../actions';

interface DeleteCollectionDialogProps {
    collectionName: string;
    collectionId: string;
    onCollectionDelete: KeyedMutator<Collection[]>;
}

export function DeleteCollectionDialog({
    collectionName,
    collectionId,
    onCollectionDelete,
}: DeleteCollectionDialogProps) {
    const [open, setOpen] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleCollectionDelete = () => {
        startTransition(async () => {
            const result = await deleteCollectionAction(collectionId);

            if (!result.success) {
                toaster.create({
                    title: 'Error',
                    description: result.error || 'Failed to delete collection',
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Success',
                description: `${collectionName} has been deleted`,
                type: 'success',
            });

            await onCollectionDelete();
            setOpen(false);
        });
    };

    const handleOpenChange = (details: { open: boolean }) => {
        setOpen(details.open);
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center" size="sm">
            <Dialog.Trigger asChild onClick={(e) => e.stopPropagation()}>
                <IconButton
                    aria-label="Delete collection"
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
                            <Dialog.Title>Delete Collection</Dialog.Title>
                        </Dialog.Header>

                        <Dialog.Body>
                            <Text>
                                Are you sure you want to delete collection: <b>{collectionName}</b>?
                            </Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Dialog.ActionTrigger>

                            <Button loading={isPending} onClick={handleCollectionDelete}>
                                Delete
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}

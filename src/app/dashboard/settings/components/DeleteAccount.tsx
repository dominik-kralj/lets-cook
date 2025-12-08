'use client';

import { Button, Card, Dialog, HStack, Portal, Text, VStack } from '@chakra-ui/react';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { useState } from 'react';
import { LuShieldAlert } from 'react-icons/lu';

import { toaster } from '@/components/chakra-ui/toaster';

import { deleteAccountAction } from '../actions';

export function DeleteAccount() {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            const response = await deleteAccountAction();

            if (response?.error) {
                toaster.create({
                    title: 'Failed to delete account',
                    description: response.error,
                    type: 'error',
                });
                setIsDeleting(false);
            }
        } catch (error) {
            if (isRedirectError(error)) {
                throw error;
            }

            toaster.create({
                title: 'Something went wrong',
                description: 'Please try again later.',
                type: 'error',
            });
            setIsDeleting(false);
        }
    };

    return (
        <>
            <Card.Root
                bg="fills.surfaces.destructive"
                borderColor="outlines.withSurfaces.destructive"
                borderWidth="1px"
            >
                <Card.Header>
                    <HStack gap="tight">
                        <LuShieldAlert size={20} />
                        <Card.Title color="textAndIcons.onSurfaces.destructive">
                            Delete Account
                        </Card.Title>
                    </HStack>
                    <Card.Description color="textAndIcons.onSurfaces.destructive">
                        Permanently remove your account and all associated data
                    </Card.Description>
                </Card.Header>

                <Card.Body>
                    <VStack align="start" gap="component">
                        <Text fontSize="sm" color="textAndIcons.onSurfaces.destructiveHelper">
                            Once you delete your account, there is no going back. All your recipes,
                            collections, and favorites will be permanently deleted.
                        </Text>
                        <Button variant="outline" onClick={() => setOpen(true)} w="fit">
                            Delete Account
                        </Button>
                    </VStack>
                </Card.Body>
            </Card.Root>

            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Delete Account</Dialog.Title>
                            </Dialog.Header>

                            <Dialog.Body>
                                <Text>
                                    Are you absolutely sure? This action cannot be undone. All your
                                    data will be permanently deleted.
                                </Text>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button onClick={handleDelete} loading={isDeleting}>
                                    Delete Permanently
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    );
}

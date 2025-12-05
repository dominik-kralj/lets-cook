'use client';

import {
    Box,
    Button,
    CloseButton,
    Dialog,
    Field,
    Icon,
    Input,
    Portal,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiUserLine } from 'react-icons/ri';

import { toaster } from '@/components/chakra-ui/toaster';
import { useProfile } from '@/hooks/useProfile';
import { UpdateProfileFormData, updateProfileSchema } from '@/models/user';
import { UserProfile } from '@/types/user';

import { updateProfileAction } from '../actions';

interface EditProfileDialogProps {
    profile: UserProfile;
}

export function EditProfileDialog({ profile }: EditProfileDialogProps) {
    const { mutate } = useProfile();
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty },
        reset,
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        mode: 'onChange',
    });

    useEffect(() => {
        if (open) {
            reset({
                username: profile.username,
                email: profile.email,
                bio: profile.bio || '',
            });
        }
    }, [open, profile.username, profile.email, profile.bio, reset]);

    const onSubmit = async (data: UpdateProfileFormData) => {
        try {
            const response = await updateProfileAction(data);

            if (response?.error) {
                toaster.create({
                    title: 'Failed to update profile',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Profile updated',
                description: 'Your profile has been updated successfully.',
                type: 'success',
            });

            await mutate();
            setOpen(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toaster.create({
                title: 'Something went wrong',
                description: 'Please try again later.',
                type: 'error',
            });
        }
    };

    const handleOpenChange = (details: { open: boolean }) => {
        setOpen(details.open);
    };

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center">
            <Dialog.Trigger asChild>
                <Button width={{ base: 'full', md: 'auto' }}>Edit Profile</Button>
            </Dialog.Trigger>

            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner px={{ base: 'element', md: 0 }}>
                    <Dialog.Content>
                        <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>

                        <Dialog.Header>
                            <Dialog.Title>Edit Profile</Dialog.Title>
                        </Dialog.Header>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Dialog.Body>
                                <VStack gap="component" align="stretch">
                                    <VStack gap="tight">
                                        <Box
                                            w="80px"
                                            h="80px"
                                            borderRadius="full"
                                            bg="fills.controlsNeutral.inactive"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            cursor="pointer"
                                            _hover={{ opacity: 0.8 }}
                                            transition="opacity 0.2s"
                                        >
                                            <Icon size="2xl" color="primary.40">
                                                <RiUserLine />
                                            </Icon>
                                        </Box>
                                        <Button variant="ghost" size="sm" disabled>
                                            Click to change avatar
                                        </Button>
                                    </VStack>

                                    <Field.Root required invalid={!!errors.username}>
                                        <Field.Label
                                            color="textAndIcons.onSurfaces.lead"
                                            fontWeight="medium"
                                        >
                                            Username
                                        </Field.Label>
                                        <Input
                                            {...register('username')}
                                            placeholder="Your username"
                                        />
                                        {errors.username && (
                                            <Field.ErrorText>
                                                {errors.username.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root required invalid={!!errors.email}>
                                        <Field.Label
                                            color="textAndIcons.onSurfaces.lead"
                                            fontWeight="medium"
                                        >
                                            Email Address
                                        </Field.Label>
                                        <Input
                                            type="email"
                                            {...register('email')}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && (
                                            <Field.ErrorText>
                                                {errors.email.message}
                                            </Field.ErrorText>
                                        )}
                                    </Field.Root>

                                    <Field.Root invalid={!!errors.bio}>
                                        <Field.Label
                                            color="textAndIcons.onSurfaces.lead"
                                            fontWeight="medium"
                                        >
                                            Bio
                                        </Field.Label>
                                        <Textarea
                                            {...register('bio')}
                                            placeholder="Tell us about yourself..."
                                            rows={4}
                                        />
                                        {errors.bio && (
                                            <Field.ErrorText>{errors.bio.message}</Field.ErrorText>
                                        )}
                                    </Field.Root>
                                </VStack>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>

                                <Button type="submit" loading={isSubmitting} disabled={!isDirty}>
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

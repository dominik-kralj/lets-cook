'use client';

import {
    Avatar,
    Box,
    Button,
    CloseButton,
    Dialog,
    Field,
    FileUpload,
    Float,
    IconButton,
    Input,
    Portal,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LuX } from 'react-icons/lu';
import { RiEditLine } from 'react-icons/ri';
import { KeyedMutator } from 'swr';

import { toaster } from '@/components/chakra-ui/toaster';
import { AUTH_ERRORS } from '@/lib/errors';
import { uploadAvatar } from '@/lib/supabase/utils';
import { UpdateProfileFormData, updateProfileSchema } from '@/models/user';
import { UserProfile } from '@/types/user';
import { validateImageFile } from '@/utils/helper';

import { updateProfileAction } from '../actions';

interface EditProfileDialogProps {
    profile: UserProfile;
    onUpdate: KeyedMutator<UserProfile>;
}

export function EditProfileDialog({ profile, onUpdate }: EditProfileDialogProps) {
    const [open, setOpen] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, dirtyFields, isValid },
        reset,
        control,
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        mode: 'onChange',
    });

    const avatarValue = useWatch({
        control,
        name: 'avatar',
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

        setAvatarFile(file);
    };

    const handleRemoveAvatar = () => {
        setAvatarFile(null);
    };

    const onSubmit = async (data: UpdateProfileFormData) => {
        try {
            const changedData: Partial<UpdateProfileFormData> = {};

            if (avatarFile) {
                const uploadedUrl = await uploadAvatar(avatarFile, profile.id);

                if (!uploadedUrl) {
                    toaster.create({
                        title: 'Failed to upload avatar',
                        description: 'Please try again',
                        type: 'error',
                    });

                    return;
                }

                changedData.avatar = uploadedUrl;
            }

            if (dirtyFields.username) changedData.username = data.username;
            if (dirtyFields.bio) changedData.bio = data.bio;

            if (Object.keys(changedData).length === 0) {
                setOpen(false);
                return;
            }

            const response = await updateProfileAction(changedData);

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

            await onUpdate();
            setOpen(false);
            setAvatarFile(null);
        } catch (error) {
            console.error('Error updating profile:', error);

            toaster.create({
                title: AUTH_ERRORS.GENERIC,
                type: 'error',
            });
        }
    };

    const handleOpenChange = (details: { open: boolean }) => {
        setOpen(details.open);

        if (details.open) {
            reset({
                username: profile.username,
                bio: profile.bio || '',
                avatar: profile.avatar || '',
            });
            setAvatarFile(null);
        } else {
            setAvatarFile(null);
        }
    };

    const avatarPreview = avatarFile
        ? URL.createObjectURL(avatarFile)
        : avatarValue || profile.avatar;

    const hasChanges = isDirty || avatarFile !== null;

    return (
        <Dialog.Root open={open} onOpenChange={handleOpenChange} placement="center">
            <Dialog.Trigger asChild>
                <IconButton aria-label="Edit profile" size={{ base: 'md', md: 'lg' }}>
                    <RiEditLine />
                </IconButton>
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
                                        <Box position="relative">
                                            <Avatar.Root size="2xl">
                                                <Avatar.Fallback name={profile.username} />

                                                {avatarPreview && (
                                                    <Avatar.Image src={avatarPreview} />
                                                )}
                                            </Avatar.Root>

                                            {avatarFile && (
                                                <Float placement="top-end" offset="2">
                                                    <Button
                                                        size="xs"
                                                        colorPalette="red"
                                                        onClick={handleRemoveAvatar}
                                                        borderRadius="full"
                                                        p={0}
                                                    >
                                                        <LuX />
                                                    </Button>
                                                </Float>
                                            )}
                                        </Box>

                                        <FileUpload.Root
                                            accept="image/*"
                                            maxFiles={1}
                                            onFileChange={handleFileChange}
                                            alignItems="center"
                                        >
                                            <FileUpload.HiddenInput />

                                            <FileUpload.Trigger asChild>
                                                <Button variant="ghost" size="sm" type="button">
                                                    Click to change avatar
                                                </Button>
                                            </FileUpload.Trigger>
                                        </FileUpload.Root>
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

                                <Button
                                    type="submit"
                                    loading={isSubmitting}
                                    disabled={!hasChanges || !isValid}
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

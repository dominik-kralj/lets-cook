'use client';

import { Button, Card, Field, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { ChangePasswordFormData, changePasswordSchema } from '@/models/user';

import { changePasswordAction } from '../actions';

export function ChangePassword() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
    } = useForm<ChangePasswordFormData>({
        resolver: zodResolver(changePasswordSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: ChangePasswordFormData) => {
        try {
            const response = await changePasswordAction(data.currentPassword, data.newPassword);

            if (response?.error) {
                toaster.create({
                    title: 'Failed to change password',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Password updated',
                description: 'Your password has been changed successfully.',
                type: 'success',
            });

            reset();
        } catch (error) {
            console.error('Error changing password:', error);
            toaster.create({
                title: 'Something went wrong',
                description: 'Please try again later.',
                type: 'error',
            });
        }
    };

    return (
        <Card.Root maxW="3xl">
            <Card.Header>
                <Card.Title>Password Settings</Card.Title>
                <Card.Description>Change your password</Card.Description>
            </Card.Header>

            <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap="component" align="stretch">
                        <Field.Root required invalid={!!errors.currentPassword}>
                            <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                                Current Password
                            </Field.Label>
                            <Input
                                type="password"
                                {...register('currentPassword')}
                                placeholder="Enter current password"
                            />
                            {errors.currentPassword && (
                                <Field.ErrorText>{errors.currentPassword.message}</Field.ErrorText>
                            )}
                        </Field.Root>

                        <Field.Root required invalid={!!errors.newPassword}>
                            <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                                New Password
                            </Field.Label>
                            <Input
                                type="password"
                                {...register('newPassword')}
                                placeholder="Enter new password"
                            />
                            {errors.newPassword && (
                                <Field.ErrorText>{errors.newPassword.message}</Field.ErrorText>
                            )}
                        </Field.Root>

                        <Field.Root required invalid={!!errors.confirmPassword}>
                            <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                                Confirm New Password
                            </Field.Label>
                            <Input
                                type="password"
                                {...register('confirmPassword')}
                                placeholder="Confirm new password"
                            />
                            {errors.confirmPassword && (
                                <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
                            )}
                        </Field.Root>

                        <Button
                            type="submit"
                            loading={isSubmitting}
                            w="fit"
                            disabled={!isDirty || !isValid}
                        >
                            Change Password
                        </Button>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

'use client';

import { Button, Container, Field, Heading, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '@/components/chakra-ui/password-input';
import { toaster } from '@/components/chakra-ui/toaster';
import { FormCard } from '@/components/ui/FormCard';
import { Link } from '@/components/ui/Link';
import { AUTH_ERRORS } from '@/lib/errors';
import { createClient } from '@/lib/supabase/client';
import { ResetPasswordFormData, resetPasswordSchema } from '@/models/user';

export function ResetPassword() {
    const { push } = useRouter();
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid: isFormValid },
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        try {
            const supabase = createClient();

            const { error } = await supabase.auth.updateUser({
                password: data.password,
            });

            if (error) {
                if (
                    error.message.toLowerCase().includes('same') ||
                    error.message.toLowerCase().includes('different')
                ) {
                    setError('password', {
                        type: 'manual',
                        message: 'New password must be different from your old password',
                    });
                    return;
                }

                if (
                    error.message.toLowerCase().includes('session') ||
                    error.message.toLowerCase().includes('token') ||
                    error.message.toLowerCase().includes('expired')
                ) {
                    toaster.create({
                        title: 'Reset link expired',
                        description:
                            'This password reset link has expired. Please request a new one.',
                        type: 'error',
                    });
                    push('/auth/forgot-password');
                    return;
                }

                toaster.create({
                    title: 'Failed to reset password',
                    description: error.message,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Password updated!',
                description: 'You can now log in with your new password.',
                type: 'success',
            });

            setIsSuccess(true);
        } catch (error: unknown) {
            console.error('Error resetting password:', error);

            toaster.create({
                title: AUTH_ERRORS.GENERIC,
                type: 'error',
            });
        }
    };

    if (isSuccess) {
        return (
            <Container maxW={{ base: 'sm', sm: 'md' }}>
                <VStack
                    gap="section"
                    align="stretch"
                    p={{ base: 8, sm: 12 }}
                    borderRadius="xl"
                    borderWidth="1px"
                    bg="fills.surfaces.cardElevated"
                >
                    <VStack gap="component" textAlign="center">
                        <Heading as="h2" fontSize="3xl" color="textAndIcons.onSurfaces.lead">
                            Password Reset Successfully
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper">
                            Your password has been updated. You can now log in with your new
                            password.
                        </Text>
                    </VStack>

                    <Link href="/auth?mode=login" textDecoration="none">
                        <Button size="lg" width="full">
                            Go to Login
                        </Button>
                    </Link>
                </VStack>
            </Container>
        );
    }

    return (
        <FormCard
            title="Reset Password"
            subtitle="Enter your new password below"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonText="Reset Password"
            isSubmitting={isSubmitting}
            isDisabled={!isFormValid || isSubmitting}
            footerText="Remember your password?"
            footerLinkText="Log in"
            footerLinkHref="/auth?mode=login"
        >
            <Field.Root invalid={Boolean(errors.password)} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    New Password
                </Field.Label>

                <PasswordInput
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    {...register('password')}
                    required
                />
                {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={Boolean(errors.confirmPassword)} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Confirm New Password
                </Field.Label>

                <PasswordInput
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    {...register('confirmPassword')}
                    required
                />

                {errors.confirmPassword && (
                    <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
                )}
            </Field.Root>
        </FormCard>
    );
}

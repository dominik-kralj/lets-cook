'use client';

import { Button, Container, Field, Heading, Input, Spinner, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { FormCard } from '@/components/ui/FormCard';
import { Link } from '@/components/ui/Link';
import { AUTH_ERRORS } from '@/lib/errors';
import { createClient } from '@/lib/supabase/client';
import { ResetPasswordFormData, resetPasswordSchema } from '@/models/user';

export function ResetPassword() {
    const router = useRouter();
    const [isValidating, setIsValidating] = useState(true);
    const [isValid, setIsValid] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (user && !error) {
                setIsValid(true);
            } else {
                setIsValid(false);
            }

            setIsValidating(false);
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid: isFormValid, isDirty },
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
        } catch (error: any) {
            console.error('Error resetting password:', error);

            toaster.create({
                title: AUTH_ERRORS.GENERIC,
                type: 'error',
            });
        }
    };

    const handleRequestNewLink = () => {
        setCountdown(30);
        router.push('/auth/forgot-password');
    };

    if (isValidating) {
        return (
            <Container maxW="md">
                <VStack
                    gap="section"
                    align="center"
                    p={12}
                    borderRadius="xl"
                    borderWidth="1px"
                    bg="fills.surfaces.cardElevated"
                    boxShadow="sm"
                >
                    <Spinner size="xl" />
                    <Text color="textAndIcons.onSurfaces.helper">Validating reset link...</Text>
                </VStack>
            </Container>
        );
    }

    if (isSuccess) {
        return (
            <Container maxW="md">
                <VStack
                    gap="section"
                    align="stretch"
                    p={12}
                    borderRadius="xl"
                    borderWidth="1px"
                    bg="fills.surfaces.cardElevated"
                    boxShadow="sm"
                >
                    <VStack gap="component" textAlign="center">
                        <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                            Password Reset Successfully
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper" fontSize="lg">
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

    if (!isValid) {
        return (
            <Container maxW="md">
                <VStack
                    gap="section"
                    align="stretch"
                    p={12}
                    borderRadius="xl"
                    borderWidth="1px"
                    borderColor="outlines.withControlsNeutral.default"
                    bg="fills.surfaces.cardElevated"
                    boxShadow="sm"
                >
                    <VStack gap="component" textAlign="center">
                        <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                            Invalid Link
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper" fontSize="lg">
                            This password reset link is invalid or has expired.
                        </Text>
                    </VStack>

                    <Button
                        size="lg"
                        width="full"
                        onClick={handleRequestNewLink}
                        disabled={countdown > 0}
                    >
                        {countdown > 0 ? `Request New Link (${countdown}s)` : 'Request New Link'}
                    </Button>
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
            isDisabled={!isDirty || !isFormValid || isSubmitting}
            footerText="Remember your password?"
            footerLinkText="Log in"
            footerLinkHref="/auth?mode=login"
        >
            <Field.Root invalid={!!errors.password} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    New Password
                </Field.Label>

                <Input type="password" placeholder="••••••••" {...register('password')} required />
                {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors.confirmPassword} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Confirm New Password
                </Field.Label>

                <Input
                    type="password"
                    placeholder="••••••••"
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

// src/app/auth/components/ResetPassword.tsx
'use client';

import { Button, Container, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { Link } from '@/components/ui/Link';
import { ResetPasswordDto, resetPasswordSchema } from '@/models/user';

import { resetPasswordAction } from '../actions';

export function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isValidToken, setIsValidToken] = useState(true);

    const code = searchParams.get('code');

    useEffect(() => {
        if (!code) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsValidToken(false);
            toaster.create({
                title: 'Invalid reset link',
                description: 'Please request a new password reset link.',
                type: 'error',
            });
        }
    }, [code]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<ResetPasswordDto>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: ResetPasswordDto) => {
        if (!code) return;

        try {
            const response = await resetPasswordAction(data.password);

            if (response?.error) {
                toaster.create({
                    title: 'Failed to reset password',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Password updated!',
                description: 'You can now log in with your new password.',
                type: 'success',
            });

            router.push('/auth?mode=login');
        } catch (error: unknown) {
            console.error('Error caught:', error);
            toaster.create({
                title: 'Something went wrong',
                description: 'Please try again later.',
                type: 'error',
            });
        }
    };

    if (!isValidToken) {
        return (
            <Container maxW="md">
                <VStack gap="component" align="stretch" p={8} borderRadius="xl" borderWidth="1px">
                    <VStack gap="element" textAlign="center">
                        <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                            Invalid Link
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper">
                            This password reset link is invalid or has expired.
                        </Text>
                    </VStack>

                    <Link href="/auth/forgot-password">
                        <Button size="lg" width="full">
                            Request New Link
                        </Button>
                    </Link>
                </VStack>
            </Container>
        );
    }

    return (
        <Container maxW="md">
            <VStack gap="component" align="stretch" p={8} borderRadius="xl" borderWidth="1px">
                <VStack gap="element" textAlign="center">
                    <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                        Reset Password
                    </Heading>
                    <Text color="textAndIcons.onSurfaces.helper">
                        Enter your new password below
                    </Text>
                </VStack>

                <Stack gap="element" as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Field.Root invalid={!!errors.password} required>
                        <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                            New Password
                        </Field.Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            required
                        />
                        {errors.password && (
                            <Field.ErrorText>{errors.password.message}</Field.ErrorText>
                        )}
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

                    <Button
                        type="submit"
                        size="lg"
                        width="full"
                        mt="element"
                        loading={isSubmitting}
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Reset Password
                    </Button>
                </Stack>

                <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                    Remember your password?{' '}
                    <Link href="/auth?mode=login" color="fills.actionsBrandStrong.default">
                        Log in
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
}

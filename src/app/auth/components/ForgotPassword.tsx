'use client';

import { Button, Container, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { Link } from '@/components/ui/Link';
import { ForgotPasswordDto, forgotPasswordSchema } from '@/models/user';

import { forgotPasswordAction } from '../actions';

export function ForgotPassword() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<ForgotPasswordDto>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: ForgotPasswordDto) => {
        try {
            const response = await forgotPasswordAction(data.email);

            if (response?.error) {
                toaster.create({
                    title: 'Failed to send reset email',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Check your email',
                description: 'We sent you a password reset link.',
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

    return (
        <Container maxW="md">
            <VStack gap="component" align="stretch" p={8} borderRadius="xl" borderWidth="1px">
                <VStack gap="element" textAlign="center">
                    <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                        Forgot Password?
                    </Heading>

                    <Text color="textAndIcons.onSurfaces.helper">
                        Enter your email and we&apos;ll send you a reset link
                    </Text>
                </VStack>

                <Stack gap="element" as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Field.Root invalid={!!errors.email} required>
                        <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                            Email
                        </Field.Label>
                        <Input
                            type="email"
                            placeholder="your@email.com"
                            {...register('email')}
                            required
                        />
                        {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                    </Field.Root>

                    <Button
                        type="submit"
                        size="lg"
                        width="full"
                        mt="element"
                        loading={isSubmitting}
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Send Reset Link
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

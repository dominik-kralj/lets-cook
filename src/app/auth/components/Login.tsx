'use client';

import { Button, Container, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';

import { Link } from '@/components/ui/Link';
import { LoginField, loginSchema } from '@/models/user';

import { loginAction } from '../actions';

export function Login() {
    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
        reset,
    } = useForm<LoginField>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = (data: LoginField) => {
        startTransition(async () => {
            try {
                await loginAction(data);

                reset();
                push('/dashboard');
            } catch (error: unknown) {
                console.error(error);
            }
        });
    };

    return (
        <Container maxW="md">
            <VStack
                gap="component"
                align="stretch"
                bg="fills.surfaces.card"
                p={8}
                borderRadius="xl"
                borderWidth="1px"
            >
                <VStack gap="element" textAlign="center">
                    <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                        Welcome Back
                    </Heading>

                    <Text color="textAndIcons.onSurfaces.helper">
                        Log in to access your recipes
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

                    <Field.Root invalid={!!errors.password} required>
                        <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                            Password
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

                    <Link
                        href="#"
                        textAlign="right"
                        color="fills.actionsBrandStrong.default"
                        fontSize="sm"
                    >
                        Forgot password?
                    </Link>

                    <Button
                        type="submit"
                        size="lg"
                        width="full"
                        mt="element"
                        loading={isSubmitting}
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Log In
                    </Button>
                </Stack>

                <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth?mode=signup" color="fills.actionsBrandStrong.default">
                        Sign up
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
}

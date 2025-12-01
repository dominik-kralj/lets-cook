'use client';

import { Button, Container, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Link } from '@/components/ui/Link';
import { LoginField, loginSchema } from '@/models/user';

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<LoginField>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: LoginField) => {
        console.log('Login data:', data);
        // TODO: Implement login logic
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
                        <Field.Label color="textAndIcons.onSurfaces.lead">Email</Field.Label>
                        <Input type="email" placeholder="your@email.com" {...register('email')} />
                        {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                    </Field.Root>

                    <Field.Root invalid={!!errors.password} required>
                        <Field.Label color="textAndIcons.onSurfaces.lead">Password</Field.Label>
                        <Input type="password" placeholder="••••••••" {...register('password')} />
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

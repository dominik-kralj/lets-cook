'use client';

import { Button, Container, Field, Heading, Input, Stack, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Link } from '@/components/ui/Link';
import { SignupField, signupSchema } from '@/models/user';

export function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<SignupField>({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignupField) => {
        console.log('Signup data:', data);
        // TODO: Implement signup logic
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
                        Create Account
                    </Heading>

                    <Text color="textAndIcons.onSurfaces.helper">
                        Start organizing your recipes today
                    </Text>
                </VStack>

                <Stack gap="element" as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Field.Root invalid={!!errors.username} required>
                        <Field.Label color="textAndIcons.onSurfaces.lead">Username</Field.Label>
                        <Input type="text" placeholder="johndoe" {...register('username')} />
                        {errors.username && (
                            <Field.ErrorText>{errors.username.message}</Field.ErrorText>
                        )}
                    </Field.Root>

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

                    <Field.Root invalid={!!errors.confirmPassword} required>
                        <Field.Label color="textAndIcons.onSurfaces.lead">
                            Confirm Password
                        </Field.Label>

                        <Input
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                        />

                        {errors.confirmPassword && (
                            <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
                        )}
                    </Field.Root>

                    <Button
                        type="submit"
                        size="lg"
                        loading={isSubmitting}
                        disabled={!isDirty || !isValid || isSubmitting}
                    >
                        Sign Up
                    </Button>
                </Stack>

                <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                    Already have an account?{' '}
                    <Link href="/auth?mode=login" color="fills.actionsBrandStrong.default">
                        Log in
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
}

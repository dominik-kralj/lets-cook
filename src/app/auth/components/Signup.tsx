'use client';

import { Field, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { PasswordInput } from '@/components/chakra-ui/password-input';
import { toaster } from '@/components/chakra-ui/toaster';
import { FormCard } from '@/components/ui/FormCard';
import { SignupFormData, signupSchema } from '@/models/user';

import { signupAction } from '../actions';

export function Signup() {
    const { push } = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
        setError,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignupFormData) => {
        try {
            const response = await signupAction(data);

            if (response?.error) {
                if (response.field === 'email') {
                    setError('email', {
                        type: 'server',
                        message: response.error,
                    });
                } else if (response.field === 'username') {
                    setError('username', {
                        type: 'server',
                        message: response.error,
                    });
                } else {
                    toaster.create({
                        title: 'Signup failed',
                        description: response.error,
                        type: 'error',
                    });
                }
                return;
            }

            toaster.create({
                title: 'Account created successfully!',
                description: 'Please check your email to confirm your account.',
                type: 'success',
            });

            push('/auth?mode=login');
            reset();
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
        <FormCard
            title="Create Account"
            subtitle="Start organizing your recipes today"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonText="Sign Up"
            isSubmitting={isSubmitting}
            isDisabled={!isValid || isSubmitting}
            footerText="Already have an account?"
            footerLinkText="Log in"
            footerLinkHref="/auth?mode=login"
        >
            <Field.Root invalid={!!errors.username} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Username
                </Field.Label>
                <Input
                    type="text"
                    placeholder="johndoe"
                    disabled={isSubmitting}
                    required
                    {...register('username')}
                />
                {errors.username && <Field.ErrorText>{errors.username.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors.email} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Email
                </Field.Label>
                <Input
                    type="email"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    required
                    {...register('email')}
                />
                {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors.password} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Password
                </Field.Label>
                <PasswordInput
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    required
                    {...register('password')}
                />
                {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors.confirmPassword} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Confirm Password
                </Field.Label>
                <PasswordInput
                    placeholder="••••••••"
                    disabled={isSubmitting}
                    required
                    {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                    <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
                )}
            </Field.Root>
        </FormCard>
    );
}

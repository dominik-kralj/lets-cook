'use client';

import { Field, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { FormCard } from '@/components/ui/FormCard';
import { Link } from '@/components/ui/Link';
import { LoginDto, loginSchema } from '@/models/user';

import { loginAction } from '../actions';

export function Login() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
        reset,
    } = useForm<LoginDto>({
        resolver: zodResolver(loginSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: LoginDto) => {
        try {
            const response = await loginAction(data);

            if (response?.error) {
                toaster.create({
                    title: 'Login failed',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Welcome back!',
                description: 'You have successfully logged in.',
                type: 'success',
            });

            reset();
            router.push('/dashboard');
            router.refresh();
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
            title="Welcome Back"
            subtitle="Log in to access your recipes"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonText="Log In"
            isSubmitting={isSubmitting}
            isDisabled={!isDirty || !isValid || isSubmitting}
            footerText="Don't have an account?"
            footerLinkText="Sign up"
            footerLinkHref="/auth?mode=signup"
        >
            <Field.Root invalid={!!errors.email} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Email
                </Field.Label>
                <Input type="email" placeholder="your@email.com" {...register('email')} required />
                {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
            </Field.Root>

            <Field.Root invalid={!!errors.password} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Password
                </Field.Label>
                <Input type="password" placeholder="••••••••" {...register('password')} required />
                {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
            </Field.Root>

            <Link
                href="/auth/forgot-password"
                textAlign="right"
                color="fills.actionsBrandStrong.default"
                fontSize="sm"
            >
                Forgot password?
            </Link>
        </FormCard>
    );
}

'use client';

import { Field, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { FormCard } from '@/components/ui/FormCard';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/models/user';

import { forgotPasswordAction } from '../actions';

export function ForgotPassword() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, isDirty },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onBlur',
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
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
        <FormCard
            title="Forgot Password?"
            subtitle="Enter your email and we'll send you a reset link"
            onSubmit={handleSubmit(onSubmit)}
            submitButtonText="Send Reset Link"
            isSubmitting={isSubmitting}
            isDisabled={!isDirty || !isValid || isSubmitting}
            footerText="Remember your password?"
            footerLinkText="Log in"
            footerLinkHref="/auth?mode=login"
        >
            <Field.Root invalid={!!errors.email} required>
                <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                    Email
                </Field.Label>

                <Input type="email" placeholder="your@email.com" {...register('email')} required />

                {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
            </Field.Root>
        </FormCard>
    );
}

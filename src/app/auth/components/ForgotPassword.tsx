'use client';

import { Field, Input } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { FormCard } from '@/components/ui/FormCard';
import { ForgotPasswordFormData, forgotPasswordSchema } from '@/models/user';

import { forgotPasswordAction } from '../actions';

export function ForgotPassword() {
    const [countdown, setCountdown] = useState(0);

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

            setCountdown(60);

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
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
            submitButtonText={countdown > 0 ? `Resend in ${countdown}s` : 'Send Reset Link'}
            isSubmitting={isSubmitting}
            isDisabled={!isDirty || !isValid || isSubmitting || countdown > 0}
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

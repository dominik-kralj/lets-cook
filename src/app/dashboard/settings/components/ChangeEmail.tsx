'use client';

import { Button, Card, Field, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { toaster } from '@/components/chakra-ui/toaster';
import { ChangeEmaiFormData, changeEmailSchema } from '@/models/user';

import { changeEmailAction } from '../actions';

interface ChangeEmailProps {
    currentEmail: string;
}

export function ChangeEmail({ currentEmail }: ChangeEmailProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
    } = useForm<ChangeEmaiFormData>({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            currentEmail: currentEmail,
            newEmail: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: ChangeEmaiFormData) => {
        try {
            if (data.currentEmail !== currentEmail) {
                toaster.create({
                    title: 'Invalid current email',
                    description: 'The current email does not match your account email.',
                    type: 'error',
                });

                return;
            }

            const response = await changeEmailAction(data.newEmail);

            if (response?.error) {
                toaster.create({
                    title: 'Failed to change email',
                    description: response.error,
                    type: 'error',
                });
                return;
            }

            toaster.create({
                title: 'Email update requested',
                description: 'Please check both your old and new email for confirmation links.',
                type: 'success',
            });

            reset({ currentEmail: data.newEmail, newEmail: '' });
        } catch (error) {
            console.error('Error changing email:', error);

            toaster.create({
                title: 'Something went wrong',
                description: 'Please try again later.',
                type: 'error',
            });
        }
    };

    return (
        <Card.Root maxW="3xl">
            <Card.Header>
                <Card.Title>Email Settings</Card.Title>
                <Card.Description>Update your email address</Card.Description>
            </Card.Header>

            <Card.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap="component" align="stretch">
                        <Field.Root required invalid={!!errors.currentEmail}>
                            <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                                Current Email
                            </Field.Label>

                            <Input
                                type="email"
                                {...register('currentEmail')}
                                placeholder="current@email.com"
                                readOnly
                                bg="fills.surfaces.cardElevated"
                                cursor="not-allowed"
                            />
                            {errors.currentEmail && (
                                <Field.ErrorText>{errors.currentEmail.message}</Field.ErrorText>
                            )}
                        </Field.Root>

                        <Field.Root required invalid={!!errors.newEmail}>
                            <Field.Label color="textAndIcons.onSurfaces.lead" fontWeight="medium">
                                New Email Address
                            </Field.Label>
                            <Input
                                type="email"
                                {...register('newEmail')}
                                placeholder="new@email.com"
                            />
                            {errors.newEmail && (
                                <Field.ErrorText>{errors.newEmail.message}</Field.ErrorText>
                            )}
                            <Field.HelperText>
                                You will receive confirmation emails at both addresses.
                            </Field.HelperText>
                        </Field.Root>

                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={!isDirty || !isValid || isSubmitting}
                            w="fit"
                        >
                            Update Email
                        </Button>
                    </VStack>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

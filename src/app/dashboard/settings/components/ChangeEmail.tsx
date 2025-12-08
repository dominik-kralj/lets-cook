'use client';

import { Button, Card, Field, HStack, Input, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuMail } from 'react-icons/lu';

import { toaster } from '@/components/chakra-ui/toaster';
import { ChangeEmailFormData, changeEmailSchema } from '@/models/user';

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
    } = useForm<ChangeEmailFormData>({
        resolver: zodResolver(changeEmailSchema),
        defaultValues: {
            currentEmail: currentEmail,
            newEmail: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (data: ChangeEmailFormData) => {
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
        <Card.Root>
            <Card.Header>
                <HStack gap="tight">
                    <LuMail size={20} />
                    <Card.Title>Email Settings</Card.Title>
                </HStack>
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
                            disabled={!isDirty || !isValid}
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

import { Button, Container, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Link } from './Link';

interface FormCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    footerText?: string;
    footerLinkText?: string;
    footerLinkHref?: string;
    onSubmit: (e: React.FormEvent) => void;
    submitButtonText: string;
    isSubmitting?: boolean;
    isDisabled?: boolean;
}

export function FormCard({
    title,
    subtitle,
    children,
    footerText,
    footerLinkText,
    footerLinkHref,
    onSubmit,
    submitButtonText,
    isSubmitting = false,
    isDisabled = false,
}: FormCardProps) {
    return (
        <Container maxW="md">
            <VStack
                gap="component"
                align="stretch"
                p={8}
                borderRadius="xl"
                borderWidth="1px"
                bg="fills.surfaces.cardElevated"
                boxShadow="sm"
            >
                <VStack gap="element" textAlign="center">
                    <Heading as="h2" fontSize="4xl" color="textAndIcons.onSurfaces.lead">
                        {title}
                    </Heading>
                    <Text color="textAndIcons.onSurfaces.helper">{subtitle}</Text>
                </VStack>

                <Stack gap="element" as="form" onSubmit={onSubmit}>
                    {children}

                    <Button
                        type="submit"
                        size="lg"
                        width="full"
                        mt="element"
                        loading={isSubmitting}
                        disabled={isDisabled}
                    >
                        {submitButtonText}
                    </Button>
                </Stack>

                {footerText && footerLinkText && footerLinkHref && (
                    <Text textAlign="center" color="textAndIcons.onSurfaces.helper" fontSize="sm">
                        {footerText}{' '}
                        <Link href={footerLinkHref} color="fills.actionsBrandStrong.default">
                            {footerLinkText}
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
}

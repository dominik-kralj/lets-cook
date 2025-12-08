'use client';

import { Box, Container, Heading, Spinner, Text, VStack } from '@chakra-ui/react';

import { logoutAction } from '@/app/auth/actions';
import { useProfile } from '@/hooks/useProfile';

import { DashboardLayout } from '../components/DashsboardLayout';
import { ChangeEmail } from './components/ChangeEmail';
import { ChangePassword } from './components/ChangePassword';
import { DeleteAccount } from './components/DeleteAccount';
import { Logout } from './components/Logout';

export default function SettingsPage() {
    const { profile, isLoading, isError } = useProfile();

    if (isLoading) {
        return (
            <DashboardLayout>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    h="calc(100vh - 200px)"
                >
                    <Spinner />
                </Box>
            </DashboardLayout>
        );
    }

    if (isError || !profile) {
        logoutAction();
        return null;
    }

    return (
        <DashboardLayout>
            <Container maxW="3xl" px={{ base: 'component', md: 'section' }}>
                <VStack align="stretch" gap="component">
                    <Box>
                        <Heading
                            as="h1"
                            fontSize={{ base: '2xl', md: '3xl' }}
                            color="textAndIcons.onSurfaces.lead"
                            mb="tight"
                        >
                            Settings
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper">
                            Manage your account settings and preferences
                        </Text>
                    </Box>

                    <ChangeEmail currentEmail={profile.email} />
                    <ChangePassword />
                    <Logout />
                    <DeleteAccount />
                </VStack>
            </Container>
        </DashboardLayout>
    );
}

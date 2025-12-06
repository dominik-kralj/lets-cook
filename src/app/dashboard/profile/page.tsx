'use client';

import {
    Avatar,
    Box,
    Card,
    Grid,
    Heading,
    HStack,
    Icon,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { RiBookmarkFill, RiFileListFill, RiFolderFill } from 'react-icons/ri';

import { logoutAction } from '@/app/auth/actions';
import { useProfile } from '@/hooks/useProfile';
import { formatDate } from '@/utils/helper';

import { DashboardLayout } from '../components/DashsboardLayout';
import { EditProfileDialog } from './components/EditProfileDialog';

export default function ProfilePage() {
    const { profile, isLoading, isError, mutate } = useProfile();

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

    const statistics = [
        {
            icon: RiFileListFill,
            count: profile.statistics.recipes,
            label: 'Recipes',
        },
        {
            icon: RiFolderFill,
            count: profile.statistics.collections,
            label: 'Collections',
        },
        {
            icon: RiBookmarkFill,
            count: profile.statistics.favorites,
            label: 'Favorites',
        },
    ];

    return (
        <DashboardLayout>
            <VStack align="stretch" gap="component">
                <Box>
                    <Heading
                        as="h1"
                        fontSize={{ base: '2xl', md: '3xl' }}
                        color="textAndIcons.onSurfaces.lead"
                        mb="tight"
                    >
                        Profile
                    </Heading>

                    <Text color="textAndIcons.onSurfaces.helper">
                        Manage your account information
                    </Text>
                </Box>

                <Card.Root>
                    <Card.Body>
                        <VStack gap="component" align="stretch">
                            <HStack
                                justify="space-between"
                                align={{ base: 'start', md: 'center' }}
                                flexDir={{ base: 'column', md: 'row' }}
                                gap="component"
                            >
                                <HStack gap="component" align="start">
                                    <Avatar.Root size={{ base: 'lg', md: 'xl' }}>
                                        <Avatar.Fallback name={profile.username} />
                                        {profile.avatar && <Avatar.Image src={profile.avatar} />}
                                    </Avatar.Root>

                                    <VStack align="start" gap="tight">
                                        <Heading
                                            as="h2"
                                            fontSize={{ base: 'xl', md: '2xl' }}
                                            color="textAndIcons.onSurfaces.lead"
                                        >
                                            {profile.username}
                                        </Heading>

                                        <Text
                                            color="textAndIcons.onSurfaces.helper"
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        >
                                            {profile.email}
                                        </Text>

                                        {profile.bio && (
                                            <Text
                                                fontSize="sm"
                                                color="textAndIcons.onSurfaces.lead"
                                                maxW="md"
                                            >
                                                {profile.bio}
                                            </Text>
                                        )}

                                        <Text
                                            fontSize="sm"
                                            color="textAndIcons.onSurfaces.helper"
                                            fontWeight="medium"
                                        >
                                            {`Member since ${formatDate(profile.createdAt)}`}
                                        </Text>
                                    </VStack>
                                </HStack>

                                <EditProfileDialog profile={profile} onUpdate={mutate} />
                            </HStack>
                        </VStack>
                    </Card.Body>
                </Card.Root>

                <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap="component">
                    {statistics.map((stat) => (
                        <Card.Root key={stat.label}>
                            <Card.Body>
                                <HStack gap="component" align="start">
                                    <Box
                                        p={3}
                                        bg="fills.actionsBrandStrong.default"
                                        borderRadius="lg"
                                        color="textAndIcons.onControlsBrand.default"
                                        flexShrink={0}
                                    >
                                        <Icon size="lg">
                                            <stat.icon />
                                        </Icon>
                                    </Box>
                                    <VStack align="start" gap="tight">
                                        <Heading
                                            as="h3"
                                            fontSize={{ base: '2xl', md: '3xl' }}
                                            color="textAndIcons.onSurfaces.lead"
                                            fontWeight="bold"
                                        >
                                            {stat.count}
                                        </Heading>
                                        <Text
                                            color="textAndIcons.onSurfaces.helper"
                                            fontWeight="medium"
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        >
                                            {stat.label}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Card.Body>
                        </Card.Root>
                    ))}
                </Grid>
            </VStack>
        </DashboardLayout>
    );
}

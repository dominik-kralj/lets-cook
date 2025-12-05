// src/app/dashboard/profile/page.tsx
'use client';

import { Box, Button, Card, Grid, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { RiBookmarkFill, RiFileListFill, RiFolderFill, RiUserLine } from 'react-icons/ri';

import { DashboardLayout } from '../components/DashsboardLayout';

const statistics = [
    {
        icon: RiFileListFill,
        count: 24,
        label: 'Recipes',
    },
    {
        icon: RiFolderFill,
        count: 5,
        label: 'Collections',
    },
    {
        icon: RiBookmarkFill,
        count: 12,
        label: 'Favorites',
    },
];

export default function ProfilePage() {
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

                {/* Profile Card */}
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
                                    <Box
                                        w={{ base: '64px', md: '80px' }}
                                        h={{ base: '64px', md: '80px' }}
                                        borderRadius="full"
                                        bg="fills.controlsNeutral.inactive"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                    >
                                        <Icon size={{ base: 'xl', md: '2xl' }} color="primary.40">
                                            <RiUserLine />
                                        </Icon>
                                    </Box>
                                    <VStack align="start" gap="tight">
                                        <Heading
                                            as="h2"
                                            fontSize={{ base: 'xl', md: '2xl' }}
                                            color="textAndIcons.onSurfaces.lead"
                                        >
                                            Home Chef
                                        </Heading>
                                        <Text
                                            color="textAndIcons.onSurfaces.helper"
                                            fontSize={{ base: 'sm', md: 'md' }}
                                        >
                                            chef@example.com
                                        </Text>
                                        <Text
                                            fontSize="sm"
                                            color="textAndIcons.onSurfaces.helper"
                                            fontWeight="medium"
                                        >
                                            Member since Dec 2024
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Button width={{ base: 'full', md: 'auto' }}>Edit Profile</Button>
                            </HStack>
                        </VStack>
                    </Card.Body>
                </Card.Root>

                {/* Statistics Cards */}
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
                                        <Icon size={{ base: 'lg', md: 'xl' }}>
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

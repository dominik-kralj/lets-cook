// src/app/dashboard/components/Sidebar/Sidebar.tsx
'use client';

import { Box, Heading, Separator, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { GiChefToque } from 'react-icons/gi';
import {
    RiBookmarkLine,
    RiFileListLine,
    RiFolderLine,
    RiLightbulbLine,
    RiSettings4Line,
    RiUserLine,
} from 'react-icons/ri';

import { ColorModeButton } from '@/components/chakra-ui/color-mode';
import { Link } from '@/components/ui/Link';

import { SidebarItem } from './SidebarItem';

export function Sidebar() {
    const pathname = usePathname();

    return (
        <Box
            w="280px"
            bg="fills.surfaces.cardElevated"
            borderRight="1px solid"
            borderColor="neutrals.10"
            p="component"
        >
            <VStack align="stretch" gap="component" h="full">
                {/* Logo & Theme Toggle */}
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Link href="/" textDecoration="none">
                        <Box display="flex" alignItems="center" gap="tight" cursor="pointer">
                            <GiChefToque size={28} color="var(--chakra-colors-primary-40)" />
                            <Heading as="h1" fontSize="xl" color="textAndIcons.onSurfaces.lead">
                                Let&apos;s Cook
                            </Heading>
                        </Box>
                    </Link>
                    <ColorModeButton size="sm" variant="ghost" />
                </Box>

                {/* Navigation */}
                <VStack align="stretch" gap="tight" px={4}>
                    <SidebarItem
                        href="/dashboard"
                        icon={RiFileListLine}
                        label="Recipes"
                        isActive={pathname === '/dashboard'}
                    />
                    <SidebarItem
                        href="/dashboard/collections"
                        icon={RiFolderLine}
                        label="Collections"
                        isActive={pathname === '/dashboard/collections'}
                    />
                    <SidebarItem
                        href="/dashboard/favorites"
                        icon={RiBookmarkLine}
                        label="Favorites"
                        isActive={pathname === '/dashboard/favorites'}
                    />
                </VStack>

                {/* Pro Tip Alert */}
                <Box
                    mx={4}
                    p={3}
                    bg="primary.5"
                    borderRadius="md"
                    borderLeft="3px solid"
                    borderColor="primary.40"
                >
                    <Box display="flex" gap="tight">
                        <RiLightbulbLine size={18} color="var(--chakra-colors-primary-40)" />
                        <Box>
                            <Box fontSize="xs" fontWeight="bold" color="primary.40" mb={1}>
                                Pro Tip
                            </Box>
                            <Box
                                fontSize="xs"
                                color="textAndIcons.onSurfaces.helper"
                                lineHeight="1.4"
                            >
                                Use tags to organize recipes by cuisine or meal type.
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Spacer */}
                <Box flex="1" />

                {/* Divider */}
                <Separator borderColor="neutrals.10" />

                {/* Bottom Navigation */}
                <VStack align="stretch" gap="tight" px={4} pb={0}>
                    <SidebarItem
                        href="/dashboard/profile"
                        icon={RiUserLine}
                        label="Profile"
                        isActive={pathname === '/dashboard/profile'}
                    />
                    <SidebarItem
                        href="/dashboard/settings"
                        icon={RiSettings4Line}
                        label="Settings"
                        isActive={pathname === '/dashboard/settings'}
                    />
                </VStack>
            </VStack>
        </Box>
    );
}

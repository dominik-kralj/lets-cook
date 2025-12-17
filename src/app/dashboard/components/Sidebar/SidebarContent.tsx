import { Box, Heading, IconButton, Separator, VStack } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { GiChefToque } from 'react-icons/gi';
import {
    RiCloseLine,
    RiFileListLine,
    RiFolderLine,
    RiHeartLine,
    RiSettings4Line,
    RiUserLine,
} from 'react-icons/ri';

import { ColorModeButton } from '@/components/chakra-ui/color-mode';
import { Link } from '@/components/ui/Link';

import { SidebarItem } from './SidebarItem';

interface SidebarContentProps {
    onClose?: () => void;
}

export function SidebarContent({ onClose }: SidebarContentProps) {
    const pathname = usePathname();

    return (
        <VStack align="stretch" gap="component" h="full">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Link href="/" textDecoration="none">
                    <Box display="flex" alignItems="center" gap="tight" cursor="pointer">
                        <GiChefToque size={28} color="var(--chakra-colors-primary-40)" />

                        <Heading as="h1" fontSize="xl" color="textAndIcons.onSurfaces.lead">
                            Let&apos;s Cook
                        </Heading>
                    </Box>
                </Link>

                <Box display="flex" gap="tight">
                    <ColorModeButton size="sm" variant="ghost" />

                    {onClose && (
                        <IconButton
                            size="sm"
                            variant="ghost"
                            aria-label="Close menu"
                            onClick={onClose}
                            display={{ base: 'flex', lg: 'none' }}
                        >
                            <RiCloseLine />
                        </IconButton>
                    )}
                </Box>
            </Box>

            <VStack align="stretch">
                <SidebarItem
                    href="/dashboard"
                    icon={RiFileListLine}
                    label="Recipes"
                    isActive={pathname === '/dashboard'}
                    onClick={onClose}
                />
                <SidebarItem
                    href="/dashboard/collections"
                    icon={RiFolderLine}
                    label="Collections"
                    isActive={pathname === '/dashboard/collections'}
                    onClick={onClose}
                />
                <SidebarItem
                    href="/dashboard/favorites"
                    icon={RiHeartLine}
                    label="Favorites"
                    isActive={pathname === '/dashboard/favorites'}
                    onClick={onClose}
                />
            </VStack>

            <Box flex="1" />

            <Separator borderColor="neutrals.10" />

            <VStack align="stretch">
                <SidebarItem
                    href="/dashboard/profile"
                    icon={RiUserLine}
                    label="Profile"
                    isActive={pathname === '/dashboard/profile'}
                    onClick={onClose}
                />
                <SidebarItem
                    href="/dashboard/settings"
                    icon={RiSettings4Line}
                    label="Settings"
                    isActive={pathname === '/dashboard/settings'}
                    onClick={onClose}
                />
            </VStack>
        </VStack>
    );
}

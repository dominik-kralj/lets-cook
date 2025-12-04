'use client';

import { Box } from '@chakra-ui/react';

import { Link } from '@/components/ui/Link';

interface NavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
    isActive?: boolean;
}

export function SidebarItem({ href, icon: Icon, label, isActive }: NavItemProps) {
    return (
        <Link href={href} textDecoration="none" display="block">
            <Box
                display="flex"
                alignItems="center"
                gap="tight"
                p={3}
                borderRadius="md"
                bg={isActive ? 'primary.10' : 'transparent'}
                color={
                    isActive ? 'fills.actionsBrandStrong.default' : 'textAndIcons.onSurfaces.lead'
                }
                transition="all 0.2s"
                _hover={{
                    bg: isActive ? 'primary.15' : 'fills.controlsNeutral.hover',
                }}
                fontWeight={isActive ? 'semibold' : 'medium'}
            >
                <Icon size={20} />
                <Box fontSize="md">{label}</Box>
            </Box>
        </Link>
    );
}

'use client';

import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Sidebar } from './Sidebar/Sidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <Flex bg="fills.surfaces.background" flex={1}>
            <Sidebar />
            <Box
                flex="1"
                bg="fills.controlsNeutral.inactive"
                p={{ base: 4, md: 6, lg: 'container' }}
                pt={{ base: 20, lg: 'container' }}
            >
                {children}
            </Box>
        </Flex>
    );
}

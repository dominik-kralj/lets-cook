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

            <Box flex="1" bg="fills.controlsNeutral.inactive" p="container">
                {children}
            </Box>
        </Flex>
    );
}

'use client';

import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Sidebar } from './Sidebar/Sidebar';

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <Flex minH="100vh" bg="fills.surfaces.background">
            <Sidebar />

            <Box flex="1" bg="fills.controlsNeutral.inactive" p="container">
                {children}
            </Box>
        </Flex>
    );
}

import { Box, Flex } from '@chakra-ui/react';

import { Sidebar } from './Sidebar/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <Flex h="100vh" overflow="hidden">
            <Sidebar />

            <Box flex="1" overflowY="auto" p={{ base: 'element', md: 'component' }}>
                {children}
            </Box>
        </Flex>
    );
}

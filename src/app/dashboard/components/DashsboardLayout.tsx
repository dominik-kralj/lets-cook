import { Box, Flex } from '@chakra-ui/react';

import { Sidebar } from './Sidebar/Sidebar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    scrollable?: boolean;
}

export function DashboardLayout({ children, scrollable = true }: DashboardLayoutProps) {
    return (
        <Flex h="100vh" overflow="hidden">
            <Sidebar />

            <Box
                flex="1"
                overflowY={scrollable ? 'auto' : 'unset'}
                p={{ base: 'element', md: 'component' }}
            >
                {children}
            </Box>
        </Flex>
    );
}

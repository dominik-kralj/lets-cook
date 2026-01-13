import { Box, Spinner } from '@chakra-ui/react';

import { DashboardLayout } from '@/app/dashboard/components/DashsboardLayout';

function Loading() {
    return (
        <DashboardLayout>
            <Box display="flex" justifyContent="center" alignItems="center" h="calc(100vh - 200px)">
                <Spinner />
            </Box>
        </DashboardLayout>
    );
}

export default Loading;

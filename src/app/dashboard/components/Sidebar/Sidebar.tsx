import { Box, Drawer, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { RiMenuLine } from 'react-icons/ri';

import { SidebarContent } from './SidebarContent';

export function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box
                display={{ base: 'block', lg: 'none' }}
                position="fixed"
                top={4}
                right={4}
                zIndex={20}
            >
                <IconButton
                    aria-label="Open menu"
                    onClick={() => setOpen(true)}
                    bg="fills.surfaces.cardElevated"
                    borderWidth="1px"
                    borderColor="neutrals.10"
                    size="lg"
                    color="textAndIcons.onSurfaces.lead"
                >
                    <RiMenuLine size={24} />
                </IconButton>
            </Box>

            <Box
                display={{ base: 'none', lg: 'block' }}
                w="280px"
                bg="fills.surfaces.cardElevated"
                borderRight="1px solid"
                borderColor="neutrals.10"
                p="component"
            >
                <SidebarContent />
            </Box>

            <Drawer.Root
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
                placement="start"
                size="sm"
            >
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content bg="fills.surfaces.cardElevated" p="component">
                        <SidebarContent onClose={() => setOpen(false)} />
                    </Drawer.Content>
                </Drawer.Positioner>
            </Drawer.Root>
        </>
    );
}

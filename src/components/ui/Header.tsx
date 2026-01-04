import { Box, Heading, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { GiChefToque } from 'react-icons/gi';

interface HeaderProps {
    children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
    return (
        <Box as="header" borderBottomWidth="1px" p={6} bg="fills.surfaces.card" w="100%">
            <HStack maxW="container.xl" mx="auto" justify="space-between">
                <Link href="/">
                    <HStack gap={2}>
                        <Box color="fills.actionsBrandStrong.default" fontSize="2xl">
                            <GiChefToque />
                        </Box>

                        <Heading as="h1" fontSize="2xl" color="textAndIcons.onSurfaces.lead">
                            Let&apos;s Cook
                        </Heading>
                    </HStack>
                </Link>
                {children && <HStack gap={4}>{children}</HStack>}
            </HStack>
        </Box>
    );
}

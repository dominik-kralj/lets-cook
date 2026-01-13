import { Box, Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { GiChefToque } from 'react-icons/gi';

interface AuthLayoutProps {
    children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <VStack gap={0} flex="1" w="100%">
            <Link href="/">
                <HStack gap={2} py={4}>
                    <Box color="fills.actionsBrandStrong.default" fontSize="2xl">
                        <GiChefToque />
                    </Box>

                    <Heading as="h1" fontSize="2xl" color="textAndIcons.onSurfaces.lead">
                        Let&apos;s Cook
                    </Heading>
                </HStack>
            </Link>

            <Flex alignItems="center" justifyContent="center" flex="1" w="100%">
                {children}
            </Flex>
        </VStack>
    );
}

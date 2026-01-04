'use client';

import { Box, Flex, Heading, HStack, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { GiChefToque } from 'react-icons/gi';

import { Login } from './components/Login';
import { Signup } from './components/Signup';

export default function Auth() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

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
                {mode === 'login' ? <Login /> : <Signup />}
            </Flex>
        </VStack>
    );
}

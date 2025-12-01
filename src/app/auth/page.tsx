'use client';

import { Flex } from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';

import { Header } from '@/components/ui/Header';

import { Login } from './components/Login';
import { Signup } from './components/Signup';

export default function Auth() {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');

    return (
        <>
            <Header />
            <Flex alignItems="center" justifyContent="center" flex="1">
                {mode === 'login' ? <Login /> : <Signup />}
            </Flex>
        </>
    );
}

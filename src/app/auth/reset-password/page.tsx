'use client';

import { Flex } from '@chakra-ui/react';
import { Suspense } from 'react';

import { Header } from '@/components/ui/Header';

import { ResetPassword } from '../components/ResetPassword';

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={null}>
            <Header />
            <Flex alignItems="center" justifyContent="center" flex="1">
                <ResetPassword />
            </Flex>
        </Suspense>
    );
}

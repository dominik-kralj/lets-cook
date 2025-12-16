'use client';

import { Flex } from '@chakra-ui/react';

import { Header } from '@/components/ui/Header';

import { ForgotPassword } from '../components/ForgotPassword';

export default function ForgotPasswordPage() {
    return (
        <>
            <Header />
            <Flex alignItems="center" justifyContent="center" flex="1">
                <ForgotPassword />
            </Flex>
        </>
    );
}

'use client';

import { Button, Card, HStack } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';

import { logoutAction } from '@/app/auth/actions';

export function Logout() {
    return (
        <Card.Root>
            <Card.Header>
                <HStack gap="tight">
                    <LuLogOut size={20} />
                    <Card.Title>Account Actions</Card.Title>
                </HStack>
                <Card.Description>Sign out of your account</Card.Description>
            </Card.Header>
            <Card.Body>
                <form action={logoutAction}>
                    <Button type="submit" variant="outline">
                        Log Out
                    </Button>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

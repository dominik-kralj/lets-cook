'use client';

import { Button, Card } from '@chakra-ui/react';

import { logoutAction } from '../actions';

export function Logout() {
    return (
        <Card.Root maxW="3xl">
            <Card.Header>
                <Card.Title>Account Actions</Card.Title>
                <Card.Description>Sign out of your account</Card.Description>
            </Card.Header>

            <Card.Body>
                <form action={logoutAction}>
                    <Button type="submit" variant="outline" colorPalette="red">
                        Log Out
                    </Button>
                </form>
            </Card.Body>
        </Card.Root>
    );
}

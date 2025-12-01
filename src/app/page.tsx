import { Container } from '@chakra-ui/react';

import { Body } from '@/components/homepage/Body';
import { Header } from '@/components/homepage/Header';

export default function Home() {
    return (
        <Container p={0} maxW="100%">
            <Header />

            <Body />
        </Container>
    );
}

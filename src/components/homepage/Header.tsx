import { Container } from '@chakra-ui/react';

import { Image } from '../ui/Image';

export default function Header() {
    return (
        <Container as="header" p={0} maxWidth="100%">
            <Image src="/images/hero.jpg" alt="Hero" fill containerProps={{ h: '600px' }} />
        </Container>
    );
}

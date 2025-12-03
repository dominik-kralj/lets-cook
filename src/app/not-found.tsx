import { Button, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';

import { Link } from '@/components/ui/Link';

export default function NotFound() {
    return (
        <Flex alignItems="center" justifyContent="center" flex="1" minH="100vh">
            <Container maxW="md">
                <VStack gap="section" textAlign="center">
                    <VStack gap="component">
                        <Heading
                            as="h1"
                            fontSize="8xl"
                            color="fills.actionsBrandStrong.default"
                            fontWeight="bold"
                        >
                            404
                        </Heading>

                        <Heading as="h2" fontSize="3xl" color="textAndIcons.onSurfaces.lead">
                            Page Not Found
                        </Heading>

                        <Text color="textAndIcons.onSurfaces.helper" fontSize="lg">
                            The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        </Text>
                    </VStack>

                    <Link href="/" textDecoration="none">
                        <Button size="lg">Back to Home</Button>
                    </Link>
                </VStack>
            </Container>
        </Flex>
    );
}

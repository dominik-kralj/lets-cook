import { Box, Button, Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { RiArrowRightLine } from 'react-icons/ri';

import { Image } from '../ui/Image';
import { Link } from '../ui/Link';

export function Header() {
    return (
        <Container as="header" p={0} maxWidth="100%" position="relative">
            <Image
                src="/images/hero.jpg"
                alt="Delicious home-cooked meal showcasing recipe management"
                fill
                containerProps={{ h: '600px' }}
                preload={true}
            />

            <Box
                position="absolute"
                inset="0"
                bgGradient="to-b"
                gradientFrom="transparent"
                gradientVia="fills.surfaces.background/60"
                gradientTo="fills.surfaces.background"
            />

            <Flex
                position="absolute"
                inset="0"
                alignItems="center"
                justifyContent="center"
                flexDir="column"
                gap="component"
            >
                <VStack gap="component" textAlign="center" color="textAndIcons.onSurfaces.lead">
                    <Heading as="h1" fontSize="displayLg" fontWeight="bold">
                        Let&apos;s Cook
                    </Heading>

                    <Text fontSize="lead" maxW="2xl" color="textAndIcons.onSurfaces.helper">
                        Your recipes, perfectly organized. Save, share, and cook with ease.
                    </Text>
                </VStack>

                <HStack gap="element">
                    <Button borderRadius="xl" asChild color="textAndIcons.onSurfaces.lead">
                        <Link href="/auth?mode=signup" textDecoration="none">
                            Start Cooking
                            <RiArrowRightLine />
                        </Link>
                    </Button>

                    <Button variant="outline" borderRadius="xl" asChild>
                        <Link href="/auth?mode=login" textDecoration="none">
                            Login
                        </Link>
                    </Button>
                </HStack>
            </Flex>
        </Container>
    );
}

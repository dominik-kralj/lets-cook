import { Box, Button, Container, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { RiArrowRightLine } from 'react-icons/ri';

import { Image } from '../ui/Image';

export function Header() {
    return (
        <Container as="header" p={0} maxWidth="100%" position="relative">
            <Image src="/images/hero.jpg" alt="Hero" fill containerProps={{ h: '600px' }} />

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
                    <Heading as="h1" fontSize={{ base: '4xl', md: '6xl' }} fontWeight="bold">
                        Let&apos;s Cook
                    </Heading>

                    <Text
                        fontSize={{ base: 'lg', md: 'xl' }}
                        maxW="2xl"
                        color="textAndIcons.onSurfaces.helper"
                    >
                        Your recipes, perfectly organized. Save, share, and cook with ease.
                    </Text>
                </VStack>

                <HStack gap="element">
                    <Button>
                        Start Cooking
                        <RiArrowRightLine />
                    </Button>
                    <Button variant="outline">Login</Button>
                </HStack>
            </Flex>
        </Container>
    );
}

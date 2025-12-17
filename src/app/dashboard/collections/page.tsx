'use client';

import { Box, Container, Grid, Heading, HStack, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
import { RiFolder2Line } from 'react-icons/ri';

import { useCollections } from '@/hooks/useCollections';
import { Collection } from '@/types/collection';

import { DashboardLayout } from '../components/DashsboardLayout';
import { AddCollectionDialog } from './components/AddCollectionDialog';
import { CollectionCard } from './components/CollectionCard';

export default function CollectionsPage() {
    const { collections, isLoading, mutate } = useCollections();

    if (isLoading) {
        return (
            <DashboardLayout>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    h="calc(100vh - 200px)"
                >
                    <Spinner />
                </Box>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <Container maxW="6xl" px={{ base: 'component', md: 'section' }}>
                <VStack align="stretch" gap="component">
                    <HStack
                        justify="space-between"
                        align={{ base: 'stretch', md: 'start' }}
                        flexDir={{ base: 'column', md: 'row' }}
                        gap="component"
                    >
                        <Box>
                            <Heading
                                as="h1"
                                fontSize={{ base: '2xl', md: '3xl' }}
                                color="textAndIcons.onSurfaces.lead"
                                mb="tight"
                            >
                                Collections
                            </Heading>
                            <Text color="textAndIcons.onSurfaces.helper">
                                Organize your recipes into collections
                            </Text>
                        </Box>
                        <Box
                            w={{ base: 'full', md: 'auto' }}
                            display="flex"
                            justifyContent="center"
                        >
                            <AddCollectionDialog onCollectionAdd={mutate} />
                        </Box>
                    </HStack>

                {collections && collections.length > 0 ? (
                    <Grid
                        templateColumns={{
                            base: '1fr',
                            md: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                        }}
                        gap="component"
                    >
                        {collections.map((collection: Collection) => (
                            <CollectionCard
                                key={collection.id}
                                collection={collection}
                                onCollectionDelete={mutate}
                                onCollectionEdit={mutate}
                            />
                        ))}
                    </Grid>
                ) : (
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        py="section"
                        textAlign="center"
                    >
                        <Icon fontSize="6xl" color="textAndIcons.onSurfaces.subdued" mb="component">
                            <RiFolder2Line />
                        </Icon>
                        <Heading
                            as="h3"
                            fontSize="xl"
                            color="textAndIcons.onSurfaces.lead"
                            mb="tight"
                        >
                            No collections yet
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper" mb="component" maxW="md">
                            Start organizing your recipes by creating your first collection
                        </Text>
                    </Box>
                )}
                </VStack>
            </Container>
        </DashboardLayout>
    );
}

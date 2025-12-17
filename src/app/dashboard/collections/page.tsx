'use client';

import { Box, Flex, Grid, Heading, Icon, Spinner, Text, VStack } from '@chakra-ui/react';
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
            <VStack align="stretch" gap="component">
                <Flex justify="space-between" align="start" gap="component">
                    <Box>
                        <Heading
                            as="h1"
                            fontSize="3xl"
                            color="textAndIcons.onSurfaces.lead"
                            mb="tight"
                        >
                            Collections
                        </Heading>
                        <Text color="textAndIcons.onSurfaces.helper">
                            Organize your recipes into collections
                        </Text>
                    </Box>
                    <AddCollectionDialog onCollectionAdd={mutate} />
                </Flex>

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
        </DashboardLayout>
    );
}

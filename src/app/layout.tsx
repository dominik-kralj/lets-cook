import { VStack } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { inter } from '@/assets/font';
import { Provider } from '@/components/chakra-ui/provider';
import { Toaster } from '@/components/chakra-ui/toaster';

export const metadata: Metadata = {
    title: "Let's Cook - Your Personal Recipe Management System",
    description:
        'Organize, collect, and discover your favorite recipes. Create collections, mark favorites, and search through your personal recipe library with ease.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body style={{ minHeight: '100vh', margin: 0 }}>
                <Provider>
                    <VStack as="main" bg="fills.surfaces.background" minH="100vh" gap={0}>
                        {children}
                    </VStack>

                    <Toaster />
                </Provider>
            </body>
        </html>
    );
}

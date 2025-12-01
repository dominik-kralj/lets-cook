import { Flex } from '@chakra-ui/react';
import type { Metadata } from 'next';

import { inter } from '@/assets/font';
import { Provider } from '@/components/chakra-ui/provider';
import { Footer } from '@/components/homepage/Footer';

export const metadata: Metadata = {
    title: "Let's Cook!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body>
                <Provider>
                    <Flex direction="column" bg="fills.surfaces.background" minH="100vh">
                        {children}
                        <Footer />
                    </Flex>
                </Provider>
            </body>
        </html>
    );
}

import type { Metadata } from 'next';

import { Provider } from '@/components/chakra-ui/provider';

export const metadata: Metadata = {
    title: "Let's Cook!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}

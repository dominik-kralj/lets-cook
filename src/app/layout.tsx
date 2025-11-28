import type { Metadata } from 'next';

import { Provider } from '@/components/chakra-ui/provider';
import { inter } from '@/assets/font';

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
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}

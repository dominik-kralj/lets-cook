import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

interface LinkProps extends Omit<ChakraLinkProps, 'href'>, Pick<NextLinkProps, 'href'> {
    children: ReactNode;
}

export function Link({ href, children, ...chakraProps }: LinkProps) {
    return (
        <ChakraLink asChild {...chakraProps}>
            <NextLink href={href}>{children}</NextLink>
        </ChakraLink>
    );
}

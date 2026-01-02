'use client';

import { Box } from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface FeatureIconProps {
    Icon: IconType;
    ariaLabel: string;
    size?: number;
}

export function FeatureIcon({ Icon, ariaLabel, size = 6 }: FeatureIconProps) {
    return (
        <Box
            p={3}
            bg="fills.actionsBrandStrong.default"
            borderRadius="lg"
            color="textAndIcons.onControlsBrand.default"
            aria-label={ariaLabel}
            role="img"
        >
            <Box as={Icon} boxSize={size} aria-hidden="true" />
        </Box>
    );
}
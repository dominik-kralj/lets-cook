export const semanticTokens = {
    colors: {
        fills: {
            actionsBrandStrong: {
                default: {
                    value: { base: '{colors.primary.40}', _dark: '{colors.primary.40}' },
                },
                disabled: {
                    value: { base: '{colors.primary.2}', _dark: '{colors.primary.70}' },
                },
                hover: {
                    value: { base: '{colors.primary.15}', _dark: '{colors.primary.15}' },
                },
                pressed: {
                    value: { base: '{colors.secondary.45}', _dark: '{colors.secondary.40}' },
                },
                destructive: {
                    value: { base: '{colors.error.45}', _dark: '{colors.error.40}' },
                },
                disabledDestructive: {
                    value: { base: '{colors.error.15}', _dark: '{colors.error.70}' },
                },
                hoverDestructive: {
                    value: { base: '{colors.error.60}', _dark: '{colors.error.15}' },
                },
            },
            actionsBrandWeak: {
                default: {
                    value: { base: '{colors.neutrals.80}', _dark: '{colors.neutrals.1}' },
                },
                hover: {
                    value: { base: '{colors.neutrals.2}', _dark: '{colors.neutrals.80}' },
                },
                pressed: {
                    value: { base: '{colors.secondary.2}', _dark: '{colors.neutrals.70}' },
                },
            },
            controlsBrand: {
                default: {
                    value: { base: '{colors.neutrals.90}', _dark: '{colors.primary.40}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.10}', _dark: '{colors.primary.70}' },
                },
                hover: {
                    value: { base: '{colors.neutrals.40}', _dark: '{colors.primary.15}' },
                },
                pressed: {
                    value: { base: '{colors.secondary.45}', _dark: '{colors.secondary.40}' },
                },
            },
            controlsNeutral: {
                activeOnBackground: {
                    value: { base: '{colors.neutrals.5}', _dark: '{colors.neutrals.60}' },
                },
                activeOnFill: {
                    value: { base: '{colors.neutrals.0}', _dark: '{colors.neutrals.60}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.2}', _dark: '{colors.neutrals.90}' },
                },
                error: {
                    value: { base: '{colors.error.2}', _dark: '{colors.neutrals.80}' },
                },
                hover: {
                    value: { base: '{colors.neutrals.1}', _dark: '{colors.neutrals.70}' },
                },
                inactive: {
                    value: { base: '{colors.neutrals.2}', _dark: '{colors.neutrals.80}' },
                },
                inactiveInverted: {
                    value: { base: '{colors.neutrals.80}', _dark: '{colors.neutrals.2}' },
                },
            },
            surfaces: {
                avatar: {
                    value: { base: '{colors.neutrals.10}', _dark: '{colors.neutrals.50}' },
                },
                background: {
                    value: { base: '{colors.neutrals.5}', _dark: '{colors.neutrals.90}' },
                },
                card: {
                    value: { base: '{colors.neutrals.2}', _dark: '{colors.neutrals.90}' },
                },
                cardElevated: {
                    value: { base: '{colors.neutrals.0}', _dark: '{colors.neutrals.80}' },
                },
                pressed: {
                    value: { base: '{colors.secondary.2}', _dark: '{colors.neutrals.70}' },
                },
            },
        },
        textAndIcons: {
            onActionsBrandPrimary: {
                default: {
                    value: { base: '{colors.neutrals.100}', _dark: '{colors.neutrals.100}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.100}', _dark: '{colors.neutrals.100}' },
                },
            },
            onActionsBrandTertiary: {
                pressed: {
                    value: { base: '{colors.secondary.45}', _dark: '{colors.secondary.40}' },
                },
            },
            onActionsNeutralGhost: {
                default: {
                    value: { base: '{colors.neutrals.80}', _dark: '{colors.neutrals.0}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.15}', _dark: '{colors.neutrals.50}' },
                },
            },
            onControlsBrand: {
                default: {
                    value: { base: '{colors.neutrals.0}', _dark: '{colors.neutrals.100}' },
                },
            },
            onControlsNeutral: {
                default: {
                    value: { base: '{colors.neutrals.80}', _dark: '{colors.neutrals.0}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.30}', _dark: '{colors.neutrals.50}' },
                },
                error: {
                    value: { base: '{colors.error.45}', _dark: '{colors.error.40}' },
                },
                placeholder: {
                    value: { base: '{colors.neutrals.40}', _dark: '{colors.neutrals.30}' },
                },
            },
            onSurfaces: {
                helper: {
                    value: { base: '{colors.neutrals.45}', _dark: '{colors.neutrals.30}' },
                },
                lead: {
                    value: { base: '{colors.neutrals.80}', _dark: '{colors.neutrals.0}' },
                },
            },
        },
        outlines: {
            withActionsBrandWeak: {
                default: {
                    value: { base: '{colors.neutrals.15}', _dark: '{colors.primary.40}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.10}', _dark: '{colors.primary.70}' },
                },
                focus: {
                    value: { base: '{colors.neutrals.10}', _dark: '{colors.neutrals.50}' },
                },
                pressed: {
                    value: { base: '{colors.secondary.15}', _dark: '{colors.secondary.40}' },
                },
            },
            withControlsNeutral: {
                default: {
                    value: { base: '{colors.neutrals.30}', _dark: '{colors.neutrals.30}' },
                },
                disabled: {
                    value: { base: '{colors.neutrals.10}', _dark: '{colors.neutrals.50}' },
                },
                error: {
                    value: { base: '{colors.error.60}', _dark: '{colors.error.40}' },
                },
                focusHeavy: {
                    value: { base: '{colors.neutrals.10}', _dark: '{colors.neutrals.50}' },
                },
                focusLight: {
                    value: { base: '{colors.neutrals.50}', _dark: '{colors.neutrals.0}' },
                },
                hover: {
                    value: { base: '{colors.neutrals.40}', _dark: '{colors.neutrals.15}' },
                },
                pressed: {
                    value: { base: '{colors.neutrals.50}', _dark: '{colors.neutrals.0}' },
                },
            },
        },
    },
};

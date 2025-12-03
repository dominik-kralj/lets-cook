export const AUTH_ERRORS = {
    EMAIL_IN_USE: 'This email is already registered',
    USERNAME_TAKEN: 'This username is already taken',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ACCOUNT_CREATION_FAILED: 'Failed to create account. Please try again.',
    GENERIC: 'Something went wrong. Please try again.',
} as const;

export type AuthErrorType = keyof typeof AUTH_ERRORS;

export const getAuthError = (type: AuthErrorType) => AUTH_ERRORS[type];

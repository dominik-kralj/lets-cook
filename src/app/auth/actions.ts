'use server';

import { AUTH_ERRORS } from '@/lib/errors';
import prisma from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';
import { type LoginDto, loginSchema, type SignupDto, signupSchema } from '@/models/user';

export async function signupAction(data: SignupDto) {
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        return {
            error: result.error.issues[0].message,
        };
    }

    const { username, email, password } = result.data;

    // Check for existing user
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (existingUser) {
        return {
            error:
                existingUser.email === email
                    ? AUTH_ERRORS.EMAIL_IN_USE
                    : AUTH_ERRORS.USERNAME_TAKEN,
            field: existingUser.email === email ? 'email' : 'username',
        };
    }

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
            },
        },
    });

    if (authError) {
        return {
            error: authError.message,
        };
    }

    if (authData.user) {
        try {
            await prisma.user.create({
                data: {
                    id: authData.user.id,
                    username,
                    email,
                },
            });
        } catch (error) {
            console.error('Failed to create user record:', error);

            return {
                error: AUTH_ERRORS.ACCOUNT_CREATION_FAILED,
            };
        }
    }

    return { success: true };
}

export async function loginAction(data: LoginDto) {
    const result = loginSchema.safeParse(data);

    if (!result.success) {
        return {
            error: result.error.issues[0].message,
        };
    }

    const { email, password } = result.data;

    const supabase = await createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (authError) {
        return {
            error: AUTH_ERRORS.INVALID_CREDENTIALS,
        };
    }

    return { success: true };
}

export async function logoutAction() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
        return {
            error: error.message,
        };
    }

    return { success: true };
}

export async function forgotPasswordAction(email: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
        return {
            error: error.message,
        };
    }

    return { success: true };
}

export async function resetPasswordAction(newPassword: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) {
        return {
            error: error.message,
        };
    }

    return { success: true };
}

export async function resendConfirmationEmailAction(email: string) {
    const supabase = await createClient();

    const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
    });

    if (error) {
        return { error: error.message };
    }

    return { success: true };
}

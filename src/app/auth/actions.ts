'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { AUTH_ERRORS } from '@/lib/errors';
import prisma from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';
import { LoginFormData, loginSchema, SignupFormData, signupSchema } from '@/models/user';

export async function signupAction(data: SignupFormData) {
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        return {
            error: result.error.issues[0].message,
        };
    }

    const { username, email, password } = result.data;

    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.toLowerCase();

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ username: normalizedUsername }, { email: normalizedEmail }],
        },
    });

    if (existingUser) {
        return {
            error:
                existingUser.email === normalizedEmail
                    ? AUTH_ERRORS.EMAIL_IN_USE
                    : AUTH_ERRORS.USERNAME_TAKEN,
            field: existingUser.email === normalizedEmail ? 'email' : 'username',
        };
    }

    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
            data: {
                username: normalizedUsername,
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
                    username: normalizedUsername,
                    email: normalizedEmail,
                },
            });
        } catch (error: any) {
            console.error('Failed to create user record:', error);

            if (error.code === 'P2002') {
                const field = error.meta?.target?.[0];
                return {
                    error:
                        field === 'email' ? AUTH_ERRORS.EMAIL_IN_USE : AUTH_ERRORS.USERNAME_TAKEN,
                    field,
                };
            }

            return {
                error: AUTH_ERRORS.ACCOUNT_CREATION_FAILED,
            };
        }
    }

    return { success: true };
}

export async function loginAction(data: LoginFormData) {
    const result = loginSchema.safeParse(data);

    if (!result.success) {
        return {
            error: result.error.issues[0].message,
        };
    }

    const { email, password } = result.data;

    const normalizedEmail = email.toLowerCase().trim();

    const supabase = await createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
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
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
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

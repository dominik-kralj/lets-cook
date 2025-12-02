'use server';

import { createClient } from '@/lib/supabase/server';
import { type LoginField, loginSchema, type SignupField, signupSchema } from '@/models/user';

export async function signupAction(data: SignupField) {
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        return {
            error: result.error.issues[0].message,
        };
    }

    const { username, email, password } = result.data;

    const supabase = await createClient();

    const { error: authError } = await supabase.auth.signUp({
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

    return { success: true };
}

export async function loginAction(data: LoginField) {
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
            error: 'Invalid email or password',
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

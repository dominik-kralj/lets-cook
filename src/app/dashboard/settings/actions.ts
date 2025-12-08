'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import db from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';

export async function changeEmailAction(newEmail: string) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const { error } = await supabase.auth.updateUser({
            email: newEmail,
        });

        if (error) {
            return { error: error.message };
        }

        await db.user.update({
            where: { id: user.id },
            data: { email: newEmail },
        });

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/profile');

        return { success: true };
    } catch (error: any) {
        console.error('Error changing email:', error);
        return { error: 'Failed to change email' };
    }
}

export async function changePasswordAction(currentPassword: string, newPassword: string) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email!,
            password: currentPassword,
        });

        if (signInError) {
            return { error: 'Current password is incorrect' };
        }

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            return { error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        console.error('Error changing password:', error);
        return { error: 'Failed to change password' };
    }
}

export async function deleteAccountAction() {
    console.log('[deleteAccountAction] Starting...');

    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        console.log('[deleteAccountAction] No user found - unauthorized');
        return { error: 'Unauthorized' };
    }

    try {
        console.log('[deleteAccountAction] Deleting from database...');
        await db.user.delete({
            where: { id: user.id },
        });
        console.log('[deleteAccountAction] Database deletion successful');

        console.log('[deleteAccountAction] Signing out...');
        await supabase.auth.signOut();
        console.log('[deleteAccountAction] Sign out successful');
    } catch (error: any) {
        console.error('[deleteAccountAction] Error in try block:', error);
        return { error: 'Failed to delete account' };
    }

    console.log('[deleteAccountAction] About to redirect...');
    revalidatePath('/', 'layout');
    redirect('/');
}

export async function logoutAction() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}

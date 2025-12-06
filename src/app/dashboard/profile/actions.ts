'use server';

import { revalidatePath } from 'next/cache';

import db from '@/lib/prisma/db';
import { createClient } from '@/lib/supabase/server';
import { UpdateProfileFormData } from '@/models/user';

export async function updateProfileAction(data: Partial<UpdateProfileFormData>) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        if (data.email && data.email !== user.email) {
            const { error: emailError } = await supabase.auth.updateUser({
                email: data.email,
            });

            if (emailError) {
                return { error: emailError.message };
            }
        }

        const { username, email, bio, avatar } = data;

        await db.user.update({
            where: { id: user.id },
            data: {
                username,
                email,
                bio,
                avatar,
            },
        });

        revalidatePath('/dashboard/profile');

        return { success: true };
    } catch (error: any) {
        console.error('Error updating profile:', error);

        if (error.code === 'P2002') {
            const field = error.meta?.target?.[0];
            if (field === 'username') {
                return { error: 'This username is already taken' };
            }
            if (field === 'email') {
                return { error: 'This email is already registered' };
            }
        }

        return { error: 'Failed to update profile' };
    }
}

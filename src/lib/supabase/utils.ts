import { createClient } from '@/lib/supabase/client';

export async function uploadAvatar(file: File, userId: string): Promise<string | null> {
    const supabase = createClient();

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = fileName;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
    });

    if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);

    return data.publicUrl;
}

export async function deleteAvatar(avatarUrl: string): Promise<boolean> {
    const supabase = createClient();

    const path = avatarUrl.split('/storage/v1/object/public/avatars/')[1];

    if (!path) return false;

    const { error } = await supabase.storage.from('avatars').remove([`avatars/${path}`]);

    return !error;
}

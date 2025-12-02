'use server';

import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { signupSchema } from '@/models/user';

export async function signupAction(formData: FormData) {
    const data = {
        username: formData.get('username'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
    };

    // Validate with Zod
    const result = signupSchema.safeParse(data);

    if (!result.success) {
        return {
            error: result.error.errors[0].message,
        };
    }

    const { username, email, password } = result.data;

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { username }],
        },
    });

    if (existingUser) {
        return {
            error: existingUser.email === email ? 'Email already in use' : 'Username already taken',
        };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    try {
        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        // Redirect to login after successful signup
        redirect('/auth?mode=login');
    } catch (error) {
        return {
            error: 'Failed to create account. Please try again.',
        };
    }
}

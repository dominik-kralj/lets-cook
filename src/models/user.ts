import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signupSchema = z
    .object({
        username: z
            .string()
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be at most 20 characters')
            .regex(
                /^[a-zA-Z0-9_]+$/,
                'Username can only contain letters, numbers, and underscores',
            ),
        email: z.email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type LoginField = z.infer<typeof loginSchema>;
export type SignupField = z.infer<typeof signupSchema>;

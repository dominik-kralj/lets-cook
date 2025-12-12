import { z } from 'zod';

export const recipeSchema = z.object({
    title: z
        .string()
        .min(1, 'Recipe title is required')
        .max(100, 'Recipe title must be less than 100 characters'),
    description: z.string().optional(),
    cookTime: z
        .string()
        .min(1, 'Cook time is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Cook time must be a positive number',
        }),
    imageUrl: z.string().optional(),
    ingredients: z
        .array(
            z.object({
                value: z.string().min(1, 'Ingredient cannot be empty'),
            }),
        )
        .min(1, 'At least one ingredient is required'),
    instructions: z
        .array(
            z.object({
                value: z.string().min(1, 'Instruction cannot be empty'),
            }),
        )
        .min(1, 'At least one instruction is required'),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;

export const defaultRecipeValues: RecipeFormData = {
    title: '',
    description: '',
    cookTime: '',
    imageUrl: '',
    ingredients: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
    instructions: [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
};

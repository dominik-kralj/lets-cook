import { z } from 'zod';

export const collectionSchema = z.object({
    name: z
        .string()
        .min(1, 'Collection name is required')
        .max(100, 'Collection name must be less than 100 characters'),
    description: z.string().optional(),
});

export type CollectionFormData = z.infer<typeof collectionSchema>;

export const defaultCollectionValues: CollectionFormData = {
    name: '',
    description: '',
};

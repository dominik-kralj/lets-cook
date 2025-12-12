export interface Recipe {
    id: string;
    title: string;
    description?: string;
    cookTime: string;
    imageUrl?: string;
    ingredients: { value: string }[];
    instructions: { value: string }[];
}

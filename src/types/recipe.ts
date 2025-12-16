export interface Recipe {
    id: string;
    title: string;
    cookTime: number;
    ingredients: string[];
    instructions: string[];
    isFavorite: boolean;
    description?: string;
    imageUrl?: string;
}

import { Recipe } from './recipe';

export interface Collection {
    id: string;
    name: string;
    description?: string;
    recipes?: Recipe[];
    recipeCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

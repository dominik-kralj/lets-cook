export interface UserProfile {
    id: string;
    email: string;
    username: string;
    createdAt: string;
    bio?: string;
    statistics: {
        recipes: number;
        collections: number;
        favorites: number;
    };
}

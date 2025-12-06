export const formatDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

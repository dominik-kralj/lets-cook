export const formatDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};

export const validateImageFile = (file: File, options = { maxSizeMB: 2 }) => {
    if (!file.type.startsWith('image/')) {
        return {
            valid: false,
            error: 'Please upload an image file',
        };
    }

    const maxSize = options.maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        return {
            valid: false,
            error: `Please upload an image smaller than ${options.maxSizeMB}MB`,
        };
    }

    return { valid: true };
};

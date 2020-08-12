export const findIdOfResourceSelfLink = (href: string): string | null => {
    if (href) {
        console.log('finding id of resource by self link:', href);
        const segments = href.split('/');
        return segments[segments.length - 1];
    } else {
        console.warn('resource by self link was empty');
    }
    return null;
} 
export const isObject = (obj: any) =>
    typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

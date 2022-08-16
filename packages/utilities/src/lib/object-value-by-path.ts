export const objectValueByPath = (key: string, obj: any) => {
    const splitted = key.split('.');
    const currKey = splitted.shift();

    const value = obj[currKey];

    if (splitted?.length) {
        return objectValueByPath(splitted.join('.'), value);
    }

    return value;
};

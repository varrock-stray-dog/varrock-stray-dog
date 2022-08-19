import { isObject } from '@sapphire/utilities';

export const getObjectPossiblePaths = (obj) => {
    const paths = [];
    const nodes = [
        {
            obj,
            path: [],
        },
    ];

    while (nodes.length > 0) {
        const n = nodes.pop();

        if (!n.obj) {
            continue;
        }

        for (const k of Object.keys(n.obj)) {
            const path = n.path.concat(k);

            if (isObject(n.obj[k])) {
                nodes.unshift({
                    obj: n.obj[k],
                    path: path,
                });
                continue;
            }

            paths.push(path);
        }
    }

    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        paths[i] = path.join('.');
    }

    return paths;
};

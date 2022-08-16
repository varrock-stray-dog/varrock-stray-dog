import { baseEnvironment } from './environment.base';

export const environment = {
    ...baseEnvironment,
    production: true,
    apiUrl: 'https://api.varrock-stray.dog/graphql',
};

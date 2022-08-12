/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

const api = ClientsModule.register([
    {
        name: 'API',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transport: Transport.REDIS,
        options: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    },
]);
@Module({
    imports: [api],
    exports: [api],
})
export class ApiModule {}

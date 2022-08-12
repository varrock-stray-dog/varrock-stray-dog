/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

const bot = ClientsModule.register([
    {
        name: 'BOT',
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
    imports: [bot],
    exports: [bot],
})
export class BotModule {}

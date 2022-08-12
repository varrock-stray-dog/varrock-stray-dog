/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';

import { BotModule } from './app/bot.module';

import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
        BotModule,
        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            transport: Transport.REDIS,
            options: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            },
        }
    );

    await app.listen();
}

bootstrap();

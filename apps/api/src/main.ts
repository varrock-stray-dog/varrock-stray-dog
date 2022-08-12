/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice({
        transport: Transport.REDIS,
        options: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        },
    });

    await app.startAllMicroservices();
    await app.listen(3000);
}

bootstrap();

import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PetsResolver } from './pets.resolver';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

@Module({
    imports: [PrismaModule],
    controllers: [PetsController],
    providers: [PetsService, PetsResolver],
})
export class PetsModule {}

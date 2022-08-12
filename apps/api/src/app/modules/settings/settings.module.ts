import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SettingsResolver } from './settings.resolver';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
    imports: [PrismaModule],
    controllers: [SettingsController],
    providers: [SettingsService, SettingsResolver],
})
export class SettingsModule {}

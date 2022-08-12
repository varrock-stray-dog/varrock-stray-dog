import { SystemService } from './system.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { BotModule } from '../../bot.module';
import { SystemController } from './system.controller';
import { SystemResolver } from './system.resolver';

@Module({
    imports: [BotModule],
    controllers: [SystemController],
    providers: [SystemService, SystemResolver],
})
export class SystemModule {}

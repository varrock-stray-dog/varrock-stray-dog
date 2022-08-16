/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { BotSharedModule } from '../../../shared.module';
import { SettingsSetCommands } from './commands/set.command';
import { SettingsShowCommands } from './commands/show.command';
import { SettingsEmbedService } from './services/embed.service';

@Module({
    imports: [BotSharedModule],
    providers: [
        SettingsEmbedService,
        SettingsShowCommands,
        SettingsSetCommands,
    ],
})
export class SettingsCommandsModule {}

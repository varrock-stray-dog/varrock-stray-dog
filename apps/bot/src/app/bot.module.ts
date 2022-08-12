import { Module } from '@nestjs/common';

import { GatewayIntentBits } from 'discord.js';
import { NecordModule } from 'necord';
import { ApiModule } from './api.module';
import { SystemController } from './controllers/system.controller';
import { commands } from './discord/commands';
import { events } from './discord/events';

@Module({
    imports: [
        NecordModule.forRoot({
            token: process.env.BOT_TOKEN,
            intents: [GatewayIntentBits.Guilds],
            development:
                process.env.NODE_ENV === 'development'
                    ? [process.env.DEVELOPMENT_GUILD_ID]
                    : false,
        }),
        ApiModule,
    ],
    controllers: [SystemController],
    providers: [...events, ...commands],
})
export class BotModule {}

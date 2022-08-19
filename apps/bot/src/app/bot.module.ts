import { Module } from '@nestjs/common';

import { GatewayIntentBits } from 'discord.js';
import { NecordExecutionContext, NecordModule } from 'necord';
import path from 'path';
import { I18nModule } from 'vsd-i18n';
import { SystemController } from './controllers/system.controller';
import { events } from './discord/events';
import { modules } from './discord/modules';
import { NecordMetaDataResolver } from './i18n.resolver';
import { BotSharedModule } from './shared.module';

@Module({
    imports: [
        NecordModule.forRoot({
            prefix: '!',
            token: process.env.BOT_TOKEN,
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.DirectMessages,
            ],
            development:
                process.env.NODE_ENV === 'development'
                    ? [process.env.DEVELOPMENT_GUILD_ID]
                    : false,
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en-US',
            loaderOptions: {
                path: path.join(process.cwd(), '/i18n/'),
                watch: true,
            },
            contexts: [
                {
                    type: 'necord',
                    getContext: (context: NecordExecutionContext) => {
                        console.log('Am I called?');

                        return context.getArgByIndex(0);
                    },
                },
            ],
            resolvers: [NecordMetaDataResolver],
        }),
        BotSharedModule,
        ...modules,
    ],
    controllers: [SystemController],
    providers: [...events],
})
export class BotModule {}

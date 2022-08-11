import { Module } from '@nestjs/common';

import { NecordModule } from 'necord';
import { commands } from './commands';
import { events } from './events';

@Module({
  imports: [
    NecordModule.forRoot({
      token:
        'NTQxNjY4OTQ5MzczNDg1MDc2.Gbnapt.mtKJB-oFz-Uje0NuwLLRdqsbF8H4DtGgzW1f-c',
      intents: ['Guilds'],
      development: ['541388259394060288'],
    }),
  ],
  controllers: [],
  providers: [...events, ...commands],
})
export class BotModule {}

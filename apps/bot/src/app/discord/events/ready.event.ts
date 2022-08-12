/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, Once } from 'necord';

@Injectable()
export class ReadyEvent {
    private readonly logger = new Logger(ReadyEvent.name);

    @Once('ready')
    public onReady(@Context() [client]: ContextOf<'ready'>) {
        this.logger.log(`Bot logged in as ${client.user.username}`);
    }
}

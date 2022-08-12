/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, of, timeout } from 'rxjs';

import { ApiStatus, BotStatus } from '@varrock-stray-dog/models';
import { systemSummary } from '@varrock-stray-dog/utilities';

@Injectable()
export class SystemService {
    constructor(@Inject('BOT') private _bot: ClientProxy) {}

    status(): Observable<ApiStatus> {
        const system = systemSummary();

        return this._bot
            .send(
                {
                    cmd: 'bot:system:status',
                },
                {}
            )
            .pipe(
                timeout(500),
                catchError(() => of(null)),
                map((bot: BotStatus) => ({
                    name: '🐶 Varrock Stray Dog',
                    url: 'https://varrock-stray.dog',
                    ...system,
                    bot,
                }))
            );
    }
}

/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BotStatus } from '@varrock-stray-dog/models';
import { systemSummary } from '@varrock-stray-dog/utilities';
import { Client } from 'discord.js';

@Controller()
export class SystemController {
    constructor(private readonly _client: Client) {}

    @MessagePattern({ cmd: 'bot:system:status' })
    status(): BotStatus {
        const system = systemSummary();
        return {
            guilds: this._client.guilds.cache.size,
            users: this._client.users.cache.size,
            ...system,
        };
    }
}

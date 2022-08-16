import { Controller, Logger } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';
import type { SettingsModel } from '@varrock-stray-dog/models';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
    private _logger: Logger = new Logger('Settings Controller');
    public constructor(private readonly _service: SettingsService) {}

    @MessagePattern({ cmd: 'api:settings:find-or-create' })
    async findOrCreate(guildId: string): Promise<SettingsModel> {
        this._logger.log('findOrCreate');
        return this._service.findOrCreate(guildId);
    }

    @MessagePattern({ cmd: 'api:settings:find-one' })
    async findOne(guildId: string): Promise<SettingsModel> {
        this._logger.log('findOne');
        return this._service.findOneByGuildId(guildId);
    }

    @MessagePattern({ cmd: 'api:settings:find-or-create-multiple' })
    async findOrCreateMultiple(guildIds: string[]): Promise<SettingsModel[]> {
        this._logger.log('findOrCreateMultiple');

        return Promise.all(
            guildIds.map((guildId) => this._service.findOrCreate(guildId))
        );
    }

    @MessagePattern({ cmd: 'api:settings:update' })
    update(data: SettingsModel) {
        this._logger.log('update');

        return this._service.update(data);
    }
}

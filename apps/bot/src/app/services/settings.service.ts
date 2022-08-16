import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SettingsModel } from '@varrock-stray-dog/models';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SettingsService {
    constructor(@Inject('API') private _api: ClientProxy) {}

    get(guildId) {
        const settings$ = this._api.send(
            {
                cmd: 'api:settings:find-or-create',
            },
            guildId
        );

        return lastValueFrom(settings$);
    }

    async getLanguage(guildId) {
        const settings = await this.get(guildId);
        return settings.language ?? 'en-US';
    }

    update(settings: SettingsModel) {
        const settings$ = this._api.send(
            {
                cmd: 'api:settings:update',
            },
            settings
        );

        return lastValueFrom(settings$);
    }
}

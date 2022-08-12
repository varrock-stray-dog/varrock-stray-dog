import { /* Logger,*/ NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { SettingsModel } from '@varrock-stray-dog/models';
import { SettingsService } from './settings.service';

@Resolver(() => SettingsModel)
export class SettingsResolver {
    // private _logger: Logger = new Logger('Settings Resolver');
    public constructor(private readonly _service: SettingsService) {}

    @Query(() => SettingsModel)
    async settings(@Args('guildId') guildId: string): Promise<SettingsModel> {
        const settings = await this._service.findOneByGuildId(guildId);
        if (!settings) {
            throw new NotFoundException(guildId);
        }
        return settings as any;
    }
}

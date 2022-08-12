/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Logger } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';
import {
    Context,
    createCommandGroupDecorator,
    Options,
    Subcommand,
} from 'necord';
import { SettingsSetDto } from '../options/settings/set.options';

export const SettingsCommandDecorator = createCommandGroupDecorator({
    name: 'settings',
    description: 'Settings commands',
});

@Injectable()
@SettingsCommandDecorator()
export class SettingsCommand {
    private readonly logger = new Logger(SettingsCommand.name);

    @Subcommand({
        name: 'set',
        description: 'Set a setting',
    })
    public async setSetting(
        @Context() [interaction]: [CommandInteraction],
        @Options() { category, setting, value }: SettingsSetDto
    ) {
        return interaction.reply({
            content: `Set command!!\nCategory: ${category}\nSetting: ${setting}\nValue: ${value}`,
        });
    }
}

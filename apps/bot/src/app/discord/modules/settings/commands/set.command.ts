import { Logger } from '@nestjs/common';
import { Context, Options, SlashCommandContext, Subcommand } from 'necord';
import { SettingsSetDto } from '../options/set.options';
import { SettingsCommandsDecorator } from '../settings.decorator';

@SettingsCommandsDecorator({ name: 'set', description: 'Set a setting' })
export class SettingsSetCommands {
    private readonly logger = new Logger(SettingsSetCommands.name);

    @Subcommand({
        name: 'pets',
        description: 'Set a pets setting',
    })
    public async setSetting(
        @Context() [interaction]: SlashCommandContext,
        @Options() { setting, value }: SettingsSetDto
    ) {
        return interaction.reply({
            content: `Set pet command!!\nSetting: ${setting}\nValue: ${value}`,
        });
    }
}

import { Logger } from '@nestjs/common';
import { objectValueByPath } from '@varrock-stray-dog/utilities';
import { Context, Options, SlashCommandContext, Subcommand } from 'necord';
import { SettingsService } from '../../../../services/settings.service';
import { loadingMessage } from '../../../../utils';
import { SettingsShowDto } from '../options/show.options';
import { SettingsEmbedService } from '../services/embed.service';
import { SettingsCommandsDecorator } from '../settings.decorator';

@SettingsCommandsDecorator()
export class SettingsShowCommands {
    private readonly _logger = new Logger(SettingsShowCommands.name);

    constructor(
        private _settingsService: SettingsService,
        private _settingsEmbedService: SettingsEmbedService
    ) {}

    @Subcommand({
        name: 'show',
        description: 'Show your settings',
    })
    public async setSetting(
        @Context() [interaction]: SlashCommandContext,
        @Options() { key }: SettingsShowDto
    ) {
        this._logger.log(`${interaction.user.tag} used settings.show command`);
        await interaction.reply({ content: loadingMessage() });

        const settings = await this._settingsService.get(interaction.guildId);

        let value = settings;
        if (key?.length) {
            value = objectValueByPath(key, value);
        }

        const embed = await this._settingsEmbedService.createSettingsEmbed(
            interaction,
            value,
            key
        );

        return interaction.editReply({
            content: '',
            embeds: [embed],
        });
    }
}

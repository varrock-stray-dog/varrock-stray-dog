import { Logger } from '@nestjs/common';
import { SettingsService } from 'apps/bot/src/app/services';
import { readdir } from 'fs/promises';
import { Context, Options, SlashCommandContext, Subcommand } from 'necord';
import path from 'path';
import { SettingsSetLanguageDto } from '../options/set.options';
import { SettingsCommandsDecorator } from '../settings.decorator';

@SettingsCommandsDecorator({ name: 'set', description: 'Set a setting' })
export class SettingsSetCommands {
    private readonly logger = new Logger(SettingsSetCommands.name);

    private _availableLanguages = ['en-US'];

    constructor(private _settingsService: SettingsService) {
        this._loadAvailableLanguages();
    }

    @Subcommand({
        name: 'language',
        description: 'Set the language settings',
    })
    public async setLanguage(
        @Context() [interaction]: SlashCommandContext,
        @Options() { language }: SettingsSetLanguageDto
    ) {
        if (this._availableLanguages.indexOf(language) === -1) {
            console.log(this._availableLanguages);
            return interaction.reply(
                `The language \`${language}\` is not available, please choose one of the following:
${this._availableLanguages.map((l) => `- ${l}`).join('\n')}`
            );
        }

        const settings = await this._settingsService.get(interaction.guildId);

        await this._settingsService.update({
            ...settings,
            language,
        });

        return interaction.reply({
            content: `Set language: ${language}`,
        });
    }

    private async _loadAvailableLanguages() {
        const files = await readdir(path.join(process.cwd(), 'i18n'), {
            withFileTypes: true,
        });
        this._availableLanguages = files
            .filter((file) => file.isDirectory())
            .map((d) => d.name);
    }
}

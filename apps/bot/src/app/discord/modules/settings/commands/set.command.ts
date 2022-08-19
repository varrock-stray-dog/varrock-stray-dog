import { Logger, UseInterceptors } from '@nestjs/common';
import { settingsKeyValidation } from '@varrock-stray-dog/models';
import { setObjectValueByPath } from '@varrock-stray-dog/utilities';
import { Context, Options, SlashCommandContext, Subcommand } from 'necord';
import { I18nService, SettingsService } from '../../../../services';
import { keyPathToName } from '../constants';
import { SetAutocompleteInterceptor } from '../interceptors/set.interceptor';
import { SettingsSetDto } from '../options/set.options';
import { SettingsCommandsDecorator } from '../settings.decorator';
@SettingsCommandsDecorator()
export class SettingsSetCommands {
    private readonly _logger = new Logger(SettingsSetCommands.name);

    constructor(
        private _settingsService: SettingsService,
        private _i18n: I18nService
    ) {}

    @UseInterceptors(SetAutocompleteInterceptor)
    @Subcommand({
        name: 'set',
        description: 'Set a setting',
    })
    public async setLanguage(
        @Context() [interaction]: SlashCommandContext,
        @Options() { key, value }: SettingsSetDto
    ) {
        this._logger.log(`${interaction.user.tag} used settings.set command`);

        const keySplitted = key.split('.');

        let validation = settingsKeyValidation;
        for (const child of keySplitted) {
            validation = validation.shape[child];
        }

        const valid = validation.run(value);

        this._i18n.setInteraction(interaction);

        if (!valid.success) {
            if (key === 'language') {
                const translatedError = await this._i18n.translate(
                    'settings.set.errors.language',
                    { value }
                );
                return interaction.reply(translatedError);
            }

            const translatedError = await this._i18n.translate(
                'settings.set.errors.boolean'
            );
            return interaction.reply(translatedError);
        }

        if (key.endsWith('role')) {
            const role = await interaction.guild.roles.fetch(value);
            if (!role) {
                const translatedError = await this._i18n.translate(
                    'settings.set.errors.role'
                );
                return interaction.reply(translatedError);
            }
        }

        const settings = await this._settingsService.get(interaction.guildId);
        const newSettings = setObjectValueByPath(settings, key, valid.value);

        await this._settingsService.update(newSettings);

        const translatedSuccess = await this._i18n.translate(
            'settings.set.success',
            {
                path: keyPathToName(key, false),
                value,
            }
        );
        return interaction.reply(translatedSuccess);
    }
}

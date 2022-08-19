import { Injectable } from '@nestjs/common';
import { languageOptions } from '@varrock-stray-dog/models';
import { getObjectPossiblePaths } from '@varrock-stray-dog/utilities';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from 'necord';
import { SettingsService } from '../../../../services';
import { bannedSettingsKeys, keyPathToName } from '../constants';

@Injectable()
export class SetAutocompleteInterceptor extends AutocompleteInterceptor {
    constructor(private _settingsService: SettingsService) {
        super();
    }

    public async transformOptions(interaction: AutocompleteInteraction) {
        const focused = interaction.options.getFocused(true);
        let choices: { name: string; value: string }[];

        if (focused.name === 'key') {
            const settings = await this._settingsService.get(
                interaction.guildId
            );
            choices = getObjectPossiblePaths(settings)
                .filter((k) => bannedSettingsKeys.indexOf(k) === -1)
                .map((choice) => ({
                    name: keyPathToName(choice),
                    value: choice,
                }));
        }

        if (focused.name === 'value') {
            const keyValue: string = interaction.options.get('key')
                ?.value as string;

            if (keyValue === 'language') {
                choices = languageOptions().map((language) => ({
                    name: language,
                    value: language,
                }));
            }

            if (keyValue.indexOf('enabled') >= 0) {
                choices = [
                    {
                        name: 'Enabled',
                        value: 'true',
                    },
                    {
                        name: 'Disabled',
                        value: 'false',
                    },
                ];
            }

            if (keyValue.indexOf('role') >= 0) {
                const roles = await interaction.guild.roles.fetch();
                choices = roles.map((role) => ({
                    name: role.name,
                    value: role.id,
                }));
            }
        }

        return interaction.respond(
            choices
                .filter(
                    (choice) =>
                        choice.name
                            .toLowerCase()
                            .indexOf(focused.value.toLowerCase().toString()) >=
                        0
                )
                .slice(0, 25)
        );
    }
}

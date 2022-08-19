import { Injectable } from '@nestjs/common';
import { isObject } from '@sapphire/utilities';
import { woofify, zeroWidthSpace } from '@varrock-stray-dog/utilities';
import { I18nService } from 'apps/bot/src/app/services';
import { EmbedBuilder, Interaction } from 'discord.js';
import { bannedSettingsKeys } from '../constants';

@Injectable()
export class SettingsEmbedService {
    constructor(private _i18n: I18nService) {}

    public createSettingsEmbed(
        interaction: Interaction,
        settings: any,
        key: string
    ) {
        this._setI18nInteraction(interaction);

        if (isObject(settings)) {
            return this._createOverviewEmbed(interaction, settings, key);
        }

        return this._createValueEmbed(interaction, settings, key);
    }

    private _createList(settings: any) {
        return Object.keys(settings)
            .filter((key) => bannedSettingsKeys.indexOf(key) === -1)
            .map((key) => ({
                type: isObject(settings[key]) ? 'folder' : 'setting',
                name: key,
            }))
            .sort((a, b) => a.type.localeCompare(b.type))
            .map(
                (item) => `${item.type === 'folder' ? '📁' : '⚙️'} ${item.name}`
            )
            .join('\n');
    }

    private async _createBaseEmbed(interaction: Interaction) {
        const titleTranslated = await this._i18n.translate(
            'settings.show.title'
        );
        return new EmbedBuilder()
            .setTitle(woofify(titleTranslated, false))
            .setColor(interaction.user.accentColor ?? null)
            .setAuthor({
                name: interaction.user.tag,
                iconURL: interaction.user.avatarURL(),
            })
            .setTimestamp(new Date());
    }

    private async _createOverviewEmbed(
        interaction: Interaction,
        settings: any,
        key: string
    ) {
        const [positionTranslated, descriptionTranslated] =
            await this._i18n.translateMultiple([
                {
                    key: 'settings.show.location',
                    args: {
                        position: `📁 Root ${
                            key ? ` / ${key?.split('.').join(' / ')}` : ''
                        }`,
                    },
                },
                `settings.descriptions.${key ? `${key}.description` : 'root'}`,
            ]);

        const base = await this._createBaseEmbed(interaction);
        return base.setDescription(
            `${positionTranslated} 
            ${descriptionTranslated}
        
        ${this._createList(settings)}
        ${zeroWidthSpace}`
        );
    }

    private async _createValueEmbed(
        interaction: Interaction,
        value: any,
        key: string
    ) {
        const [
            positionTranslated,
            descriptionTranslated,
            currentValueTranslated,
        ] = await this._i18n.translateMultiple([
            {
                key: 'settings.show.location',
                args: {
                    position: `⚙️ Root ${
                        key ? ` / ${key?.split('.').join(' / ')}` : ''
                    }`,
                },
            },
            `settings.descriptions.${key}`,
            {
                key: `settings.show.current_value`,
                args: {
                    value,
                },
            },
        ]);

        const base = await this._createBaseEmbed(interaction);
        return base.setDescription(
            `${positionTranslated}
            ${descriptionTranslated}
        
        ${currentValueTranslated}
        ${zeroWidthSpace}`
        );
    }

    private _setI18nInteraction(interaction: Interaction) {
        this._i18n.setInteraction(interaction);
    }
}

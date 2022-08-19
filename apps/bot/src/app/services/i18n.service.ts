import { Injectable, Scope } from '@nestjs/common';
import { Interaction } from 'discord.js';
import { I18nService as I18n } from 'vsd-i18n';
import { SettingsService } from './settings.service';

type ArgsType =
    | (
          | {
                [k: string]: any;
            }
          | string
      )[]
    | {
          [k: string]: any;
      };

type ItemsType = Array<
    | string
    | {
          key: string;
          args?: ArgsType;
      }
>;

@Injectable({
    scope: Scope.TRANSIENT,
})
export class I18nService {
    private _interaction: Interaction;

    constructor(
        private _settingsService: SettingsService,
        private _i18n: I18n
    ) {}

    public async translate(
        key: string,
        args?: ArgsType,
        i?: Interaction,
        lang?: string
    ) {
        // lang = lang ?? (await this._getLang(i));
        return this._i18n.translate(key, {
            args,
        });
    }

    public async translateMultiple(items: ItemsType, i?: Interaction) {
        const lang = await this._getLang(i);
        return Promise.all(
            items.map((item) => {
                if (typeof item === 'string') {
                    return this.translate(item, null, i, lang);
                }

                return this.translate(item.key, item.args, i, lang);
            })
        );
    }

    public setInteraction(i: Interaction) {
        this._interaction = i;
    }

    private _getLang(i?: Interaction) {
        return this._settingsService.getLanguage(
            this._interaction?.guildId ?? i.guildId
        );
    }
}

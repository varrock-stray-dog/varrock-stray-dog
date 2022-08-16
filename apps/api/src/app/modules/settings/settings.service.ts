import { Injectable } from '@nestjs/common';
import { Settings } from '@prisma/client';
import type { SettingsModel } from '@varrock-stray-dog/models';
import { camelCaseToSnakeCase, isObject } from '@varrock-stray-dog/utilities';
import { PrismaClient } from '../prisma/prisma.client';

@Injectable()
export class SettingsService {
    private _skippedParseKeys = ['id', 'guildId', 'createdAt', 'updatedAt'];
    constructor(private _prisma: PrismaClient) {}

    async findOneByGuildId(guildId: string) {
        const settings = await this._prisma.settings.findUnique({
            where: {
                guildId,
            },
        });

        return this._parseSettings(settings);
    }

    async findOrCreate(guildId: string) {
        const settings: SettingsModel = await this.findOneByGuildId(guildId);

        if (settings) {
            return settings;
        }

        // if none exists, we create one.
        const created = await this._prisma.settings.create({
            data: {
                guildId,
            },
        });
        return this._parseSettings(created);
    }

    async update(settings: SettingsModel) {
        const data = this._revertParse(settings);

        return this._prisma.settings.update({
            where: {
                guildId: data.guildId,
            },
            data,
        });
    }

    private _parseSettings(obj: Settings): SettingsModel {
        if (!obj) {
            return null;
        }

        const keys = Object.keys(obj);
        const newObj = {};

        for (const key of keys) {
            const snakeKey = camelCaseToSnakeCase(key);
            if (
                snakeKey.indexOf('_') === -1 ||
                this._skippedParseKeys.indexOf(key) >= 0
            ) {
                newObj[key] = obj[key];
                continue;
            }

            const splitted = snakeKey.split('_');
            const first = splitted.shift();
            newObj[first] = this._parseSettings({
                ...(newObj[first] ?? {}),
                [splitted.join('_')]: obj[key],
            });
        }

        return newObj as SettingsModel;
    }

    private _revertParse(
        obj: SettingsModel,
        parent: string = null,
        res: Partial<Settings> = {}
    ): Settings {
        if (!obj) {
            return null;
        }

        for (const key of Object.keys(obj)) {
            const propName = parent
                ? parent + key.charAt(0).toUpperCase() + key.slice(1)
                : key;

            if (isObject(obj[key])) {
                res = this._revertParse(obj[key], propName, res);
                continue;
            }

            res[propName] = obj[key];
        }

        return res as Settings;
    }
}

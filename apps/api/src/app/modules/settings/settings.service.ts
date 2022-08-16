import { Injectable } from '@nestjs/common';
import { Settings } from '@prisma/client';
import type { SettingsModel } from '@varrock-stray-dog/models';
import { camelCaseToSnakeCase } from '@varrock-stray-dog/utilities';
import { PrismaClient } from '../prisma/prisma.client';

@Injectable()
export class SettingsService {
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

    private _parseSettings(obj: Settings): SettingsModel {
        if (!obj) {
            return null;
        }

        const skippedKeys = ['guildId', 'createdAt', 'updatedAt'];
        const keys = Object.keys(obj);
        const newObj = {};

        for (const key of keys) {
            const snakeKey = camelCaseToSnakeCase(key);
            if (snakeKey.indexOf('_') === -1 || skippedKeys.indexOf(key) >= 0) {
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
}

import { Injectable } from '@nestjs/common';
import type { SettingsModel } from '@varrock-stray-dog/models';
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

    async findOrCreate(guildId: string): Promise<SettingsModel> {
        const settings: SettingsModel = await this.findOneByGuildId(guildId);

        if (settings) {
            return settings;
        }

        // if none exists, we create one.
        const created = await this._prisma.settings.create({
            data: {
                guildId,
                prefix: process.env.BOT_PREFIX,
            },
        });
        return this._parseSettings(created);
    }

    public async getPrefix(guildId: string) {
        const guild = await this._prisma.settings.findUnique({
            where: {
                guildId,
            },
        });

        if (!guild) {
            return process.env.BOT_PREFIX;
        }

        return guild.prefix;
    }

    public setPrefix(guildId: string, prefix: string) {
        return this._prisma.settings.update({
            data: {
                prefix,
            },
            where: {
                guildId,
            },
        });
    }

    private _parseSettings(obj: any): SettingsModel {
        if (!obj) {
            return obj;
        }

        const keys = Object.keys(obj);
        const newObj = {};

        for (const key of keys) {
            if (key.indexOf('_') === -1) {
                newObj[key] = obj[key];
                continue;
            }

            const splitted = key.split('_');
            const first = splitted.shift();
            newObj[first] = this._parseSettings({
                ...(newObj[first] ?? {}),
                [splitted.join('_')]: obj[key],
            });
        }

        return newObj as any;
    }
}

import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import colors from 'ansi-colors';
import cliProgress from 'cli-progress';
import { Item } from '../types/osrs-item';
import { Price } from '../types/osrs-price';
import { itemsUrl, pricesUrl } from './constants';

export class ItemSync {
    private _logger = new Logger('Item Sync');
    private _prisma: PrismaClient;

    public async syncItems(shouldDisconnect = true) {
        this._logger.log('Starting item sync');

        const items = await this._getItems();

        this._initPrisma();
        const bar = this._initBar('Item sync');

        bar.start(items?.length, 0);

        for (const item of items) {
            const data = {
                osrsId: item?.id,
                name: item?.name,
                icon: item?.icon,
                highAlch: item?.highalch ?? 0,
                lowAlch: item?.lowalch ?? 0,
                value: item?.value,
            };

            await this._prisma.items.upsert({
                where: {
                    osrsId: item?.id,
                },
                update: data,
                create: data,
            });

            bar.increment();
        }

        bar.stop();

        this._logger.log('Item sync completed!');

        if (shouldDisconnect) {
            await this._prisma.$disconnect();
        }

        return;
    }

    public async syncPrices(shouldDisconnect = true) {
        this._logger.log('Starting price sync');

        const prices = await this._getPrices();
        const ids = Object.keys(prices);

        this._initPrisma();
        const bar = this._initBar('Price sync');

        bar.start(ids?.length, 0);

        for (const id of ids) {
            const price = prices[id];
            const data = {
                geHigh: price?.high,
                geHighTime: new Date(0),
                geLow: price?.low,
                geLowTime: new Date(0),
            };

            data.geHighTime.setUTCSeconds(price?.highTime);
            data.geLowTime.setUTCSeconds(price?.lowTime);

            await this._prisma.items
                .update({
                    where: {
                        osrsId: parseInt(id),
                    },
                    data,
                })
                .catch(() => null);

            bar.increment();
        }

        bar.stop();

        this._logger.log('Price sync completed!');

        if (shouldDisconnect) {
            await this._prisma.$disconnect();
        }

        return;
    }

    public async sync() {
        await this.syncItems(false);
        await this.syncPrices(false);

        if (this._prisma) {
            this._prisma.$disconnect;
        }

        return;
    }

    private async _getItems(): Promise<Item[]> {
        const response = await fetch(itemsUrl);
        return response.json();
    }

    private async _getPrices(): Promise<{ [key: string]: Price }> {
        const response = await fetch(pricesUrl);
        const data = await response.json();
        return data?.data;
    }

    private _initPrisma() {
        if (!this._prisma) {
            this._prisma = new PrismaClient();
            this._prisma.$connect;
        }
    }

    private _initBar(name: string) {
        // create new progress bar
        return new cliProgress.SingleBar({
            format: `${name} | ${colors.cyan(
                '{bar}'
            )} | {percentage}% || {value}/{total} items`,
            barCompleteChar: '\u2588',
            barIncompleteChar: '\u2591',
            hideCursor: true,
        });
    }
}

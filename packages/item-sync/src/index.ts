export * from './lib/item-sync';

import { Command } from 'commander';
import { ItemSync } from './lib/item-sync';
const cli = new Command();

const itemSync = new ItemSync();

cli.name('@varrock-stray-dog/sync-items')
    .description('CLI to synchronize the items from the osrs Wiki')
    .version('1.0.0');

cli.command('sync')
    .description('Run both synchronization of items & prices')
    .argument('[string]', 'What to sync')
    .action(async (str) => {
        let result: Promise<any>;

        switch (str) {
            case 'items':
                result = itemSync.syncItems();
                break;
            case 'prices':
                result = itemSync.syncPrices();
                break;
            default:
                result = itemSync.sync();
                break;
        }

        return result;
    });

cli.parse();

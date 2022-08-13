import { Injectable } from '@nestjs/common';
import type { Pets } from '@prisma/client';
import { PetMetaData } from '@varrock-stray-dog/models';
import { IPetMetaData, Pets as PetsData } from '@varrock-stray-dog/osrs-pets';
import Fuse from 'fuse.js';

import { PrismaClient } from '../prisma/prisma.client';

@Injectable()
export class PetsService {
    private _fuse: Fuse<IPetMetaData> = new Fuse(PetsData, {
        keys: ['aliases', 'name'],
        includeScore: true,
        threshold: 0.3,
    });

    constructor(private _prisma: PrismaClient) {}

    getPets(name?: string): PetMetaData[] {
        return PetsData.filter((p) => (name ? p.name === name : true));
    }

    search(query: string): IPetMetaData {
        const results = this._search(query);
        return (results?.[0]?.item as IPetMetaData) ?? null;
    }

    searchAll(query: string): IPetMetaData[] {
        const results = this._search(query);
        return results?.map((r) => r?.item as IPetMetaData);
    }

    async findByName(
        userId: string,
        guildId: string,
        name: string
    ): Promise<Pets> {
        return this._prisma.pets.findFirst({
            where: {
                userId,
                guildId,
                name,
            },
        });
    }

    findMany(userId: string, guildId: string): Promise<Pets[]> {
        return this._prisma.pets.findMany({
            where: {
                userId,
                guildId,
            },
        });
    }

    add(pet: Pets): Promise<Pets> {
        return this._prisma.pets.create({
            data: pet,
        });
    }

    delete(id: string): Promise<Pets> {
        return this._prisma.pets.delete({
            where: {
                id,
            },
        });
    }

    async top(guildId: string): Promise<any> {
        // TODO: Fix this as any shit
        const top = await (this._prisma.pets.groupBy as any)({
            by: ['userId'],
            where: {
                guildId,
            },
            count: {
                _all: true,
            },
        });

        return top.sort((a, b) => b.count._all - a.count._all);
    }

    private _search(query: string) {
        return this._fuse.search(query);
    }
}

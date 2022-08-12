import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import type { Pets } from '@prisma/client';
import type { IPetMetaData } from '@varrock-stray-dog/osrs-pets';

import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
    private _logger: Logger = new Logger('Pets Controller');
    public constructor(private readonly _service: PetsService) {}

    @MessagePattern({ cmd: 'api:pet:search' })
    getPrefix(name: string): IPetMetaData {
        this._logger.log('search');
        return this._service.search(name);
    }

    @MessagePattern({ cmd: 'api:pet:find-by-name' })
    findByName({
        userId,
        guildId,
        name,
    }: {
        userId: string;
        guildId: string;
        name: string;
    }): Promise<Pets> {
        this._logger.log('findByName');
        return this._service.findByName(userId, guildId, name);
    }

    @MessagePattern({ cmd: 'api:pet:find-many' })
    findMany({ userId, guildId }): Promise<Pets[]> {
        this._logger.log('findMany');
        return this._service.findMany(userId, guildId);
    }

    @MessagePattern({ cmd: 'api:pet:add' })
    add(pet: Pets): Promise<Pets> {
        this._logger.log('add');
        return this._service.add(pet);
    }

    @MessagePattern({ cmd: 'api:pet:delete' })
    delete(id: string): Promise<Pets> {
        this._logger.log('delete');
        return this._service.delete(id);
    }

    @MessagePattern({ cmd: 'api:pet:top' })
    top(guildId: string): Promise<Pets> {
        this._logger.log('delete');
        return this._service.top(guildId);
    }
}

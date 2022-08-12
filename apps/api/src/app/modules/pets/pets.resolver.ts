import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PetMetaData, PetsModel } from '@varrock-stray-dog/models';
import { PetsService } from './pets.service';

@Resolver(() => PetsModel)
export class PetsResolver {
    private _logger: Logger = new Logger('Pets Resolver');

    constructor(private _petsService: PetsService) {}

    @Query(() => [PetMetaData])
    getAllMetaData(
        @Args('name', { type: () => String, nullable: true }) name?: string
    ): PetMetaData[] {
        return this._petsService.getPets(name);
    }

    @Query(() => [PetMetaData])
    searchMetaData(
        @Args('query', { type: () => String }) query: string
    ): PetMetaData[] {
        return this._petsService.searchAll(query);
    }
}

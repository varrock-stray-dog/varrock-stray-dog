import { Field, ObjectType } from '@nestjs/graphql';
import { IPetMetaData } from '@varrock-stray-dog/osrs-pets';

@ObjectType()
export class PetMetaData implements IPetMetaData {
    @Field()
    name: string;

    @Field()
    category: string;

    @Field(() => [String])
    aliases: string[];

    @Field()
    asset: string;

    @Field(() => [String])
    emoji: string[];
}

import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import type { Settings } from '@prisma/client';

@ObjectType()
export class PetSettingsModel {
    @Field()
    enabled: boolean;

    @Field({ nullable: true })
    moderatorRole?: string;
}

@ObjectType()
export class LootSettingsModel {
    @Field()
    enabled: boolean;

    @Field({ nullable: true })
    moderatorRole?: string;

    @Field()
    requireVerification: boolean;
}

@ObjectType()
export class SettingsModel implements Partial<Settings> {
    @Field(() => ID)
    id: string;

    @Field()
    guildId: string;

    @Field()
    prefix: string;

    @Field()
    language: string;

    @Field(() => PetSettingsModel)
    pets: PetSettingsModel;

    @Field(() => LootSettingsModel)
    loot: LootSettingsModel;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    updatedAt: Date;
}

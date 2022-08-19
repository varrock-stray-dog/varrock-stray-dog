import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import type { Settings } from '@prisma/client';
import { s } from '@sapphire/shapeshift';
import { readdirSync } from 'fs';
import path from 'path';

export const languageOptions = () => {
    const files = readdirSync(path.join(process.cwd(), 'i18n'), {
        withFileTypes: true,
    });
    return files.filter((file) => file.isDirectory()).map((d) => d.name);
};

export const settingsKeyValidation = s.object({
    language: s.enum(...languageOptions()),
    pets: s.object({
        enabled: s.union(
            s.boolean,
            s.string.transform((val) => val === 'true')
        ),
        moderation: s.object({
            enabled: s.union(
                s.boolean,
                s.string.transform((val) => val === 'true')
            ),
            role: s.string,
        }),
    }),
    loot: s.object({
        enabled: s.union(
            s.boolean,
            s.string.transform((val) => val === 'true')
        ),
        moderation: s.object({
            enabled: s.union(
                s.boolean,
                s.string.transform((val) => val === 'true')
            ),
            role: s.string,
        }),
    }),
});

@ObjectType()
export class SettingsModerationModel {
    @Field()
    enabled: boolean;

    @Field({ nullable: true })
    role?: string;
}

@ObjectType()
export class PetSettingsModel {
    @Field()
    enabled: boolean;

    @Field(() => SettingsModerationModel)
    moderation?: SettingsModerationModel;
}

@ObjectType()
export class LootSettingsModel {
    @Field()
    enabled: boolean;

    @Field(() => SettingsModerationModel)
    moderation?: SettingsModerationModel;
}

@ObjectType()
export class SettingsModel implements Partial<Settings> {
    @Field(() => ID)
    id: string;

    @Field()
    guildId: string;

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

import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import type { Pets } from '@prisma/client';

@ObjectType()
export class PetsModel implements Pets {
    @Field(() => ID)
    id: string;

    @Field()
    guildId: string;

    @Field()
    userId: string;

    @Field()
    name: string;

    @Field()
    kc: number;

    @Field()
    date: Date;

    @Field(() => GraphQLISODateTime)
    createdAt: Date;

    @Field(() => GraphQLISODateTime, { nullable: true })
    updatedAt: Date;
}

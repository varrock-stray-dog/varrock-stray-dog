import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SystemSummary {
    @Field()
    container: string;

    @Field()
    uptime: string;

    @Field(() => Float)
    uptimeRaw: number;

    @Field()
    env: string;
}

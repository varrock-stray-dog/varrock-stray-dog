import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SystemSummary } from './system-summary.model';
@ObjectType()
export class BotStatus extends SystemSummary {
    @Field(() => Int)
    guilds: number;

    @Field(() => Int)
    users: number;
}

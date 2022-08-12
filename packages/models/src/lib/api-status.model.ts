import { Field, ObjectType } from '@nestjs/graphql';
import { BotStatus } from './bot-status.model';
import { SystemSummary } from './system-summary.model';

@ObjectType()
export class ApiStatus extends SystemSummary {
    @Field()
    name: string;

    @Field()
    url: string;

    @Field(() => BotStatus)
    bot: BotStatus;
}

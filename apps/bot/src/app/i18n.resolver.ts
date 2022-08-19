import { Injectable } from '@nestjs/common';
import { NecordExecutionContext } from 'necord';
import { I18nResolver } from 'vsd-i18n';

@Injectable()
export class NecordMetaDataResolver implements I18nResolver {
    async resolve(
        context: NecordExecutionContext
    ): Promise<string | string[] | undefined> {
        const interaction = context.getArgs()[0][0];
        return interaction?.locale ?? interaction?.guildLocale ?? 'en-US';
    }
}

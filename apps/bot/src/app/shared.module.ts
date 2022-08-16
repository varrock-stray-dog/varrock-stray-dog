import { Module } from '@nestjs/common';
import { ApiModule } from './api.module';

import { services } from './services';

@Module({
    imports: [ApiModule],
    exports: [...services],
    providers: [...services],
})
export class BotSharedModule {}

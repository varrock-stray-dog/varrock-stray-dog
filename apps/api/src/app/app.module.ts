import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { BotModule } from './bot.module';
import { SystemModule } from './modules/system/system.module';

import { PetsModule } from './modules/pets/pets.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { SettingsModule } from './modules/settings/settings.module';

import {
    AcceptLanguageResolver,
    CookieResolver,
    HeaderResolver,
    I18nModule,
    QueryResolver,
} from 'nestjs-i18n';
import path from 'path';

@Module({
    imports: [
        PrismaModule,
        BotModule,
        SystemModule,
        PetsModule,
        SettingsModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: false,
            plugins: [ApolloServerPluginLandingPageLocalDefault()],
        }),
        I18nModule.forRoot({
            fallbackLanguage: 'en-US',
            loaderOptions: {
                path: path.join(process.cwd(), '/i18n/'),
                watch: true,
            },
            resolvers: [
                new QueryResolver(['lang', 'l']),
                new HeaderResolver(['x-custom-lang']),
                new CookieResolver(),
                AcceptLanguageResolver,
            ],
        }),
    ],
})
export class AppModule {}

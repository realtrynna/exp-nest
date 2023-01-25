import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UserModule } from "./users/users.module";
import EmailConfig from "./config/email.config";
import { validationEnv } from "./config/validation";
import dbConnect from "./config";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { Logger2Middleware } from "./middlewares/logger2.middleware";

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            envFilePath: [
                `${__dirname}/config/env/.${process.env.NODE_ENV}.env`,
            ],
            load: [EmailConfig],
            isGlobal: true,
            validationSchema: validationEnv,
        }),
        // TypeOrmModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: async (
        //         configService: ConfigService,
        //     ): Promise<TypeOrmModuleOptions> => {
        //         const config = dbConnect(configService);

        //         return config.production;
        //     },
        //     inject: [ConfigService],
        // }),
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware, Logger2Middleware).forRoutes("/users");
    }
}

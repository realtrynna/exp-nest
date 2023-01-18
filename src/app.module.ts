import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UserModule } from "./users/users.module";
import EmailConfig from "./config/email.config";
import { validationEnv } from "./config/validation";
import dbConnect from "./config";

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
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (
                configService: ConfigService,
            ): Promise<TypeOrmModuleOptions> => {
                const config = dbConnect(configService);

                return config.production;
            },
            inject: [ConfigService],
        }),
    ],
})
export class AppModule {}

console.log(process.env.NODE_ENV);

import { Module } from "@nestjs/common";
// dotenv
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { WorkspaceModule } from "./workspace/workspace.module";
import { ChannelModule } from "./channel/channel.module";
import { DmModule } from "./dm/dm.module";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // isGlobal 전역 process.env
        UserModule,
        WorkspaceModule,
        ChannelModule,
        DmModule,
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASES,
            entities: ["entities/*.js"],
            synchronize: true, // init
            logging: true, // raw query
            charset: "utf8mb4",
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        ConfigService,
        {
            provide: "Custom Key",
            useValue: "Custom Value",
        },
    ],
})
export class AppModule {}

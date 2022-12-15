import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { WorkspaceModule } from "./workspace/workspace.module";
import { ChannelModule } from "./channel/channel.module";
import { DmModule } from "./dm/dm.module";
import { MySqlConfigModule } from "./database/config.module";
import { MySqlConfigService } from "./database/config.service";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // isGlobal 전역 process.env
        UserModule,
        WorkspaceModule,
        ChannelModule,
        DmModule,
        TypeOrmModule.forRootAsync({
            imports: [MySqlConfigModule],
            useClass: MySqlConfigService,
            inject: [MySqlConfigService],
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

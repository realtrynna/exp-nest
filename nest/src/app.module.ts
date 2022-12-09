import { Module } from "@nestjs/common";
// dotenv
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { WorkspaceModule } from "./workspace/workspace.module";
import { ChannelModule } from "./channel/channel.module";
import { DmModule } from "./dm/dm.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        WorkspaceModule,
        ChannelModule,
        DmModule,
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

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { EmptyModule } from "src/empty/empty.module";
import { EnvModule } from "src/env/env.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        EnvModule.forRoot({
            host: "127.0.0.1",
            port: 6379,
        }),
        EmptyModule.forRoot({
            id: 0,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

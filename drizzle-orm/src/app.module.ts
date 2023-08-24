import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/modules/drizzle.module";
import { UserModule } from "src/modules/user.module";

@Module({
    imports: [
        DrizzleModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

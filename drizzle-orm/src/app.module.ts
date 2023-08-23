import { Module } from "@nestjs/common";

import { DbModule } from "src/modules/db.module";
import { UserModule } from "src/modules/user.module";

@Module({
    imports: [
        DbModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

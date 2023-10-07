import { Module } from "@nestjs/common";

import { AppController } from "src/app.controller";

@Module({
    controllers: [AppController],
    imports: [],
    providers: [],
})
export class AppModule {}

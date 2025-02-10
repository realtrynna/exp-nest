import { Module } from "@nestjs/common";
import { AController } from "./a.controller";
import { ExternalService } from "./external/external.service";

@Module({
    providers: [ExternalService],
    controllers: [AController],
})
export class AModule {}
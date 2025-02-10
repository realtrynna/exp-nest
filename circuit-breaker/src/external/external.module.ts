import { Module } from "@nestjs/common";
import { ExternalService } from "./external.service";

@Module({
    providers: [ExternalService],
    exports: [ExternalModule],
})
export class ExternalModule {}
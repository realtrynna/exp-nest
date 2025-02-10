import { Module } from "@nestjs/common";
import { AModule } from "./a.module";
import { ExternalModule } from "./external/external.module";

@Module({
    imports: [AModule, ExternalModule],
})
export class AppModule {}

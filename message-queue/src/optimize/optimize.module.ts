import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";

import { OptimizeController } from "src/optimize/optimize.controller";
import { OptimizeProcessor } from "src/optimize/optimize.processor";

@Module({
    controllers: [OptimizeController],
    imports: [
        BullModule.registerQueue({
            name: "resize",
        })
    ],
    providers: [OptimizeProcessor],
})
export class OptimizeModule {}
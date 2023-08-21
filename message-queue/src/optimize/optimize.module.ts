import { join } from "path";
import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";

import { OptimizeController } from "src/optimize/optimize.controller";

@Module({
    controllers: [OptimizeController],
    imports: [
        BullModule.registerQueue({
            name: "resize",
            processors: [join(__dirname, '../processors/upload.processor.js')],
        })
    ],
})
export class OptimizeModule {}
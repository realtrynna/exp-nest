import { Module } from "@nestjs/common";

import { UnzipService } from "src/unzip/unzip.service";

@Module({
    providers: [UnzipService],
    exports: [UnzipService],
})
export class UnzipModule {}
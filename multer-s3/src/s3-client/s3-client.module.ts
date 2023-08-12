import { Module } from "@nestjs/common";

import { S3ClientService } from "src/s3-client/s3-client.service";

@Module({
    providers: [S3ClientService],
    exports: [S3ClientService],
})
export class S3ClientModule {}
import { Module } from "@nestjs/common";

import { UploadController } from "src/upload/upload.controller";
import { UploadService } from "src/upload/upload.service";
import { S3ClientService } from "src/s3-client/s3-client.service";
import { UnzipService } from "src/unzip/unzip.service";

@Module({
    controllers: [UploadController],
    providers: [
        UploadService,
        S3ClientService,
        UnzipService
    ],
})
export class UploadModule {

}
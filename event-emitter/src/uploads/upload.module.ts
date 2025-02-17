import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { S3Module } from "../external/s3/s3.module";
import { S3Service } from "../external/s3/s3.service";

@Module({
    imports: [S3Module],
    providers: [UploadService],
    controllers: [UploadController],
})
export class UploadModule {}
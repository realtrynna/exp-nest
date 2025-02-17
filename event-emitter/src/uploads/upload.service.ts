import { Injectable } from "@nestjs/common";
import { S3Service } from "../external/s3/s3.service";

@Injectable()
export class UploadService {
    private s3Service: S3Service;

    constructor(s3Service: S3Service) {
        this.s3Service = s3Service;
    }

    get() {
        return this.s3Service.getS3();
    }
}
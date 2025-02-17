import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class S3Service {
    private s3;
    constructor(
        @Inject("S3_CLIENT") s3
    ) {
        this.s3 = s3;
    }

    getS3() {
        return this.s3;
    }
}
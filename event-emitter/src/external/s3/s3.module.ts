import { Module } from "@nestjs/common";
import { S3Client } from "@aws-sdk/client-s3";
import { S3Service } from "./s3.service";

@Module({
    providers: [
        {
            provide: "S3_CLIENT",
            useFactory: () => {
                return new S3Client({
                    region: "ap-northeast-2",
                    credentials: {
                        accessKeyId: "",
                        secretAccessKey: "",
                    }
                })
            }
        },
        S3Service
    ],
    exports: [S3Service]
})
export class S3Module {}
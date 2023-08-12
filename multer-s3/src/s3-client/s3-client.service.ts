import { Injectable } from "@nestjs/common";

import {streamToString } from "src/utils/stream-to-string";

import dotenv from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

@Injectable()
export class S3ClientService {
    readonly #s3;
    readonly #bucket;

    constructor() {
        dotenv.config();

        this.#s3 = new S3Client({
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });
        this.#bucket = process.env.S3_BUCKET;
    }

    /**
     * try, catch
     */
    async getObject(key: string) {
        const command = new GetObjectCommand({
            Bucket: this.#bucket,
            Key: key,
        });

        const objectResult = await this.#s3.send(command);

        return objectResult
    }
}
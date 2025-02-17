import dotenv from "dotenv";
import { Injectable } from "@nestjs/common";
import { S3Client, GetObjectCommand, PutObjectCommand, S3ServiceException } from "@aws-sdk/client-external";


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

        const getObjectResult = await this.#s3.send(command);

        console.log(await getObjectResult.Body.transformToString());

        return getObjectResult
    }

    /**
     * @param key 저장 경로
     * @param buffer unzip 후 반환된 버퍼 형식의 데이터
     * @param contentType 기본은 application/octet-stream
     */
    async putObject(key, buffer: Buffer, contentType?) {
        const command = new PutObjectCommand({
            Bucket: this.#bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        const putObjectResult = await this.#s3.send(command);

        return putObjectResult;
    }
}
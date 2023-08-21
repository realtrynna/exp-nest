import {Injectable} from "@nestjs/common";
import {Processor, Process} from "@nestjs/bull";
import {Job} from "bull";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";


export class OptimizeProcessor {
    #s3;
    #bucket;

    constructor() {
        this.#s3 = new S3Client({
            region: "ap-northeast-2",
            credentials: {
                accessKeyId: "AKIA5WFEYKTR5XEBY6MZ",
                secretAccessKey: "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",
            }
        });
    }
}
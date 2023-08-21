import {Injectable} from "@nestjs/common";
import {Processor, Process} from "@nestjs/bull";
import {Job} from "bull";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";


export class OptimizeProcessor {
    #s3;
    #bucket;

    constructor() {

    }
}
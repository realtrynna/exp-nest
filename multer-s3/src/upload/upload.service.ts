import { Injectable } from "@nestjs/common";

import { S3ClientService } from "src/s3-client/s3-client.service";
import { UnzipService } from "src/unzip/unzip.service";
import {streamToString} from "../utils/stream-to-string";

@Injectable()
export class UploadService {
    constructor(
        private readonly s3ClientService: S3ClientService,
        private readonly unzipService: UnzipService
    ) {
    }

    async unzip(key: string) {
        /**
         * object가 없을 경우, clientService에서 예외 처리가 되므로,
         * 해당 메서드에서 결과값을 검증할 필요가 없지 않을까.
         */
        const resultObject = await this.s3ClientService.getObject(key);
        const result = await streamToString(resultObject.Body);

        const task = await this.unzipService.unzip(result);

        console.log(task);
    }
}
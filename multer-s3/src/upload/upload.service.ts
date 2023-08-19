import {Injectable} from "@nestjs/common";

import {S3ClientService} from "src/s3-client/s3-client.service";
import {UnzipService} from "src/unzip/unzip.service";
import {streamToString} from "../utils/stream-to-string";
import { extractFileExt } from "../utils/extract-file-extension";
import {mapToExcludeRoute} from "@nestjs/core/middleware/utils";

@Injectable()
export class UploadService {
    constructor(
        private readonly s3ClientService: S3ClientService,
        private readonly unzipService: UnzipService
    ) {
    }

    async unzip(key: string) {
        /**
         * object가 없을 경우 clientService에서 예외 처리가 되므로 결과값을 검증할 필요가 없지 않나
         */
        const { Body } = await this.s3ClientService.getObject(key);
<<<<<<< HEAD

        const buffer = await new Promise((resolve, reject) => {
            const chunks = [];
            Body.on("data", (chunk) => {
                chunks.push(chunk);
            });
            Body.on("error", reject);
            Body.on("end", () => {
                console.log("buffer ended");
                resolve(Buffer.concat(chunks));
            });
        });

        const result = await this.unzipService.unzip(buffer);

        result.files.map(async file => {
            /**
             * put object command
             *
             */
        })

        // console.log(task);
=======
        const buffer = await streamToString(Body);
        const unzip = await this.unzipService.unzip(buffer);

        await Promise.allSettled(unzip.files.map(async (file, i) => {
            const content = await file.buffer();

            /**
             * put object
             */
            // await this.s3ClientService.putObject();
        }));

>>>>>>> a00fe465bb59b21bee96979acca1e709c22c94da
    }
}
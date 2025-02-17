import { Controller, Post, Req, Res, StreamableFile } from "@nestjs/common";
import * as Busboy from "busboy";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { UploadService } from "./upload.service";

@Controller()
export class UploadController {
    private uploadService: UploadService

    constructor(uploadService: UploadService) {
        this.uploadService = uploadService;
    }

    @Post("upload")
    async upload(@Req() req: any, @Res() res: any) {
        const bb = Busboy({ headers: req.headers });
        const chunkList = [];

        bb.on("file", async (name, file, info) => {
            file.on("data", (data) => chunkList.push(data));
            file.on("end", async () => {
                const result = await this.s3Upload(info.filename, Buffer.concat(chunkList));

                console.log("upload end", result);
            });
         });

        bb.on("close", async () => {
            // await this.s3Upload(filename, Buffer.concat(chunkList));
            res.json("Upload success");
        });

        req.pipe(bb);
    }

    s3() {
        return new S3Client({
            region: "ap-northeast-2",
            credentials: {
                accessKeyId: "",
                secretAccessKey: ""
            }
        })
    }

    async s3Upload(filename, data: Buffer) {
        const uploadCommand = new Upload({
            client: this.s3(),
            params: {
                Bucket: "",
                Key: `temp/${filename}`,
                Body: data,
            }
        });

        const { Key } = await uploadCommand.done();

        return Key;
    }
}
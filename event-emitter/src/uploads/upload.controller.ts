import { Controller, Post, Req, Res } from "@nestjs/common";
import * as Busboy from "busboy";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
    ProgressBar,
    logger,
} from "@aws-doc-sdk-examples/lib/utils/util-log.js";

@Controller()
export class UploadController {
    @Post("upload")
    async upload(@Req() req: any, @Res() res: any) {
        const bb = Busboy({ headers: req.headers });

        bb.on("file", (name, file, info) => {
            file.on("data", async (data) => {
                try {
                    const upload = new Upload({
                        client: this.s3(),
                        params: {
                            Bucket: "",
                            Key: "big",
                            Body: data,
                        }
                    });

                    upload.on("httpUploadProgress", ({ loaded, total }) => {
                        console.log(loaded, total)
                    });

                    const result = await upload.done();
                    console.log(result);
                } catch (err) {
                    console.log(err);
                }
            })
        });

        bb.on("close", () => {
            res.end();
        });

        req.pipe(bb);
    }

    s3() {
        return new S3Client({
            region: "",
            credentials: {
                accessKeyId: "",
                secretAccessKey: ""
            }
        })
    }
}
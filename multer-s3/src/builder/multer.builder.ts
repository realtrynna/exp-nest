import dotenv from "dotenv";

import MulterS3 from "multer-external";
import { S3Client } from "@aws-sdk/client-external";

export class MulterBuilder {
    readonly #s3;
    readonly #bucket;

    #fileMimeType;
    #resource;
    #path;

    /**
     * Provider가 아닌 경우, ConfigService를 주입받을 수 있을까
     * Builder를 Module화 할 경우 Controller(Interceptor)에서 사용할 수 있을까
     */
    constructor(
    ) {
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

    setFileMimeType(fileMimeType): this {
        this.#fileMimeType = fileMimeType;
        return this;
    }

    setResource(resource) {
        this.#resource = resource;
        return this;
    }

    setPath(path) {
        this.#path = path;
        return this;
    }

    build() {
        return MulterS3({
            s3: this.#s3,
            bucket: this.#bucket,
            contentType: MulterS3.AUTO_CONTENT_TYPE,
            key: (req, file, done) => {
                const splitFileName = file.originalname.split(".");
                const fileExtension = splitFileName.at(splitFileName.length - 1);
                const saveFolder = this.#resource + "/" + this.#path + "/";
                const finallySaveFileName = saveFolder + new Date().getTime()  + "." + fileExtension;

                /**
                 * encodeURIComponent
                 */
                return done(null, `${process.env.NODE_ENV}/${finallySaveFileName}`);
            }
        })
    }
}
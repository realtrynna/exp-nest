import path from "path";

import {Module} from '@nestjs/common';

import {UploadModule} from "src/upload/upload.module";
import {S3ClientModule} from "src/s3-client/s3-client.module";
import {UnzipModule} from "src/unzip/unzip.module";

@Module({
    imports: [
        UploadModule,
        S3ClientModule,
        UnzipModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

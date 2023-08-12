import { Controller, Post, UseInterceptors, UploadedFile, Body } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { UploadService } from "src/upload/upload.service";

import { uploadZipFileOption } from "src/builder/multer.option";

@Controller("upload")
export class UploadController {
    constructor(
        private readonly uploadService: UploadService
    ) {
    }

    @Post("file")
    @UseInterceptors(FileInterceptor("file", uploadZipFileOption()))
    async upload(@UploadedFile() file: Express.MulterS3.File) {
        return "success";
    }

    @Post("unzip")
    async unzip(@Body() { key }: any) {
        await this.uploadService.unzip(key);

        return "success";
    }
}
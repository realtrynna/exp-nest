import { Options } from "multer";

import { BadRequestException } from "@nestjs/common";

import { MulterBuilder } from "src/builder/multer.builder";

export const fileMimeFilter = (type: string) => (req, file ,done) => {
    const fileType = type === "application/zip";

    if (!fileType) done(new BadRequestException("Not an allowed file type."), false);

    done(null, true);
}

export const uploadZipFileOption = () => {
    return {
        fileFilter: fileMimeFilter("application/zip"),
        storage: new MulterBuilder().setFileMimeType("application/zip").setResource("extracted").setPath("zip").build(),
    }
}
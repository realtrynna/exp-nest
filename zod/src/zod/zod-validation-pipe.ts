import { BadRequestException } from "@nestjs/common";
import { createZodValidationPipe } from "nestjs-zod";
import { ZodError } from "zod";

export const ZodValidationPipe = createZodValidationPipe({
    createValidationException: (err: ZodError) => {
        // console.log("zod error", err.issues);

        console.log("zod pipe");

        throw new BadRequestException("zod pipe error");
    }
})
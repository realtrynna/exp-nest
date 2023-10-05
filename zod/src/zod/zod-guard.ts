import { BadRequestException } from "@nestjs/common";
import { createZodGuard } from "nestjs-zod";
import { ZodError } from "zod";

export const ZodGuard = createZodGuard({
    createValidationException: (err: ZodError) => {
        console.log("zod guard");

        throw new BadRequestException("zod guard error");
    }
})
import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const createArticleDto = z
    .object({
        title: z.string().nonempty(),
        content: z.string().nonempty(),
        imageUrl: z.string().nullable(),
    });

export class CreateArticleDto extends createZodDto(createArticleDto) {};
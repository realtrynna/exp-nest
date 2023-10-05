import { Controller, Post, Get, Body, UsePipes, UseGuards } from "@nestjs/common";
import { UseZodGuard } from "nestjs-zod";

import { CreateArticleDto } from "src/articles/dtos/create-article-dto";
import { ZodValidationPipe } from "src/zod/zod-validation-pipe";
import { ZodGuard } from "src/zod/zod-guard";

@Controller("articles")
export class ArticleController {
    @UseZodGuard("body", CreateArticleDto)
    // @UsePipes(new ZodValidationPipe(CreateArticleDto))
    @Post("create")
    async getArticleList(@Body() createArticleDto: CreateArticleDto) {
        return true;
    }
}
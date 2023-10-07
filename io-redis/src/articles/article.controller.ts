import { Controller, Post, Get } from "@nestjs/common";

import { ArticleService } from "src/articles/article.service";

@Controller("article")
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) {
    }

    @Get("article-list")
    async getArticleList() {

    }
}
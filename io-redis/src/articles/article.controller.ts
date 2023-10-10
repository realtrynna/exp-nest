import { Controller, Post, Get, Delete } from "@nestjs/common";

import { ArticleService } from "src/articles/article.service";

@Controller("article")
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) {
    }

    @Get("article-list")
    async getArticleList() {
        const articleList = await this.articleService.getArticleList();

        return articleList;
    }

    @Delete("article-list")
    async deleteArticleList() {
        await this.articleService.deleteArticleList();
    }
}
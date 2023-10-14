import { Controller, Post } from "@nestjs/common";

import { ArticleService } from "src/providers/article.service";

@Controller("articles")
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) {
    }

    @Post("create-article")
    async createArticle() {
        return this.articleService.getArticleList();
    }
}
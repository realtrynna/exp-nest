import { Controller, Post } from "@nestjs/common";

@Controller("articles")
export class ArticleController {
    @Post("create-article")
    async createArticle() {

    }
}
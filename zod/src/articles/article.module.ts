import { Module } from "@nestjs/common";

import { ArticleController } from "src/articles/article.controller";

@Module({
    controllers: [ArticleController],
})
export class ArticleModule {}
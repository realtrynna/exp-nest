import { Module } from "@nestjs/common";

import { ArticleController } from "src/articles/articles.controller";

@Module({
    controllers: [ArticleController],
})
export class ArticleModule {}
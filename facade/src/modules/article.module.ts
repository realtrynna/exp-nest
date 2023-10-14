import { Module } from "@nestjs/common";

import { ArticleController } from "src/articles/article.controller";
import { ArticleService } from "src/articles/article.service";

@Module({
    imports: [],
    controllers: [
        ArticleController,
    ],
    providers: [
        ArticleService
    ],
})
export class ArticleModule {}
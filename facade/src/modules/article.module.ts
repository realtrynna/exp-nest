import { Module } from "@nestjs/common";

import { ArticleController } from "src/controllers/article.controller";
import { ArticleService } from "src/providers/article.service";
import {
    UsersRepository,
    CommentsRepository,
    ImagesRepository,
    GradeRepository,
    ArticleRepository
} from "src/models/repositories";
import { FacadeClient } from "src/clients/facade.client";

@Module({
    imports: [],
    controllers: [
        ArticleController,
    ],
    providers: [
        ArticleService,
        FacadeClient,
        UsersRepository,
        CommentsRepository,
        ImagesRepository,
        GradeRepository,
        ArticleRepository
    ],
})
export class ArticleModule {}
import { Injectable } from "@nestjs/common";

import {
    ArticleRepository,
    UsersRepository,
    CommentsRepository,
    ImagesRepository,
    GradeRepository
} from "src/models/repositories";

@Injectable()
export class FacadeClient {
    constructor(
        private readonly articleRepository: ArticleRepository,
        private readonly usersRepository: UsersRepository,
        private readonly commentsRepository: CommentsRepository,
        private readonly imageRepository: ImagesRepository,
        private readonly gradeRepository: GradeRepository,
    ) {
    }

    async getArticleList() {
        return this.articleRepository.getArticleList();
    }

    e
}
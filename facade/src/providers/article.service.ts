import { Injectable } from "@nestjs/common";

import {
    UsersRepository,
    CommentsRepository,
    ImagesRepository,
    GradeRepository,
    ArticleRepository
} from "src/models/repositories";

import { FacadeClient } from "src/clients/facade.client";

/**
 * 규모가 커지면 자연스럽게 Repository(db table) 개수가 늘어남
 * ArticleService 테스트하기 쉽지 않음
 */
@Injectable()
export class ArticleService {
    constructor(
        private readonly facadeClient: FacadeClient
    ) {
    }

    async getArticleList() {
        return this.facadeClient.getArticleList();
    }
}
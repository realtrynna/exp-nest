import { Injectable } from "@nestjs/common";

@Injectable()
export class ArticleRepository {
    async getArticleList() {
        return [
            { id: 1, title: "1번 기사" },
            { id: 2, title: "2번 기사" },
            { id: 3, title: "3번 기사" },
        ]
    }
}
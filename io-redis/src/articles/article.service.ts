import { Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { InjectRedis } from "@liaoliaots/nestjs-redis";

@Injectable()
export class ArticleService {
    readonly #articleList = [
        { id: 1, title: "1번 기사" },
        { id: 2, title: "2번 기사" },
    ];

    constructor(
        @InjectRedis() private readonly client: Redis
    ) {
    }

    async getArticleList() {
        const existArticleList = await this.client.get("articleList");

        if (existArticleList) return existArticleList;

        await this.client.set(
            "articleList",
            JSON.stringify(this.#articleList),
            "EX",
            10
        );

        return this.#articleList;
    }

    async deleteArticleList() {
        await this.client.del("articleList");
    }
}
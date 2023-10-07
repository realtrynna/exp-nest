import { Injectable } from "@nestjs/common";
import { InjectRedis } from "@liaoliaots/nestjs-redis";
import Redis from "ioredis";

@Injectable()
export class ArticleService {
    constructor(
        // @InjectRedis() private readonly client: Redis
    ) {
    }

    async getArticleList() {
    }
}
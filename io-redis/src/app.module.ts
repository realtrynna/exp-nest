import { Module } from "@nestjs/common";

import { IoRedisModule } from "src/modules/io-redis.module";
import { ArticleModule } from "src/articles/article.module";

@Module({
    imports: [IoRedisModule, ArticleModule],
    controllers: [],
    providers: [],
})
export class AppModule {}

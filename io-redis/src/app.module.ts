import { Module } from "@nestjs/common";
import { RedisModule } from "@liaoliaots/nestjs-redis";

import { ArticleModule } from "src/articles/article.module";

@Module({
    imports: [
        RedisModule.forRoot({
            readyLog: true,
            config: {
                host: "127.0.0.1",
                port: 6379,
            }
        }),
        ArticleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

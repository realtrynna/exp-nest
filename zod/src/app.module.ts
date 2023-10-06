import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";

import { ArticleModule } from "src/articles/article.module";

@Module({
    imports: [ArticleModule],
    controllers: [],
    providers: [
        // {
        //     provide: APP_PIPE,
        //     useClass: ZodValidationPipe,
        // }
    ],
})
export class AppModule {}

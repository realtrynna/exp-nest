import { Module } from "@nestjs/common";

import { ArticleModule } from "src/modules/article.module";

@Module({
    imports: [
        ArticleModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

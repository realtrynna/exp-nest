import { Injectable } from '@nestjs/common';

export interface ArticleDto {
    title: string;
    content: string;
}
export type ArticleIdx = number;

@Injectable()
export class ArticlesService {
    createArticle(articleDto: ArticleDto, isCondition: boolean): ArticleIdx {
        if (isCondition) throw new Error("condition cannot be true.");

        return 1;
    }
}

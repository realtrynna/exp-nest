import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
    let service: ArticlesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ArticlesService],
        }).compile();

        service = module.get<ArticlesService>(ArticlesService);
    });

    it("Should be defined", () => expect(service).toBeDefined());

    it("Should on success, returns the article index", () => {
        const articleIdx = 1;
        const isCondition = true;
        const articleDto = {
            title: "제목",
            content: "본문",
        };

        expect(() => {
            service.createArticle(articleDto, isCondition)
        }).toThrowError("condition cannot be true.");
    })
});

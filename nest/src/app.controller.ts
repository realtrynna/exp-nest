import { Controller, Get, Post, Inject } from "@nestjs/common";
import { AppService } from "./app.service";

// 메인 라우터
// prefix 생략 가능
@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject("Custom Key") private readonly customValue,
    ) {}

    @Get()
    envTesting(): string {
        console.log(this.customValue);
        return this.appService.envTesting();
    }
}

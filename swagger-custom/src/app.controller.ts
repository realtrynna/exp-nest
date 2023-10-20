import { Controller, Get, Param } from "@nestjs/common";

import { CustomApiResponse } from "src/decorators/custom-api-response.decorator"

@Controller("app")
export class AppController {
    @Get(":id")
    @CustomApiResponse({
        operation: {
            summary: "application title",
            description: "애플리케이션에 대한 기본 정보를 반환합니다.",
            requestBody: {
            }
        },
        description: "애플리케이션에 대한 기본 정보를 반환합니다.",
    })
    async app(
        @Param("id") num
    ) {
        console.log(num);
        return "application";
    }
}
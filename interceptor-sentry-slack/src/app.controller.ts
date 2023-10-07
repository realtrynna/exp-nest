import { Controller, Post, Body } from "@nestjs/common";

import { CustomPipe } from "src/pipes/custom.pipe";

@Controller()
export class AppController {
    @Post()
    async get(
        @Body(CustomPipe) data
    ) {
        console.log("data", data);
    }
}``
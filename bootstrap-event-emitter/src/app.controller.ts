import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    async get() {
        throw new Error("where does to go error");
        return;
    }
}

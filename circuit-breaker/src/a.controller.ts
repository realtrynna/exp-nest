import { Controller, Get } from "@nestjs/common";
import { ExternalService } from "./external/external.service";

@Controller()
export class AController {
    constructor(
        private readonly externalService: ExternalService
    ) {
    }

    @Get("here")
    async here() {
        await this.externalService.externalApi();
    }
}
import { Controller, Get } from "@nestjs/common";

import { EmptyService } from "src/empty/empty.service";
import { EnvService } from "src/env/env.service";

@Controller("empty")
export class EmptyController {
    constructor(
        private readonly emptyService: EmptyService,
        // private readonly envService: EnvService
    ) {
    }

    @Get("test")
    async getEmpty() {

    }
}
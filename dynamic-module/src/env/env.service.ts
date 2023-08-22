import { Injectable, Inject } from "@nestjs/common";

import { ENV_TOKEN, IEnvOptions } from "src/config";

@Injectable()
export class EnvService {
    constructor(
        @Inject(ENV_TOKEN) private readonly options: IEnvOptions
    ) {
    }

    async getEnv() {
        return this.options;
    }
}
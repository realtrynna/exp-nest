import { Module, DynamicModule } from "@nestjs/common";

import { ENV_TOKEN, IEnvOptions } from "src/config";
import { EnvService } from "src/env/env.service";

@Module({
    providers: [EnvService],
    exports: [EnvService],
})
export class EnvModule {
    static forRoot(options: IEnvOptions): DynamicModule {
        return {
            module: EnvModule,
            providers: [
                EnvService,
                {
                    provide: ENV_TOKEN,
                    useValue: options,
                },
            ],
            exports: [EnvService]
        }
    }
}
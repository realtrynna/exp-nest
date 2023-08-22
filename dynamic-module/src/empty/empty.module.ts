import { Module, DynamicModule } from "@nestjs/common";

import { EMPTY_TOKEN, IEmptyOptions } from "src/config";
import { EmptyController } from "src/empty/empty.controller";
import { EmptyService } from "src/empty/empty.service";
import { EnvService } from "../env/env.service";

@Module({
    // imports: [EnvService],
    controllers: [EmptyController],
    providers: [
        EmptyService,
    ],
})
export class EmptyModule {
    static forRoot(options: IEmptyOptions): DynamicModule {
        return {
            module: EmptyModule,
            providers: [
                EmptyService,
                EnvService,
                {
                    provide: EMPTY_TOKEN,
                    useValue: options,
                }
            ]
        }
    }
}
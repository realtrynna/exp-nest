import {Module} from '@nestjs/common';
import {BullModule} from "@nestjs/bull";

import {OptimizeModule} from "src/optimize/optimize.module";

@Module({
    imports: [
        OptimizeModule,
        BullModule.forRootAsync({
            useFactory: () => ({
                redis: {
                    host: "127.0.0.1",
                    port: 6379,
                }
            })
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}

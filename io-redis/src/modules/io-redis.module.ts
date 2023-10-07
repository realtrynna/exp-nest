import { Module } from "@nestjs/common";
import { RedisModule } from "@liaoliaots/nestjs-redis";

@Module({
    imports: [
        RedisModule.forRoot({
            readyLog: true,
            config: {
                host: "127.0.0.1",
                port: 6379,
                // password:
            }
        })
    ],
})
export class IoRedisModule {}
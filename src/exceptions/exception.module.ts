import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

import { HttpExceptionFilter } from "./exception.filter";

@Module({
    providers: [ConfigService],
})
export class ExceptionModule {}

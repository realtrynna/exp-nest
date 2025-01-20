import { Module } from "@nestjs/common";
import {BoardModule} from "./board/board.module";
import {BoardProcessDecoratorRegister} from "./board-process.decorator.register";

@Module({
    imports: [
        BoardModule
    ],
    controllers: [],
    providers: [
    ],
})
export class AppModule {}

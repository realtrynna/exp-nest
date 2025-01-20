import {Module} from "@nestjs/common";
import {BoardService} from "./board.service";
import {BoardController} from "./board.controller";
import {BoardProcessDecoratorRegister} from "../board-process.decorator.register";
import {DiscoveryModule} from "@nestjs/core";
import {EncryptionService} from "../encryption.service";

@Module({
    imports: [DiscoveryModule],
    controllers: [BoardController],
    providers: [BoardService, BoardProcessDecoratorRegister,
        EncryptionService
    ],
})
export class BoardModule {}
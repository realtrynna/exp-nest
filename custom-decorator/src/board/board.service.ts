import {Injectable, SetMetadata} from "@nestjs/common";
import {EncryptionService} from "../encryption.service";

export const BOARD_PROCESS = Symbol("BOARD_PROCESS");
export const BoardProcess = (property: String) => SetMetadata(BOARD_PROCESS, property);

@Injectable()
export class BoardService {
    constructor(
        private readonly encryptionService: EncryptionService
    ) {
    }

    @BoardProcess("idx")
    async getBoardList() {
        const boardList = [
            { idx: 1, title: "super", content: "Delivery Hero" },
            { idx: 2, title: "DuaLipa", content: "MC Hero" },
            { idx: 3, title: "gentle", content: "super Hero" },
        ]

        return boardList
    }
}
import {Controller, Get } from "@nestjs/common";
import {BoardService} from "./board.service";

@Controller()
export class BoardController {
    constructor(
        private readonly boardService: BoardService
    ) {
    }

    @Get("board-list")
    async getBoardList() {
        return this.boardService.getBoardList()
    }
}
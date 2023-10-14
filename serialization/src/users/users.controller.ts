import { Controller, Body, Post } from "@nestjs/common";
import {
    plainToInstance
} from "class-transformer";

import { UsersOutputDto } from "src/users/dtos/users-output.dto";
import { readJsonFile} from "src/utils/read-json-file";

@Controller("article")
export class UsersController {
    @Post("create-article")
    async getUserList(@Body() inputDto) {
        const json = await readJsonFile();

        const result = plainToInstance(
            UsersOutputDto,
            json
        );

        console.log(result);
    }
}
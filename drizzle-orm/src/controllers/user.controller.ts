import { Controller, Get } from "@nestjs/common";

import { UserService } from "src/providers/user.service";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Get("test")
    async getUserList() {
        const result = await this.userService.getUserList();

        return result;
    }
}
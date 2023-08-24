import {
    Controller,
    Body,
    Get,
    Post,
    BadRequestException
} from "@nestjs/common";
import { generateErrorMessage, ErrorMessageOptions  } from "zod-error";

import { UserService } from "src/providers/user.service";
import {
    insertUserSchema,
    insertProfileSchema
} from "src/db/schemas/loader";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @Post("create")
    async createUser(@Body() createUserDto) {
        const options: ErrorMessageOptions = {
            delimiter: {
                error: '🔥',
            },
            transform: ({ errorMessage, index }) => `Error #${index + 1}: ${errorMessage}`,
        };

        const userDtoValidation = insertUserSchema.safeParse(createUserDto);
        const profileDtoValidation = insertProfileSchema.safeParse(createUserDto);

        if (!userDtoValidation.success || !profileDtoValidation.success) {
            // const errorMessage = generateErrorMessage(userDtoValidation["error"]?.issues, options);
            throw new BadRequestException("Make sure your input is in the correct format");
        }

        const result = await this.userService.createUser(createUserDto);

        return result;
    }

    @Get("user-list")
    async getUserList() {
        const result = await this.userService.getUserList();

        return result;
    }
}
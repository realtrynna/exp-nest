import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Query,
    UseInterceptors,
    ParseIntPipe,
    DefaultValuePipe,
} from "@nestjs/common";
import { BadRequestException } from "@nestjs/common/exceptions";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiOkResponse,
    ApiQuery,
    ApiParam,
    ApiBadRequestResponse,
} from "@nestjs/swagger";
import uuid from "uuid";

import { UserService } from "./users.service";
import { createUserDto, VerifyEmailDto, LoginDto, Profile } from "./dto";
import { EmailService } from "src/email/email.service";
import { BaseInterceptor } from "src/common/interceptors/date.interceptor";
import { ValidationPipe } from "../common/validations/validation.pipe";

@Controller("users")
@ApiTags("사용자")
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService,
    ) {}

    @Get("/practice/:id")
    async practice(@Param("id", ValidationPipe) id: number) {
        // console.log(id);
        const user = await this.userService.findUserById(id);

        return user;
    }

    // 회원 정보 조회
    @Get("/:userId")
    @UseInterceptors(BaseInterceptor)
    async findUserById(
        @Param("userId", new ParseIntPipe({ errorHttpStatusCode: 500 }))
        userId: number,
    ): Promise<any> {
        console.log(typeof userId);
        return "응답했어요!";
    }

    // 회원 가입
    @ApiOperation({
        summary: "회원 가입",
        description: ``,
    })
    @ApiOkResponse({
        // status: 201, 				// Default 200
        type: Profile,
        description: "회원 가입 성공",
    })
    @ApiBadRequestResponse({
        status: 404,
        description: "클라이언트 에러",
    })
    @Post()
    async createUser(@Body() createUserDto: createUserDto): Promise<void> {
        const createUserVerifyToken = "DLLO-44L2-DLLA-WMDC";

        const createUser = await this.userService.createUser(createUserDto);
    }

    // 이메일 인증
    // @Post("/email-verify")
    // async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<void> {
    //     return this.userService.verifyEmail(verifyEmailDto);
    // }

    // 로그인
    @Post("/login")
    async login(@Body() loginDto: LoginDto): Promise<void> {
        return this.userService.login(loginDto);
    }
}

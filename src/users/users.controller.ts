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
    UseGuards,
    ConsoleLogger,
    LoggerService,
    Inject,
} from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
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
import { Logger } from "winston";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { UserService } from "./users.service";
import { CreateUserDto, VerifyEmailDto, LoginDto } from "./dto";
import { EmailService } from "src/email/email.service";
import { BaseInterceptor } from "src/common/interceptors/date.interceptor";
import { ValidationPipe } from "../common/validations/validation.pipe";
import { UserMeta } from "src/common/decorators/user.decorator";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CreateUserCommand } from "./command/create-user.command";

interface IUser {
    name: string;
    age: number;
}

/**
 * @TODO
 */
@Controller("users")
@ApiTags("사용자")
export class UsersController {
    // readonly #logger = new Logger(UsersController.name);

    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        // private readonly logger: CustomLogger,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
        private readonly commandBus : CommandBus,

    ) {}

    @Get("/practice/:id")
    @UseGuards(AuthGuard)
    async practice(
        @Param("id", ValidationPipe) id: number,
        @UserMeta() user: IUser,
    ) {
        this.#printLogger();
        const finduser = await this.userService.findUserById(id);

        console.log("User는", user);

        return "hello";
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
    // @ApiOkResponse({
    //     // status: 201, 				// Default 200
    //     type: Profile,
    //     description: "회원 가입 성공",
    // })
    @ApiBadRequestResponse({
        status: 404,
        description: "클라이언트 에러",
    })
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        const createUserVerifyToken = "DLLO-44L2-DLLA-WMDC";
        const createUser = await this.userService.createUser(createUserDto);

        return createUser;
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

    @Post("/command")
    async command(@Body() createUser: CreateUserDto) {
        const command = new CreateUserCommand(createUser);

        const result = await this.commandBus.execute(command);

        console.log("Controller Result", result);
    }

    #printLogger() {
        this.logger.error("error", "Test");
    }
}

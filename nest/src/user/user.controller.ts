import { Controller, Get, Post, Req, Body, Query, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { SignUpDto } from "./dtos/index";
import { UserDto } from "../common/index";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("User")
@Controller("user")
export class UserController {
    // eslint-disable-next-line prettier/prettier
    constructor (private readonly userService: UserService) {}

    @ApiResponse({
        type: UserDto,
        status: 200,
        description: "success",
    })
    @ApiOperation({
        summary: "사용자 조회",
    })
    @Get(":id")
    gteUser(@Param() id) {
        const { id: userId } = id;

        return; 
    }

    @ApiOperation({
        summary: "회원가입",
    })
    @Post()
    signUp(@Body() body: SignUpDto) {
        console.log(body);
        return this.userService.signUp(body);
    }

    @ApiOperation({
        summary: "로그인",
    })
    @Post()
    signIn() {

    }
}

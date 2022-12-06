import { Controller, Get, Post, Req, Body } from '@nestjs/common';

import { UserService } from './user.service';
import { SignUpDto } from "./dto/index";

@Controller("user")
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Get()
    gteUser() {
        
    }

    @Post()
    signUp(@Body() body: SignUpDto) {
        this.userService.signUp(body);    
    }

    @Post()
    signIn() {

    }
}

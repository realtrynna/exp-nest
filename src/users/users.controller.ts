import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

import { createUserDto, VerifyEmailDto, LoginDto, UserMeta } from './dto';

@Controller('users')
export class UsersController {
	// 회원 정보 조회
	@Get("/:userId")
	async getUserList(@Param("userId") userId: number): Promise<UserMeta> {
		console.log(userId);
		return;
	}
	
	// 회원 가입
	@Post()
	async createUser(@Body() createUserDto: createUserDto): Promise<void> {
		console.log(createUserDto);
	}

	// 이메일 인증
	@Post("/email-verify")
	async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<void> {
		console.log(verifyEmailDto);
	}

	// 로그인
	@Post("/login")
	async login(@Body() loginDto: LoginDto): Promise<void> {
		console.log(loginDto);
	}
}

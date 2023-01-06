import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Query,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import uuid from "uuid";

import { UserService } from './users.service';
import { createUserDto, VerifyEmailDto, LoginDto, UserMeta } from './dto';
import { EmailService } from 'src/email/email.service';

@Controller('users')
export class UsersController {
	constructor(
		private readonly userService: UserService,
		private readonly emailService: EmailService
	) {}

	// 회원 정보 조회
	@Get("/:userId")
	async findUserById(@Param("userId") userId: number): Promise<any> {
		return this.userService.findUserById(userId);
	}
	
	// 회원 가입
	@Post()
	async createUser(@Body() createUserDto: createUserDto): Promise<void> {
		const createUserVerifyToken = "DLLO-44L2-DLLA-WMDC";

		console.log(createUserVerifyToken);

		this.emailService.sendUserCreateVerification(
			createUserDto.email,
			createUserVerifyToken
		);
	}

	// 이메일 인증
	@Post("/email-verify")
	async verifyEmail(@Query() verifyEmailDto: VerifyEmailDto): Promise<void> {
		return this.userService.verifyEmail(verifyEmailDto);
	}

	// 로그인
	@Post("/login")
	async login(@Body() loginDto: LoginDto): Promise<void> {
		return this.userService.login(loginDto);
	}
}

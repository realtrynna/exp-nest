import { Injectable } from '@nestjs/common';

import { EmailService } from 'src/email/email.service';
import { createUserDto, VerifyEmailDto, LoginDto, UserMeta } from './dto';

@Injectable()
export class UserService {
	constructor(private readonly emailService: EmailService) {}

	async findUserById(userId: number) {
		return;
	}

	async createUser(createUserDto: createUserDto) {
		return;
	}

	async verifyEmail(verifyEmailDto: VerifyEmailDto) {
		console.log("서비스 실행");
		return;
	}

	async login(loginDto: LoginDto) {
		console.log(loginDto);
		return;
	}
}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { ConfigService } from '@nestjs/config/dist';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UserService, EmailService, ConfigService],
})
export class UserModule {}

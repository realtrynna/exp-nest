import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { EmailService } from 'src/email/email.service';

@Module({
	imports: [],
	controllers: [UsersController],
	providers: [UserService, EmailService],
})
export class UserModule {}

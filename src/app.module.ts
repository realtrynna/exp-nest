import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
	imports: [UserModule, EmailModule],
	// providers: [EmailService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/users.module';
import { EmailModule } from './email/email.module';

function test() {
	console.log('언제 실행되나요??');
	return {
		DB: 'mysql',
		ID: 'root',
		PW: 'password',
	};
}

@Module({
	imports: [
		UserModule,
		EmailModule,
		ConfigModule.forRoot({
			isGlobal: true,
			load: [test],
		}),
	],
	providers: [],
})
export class AppModule {}

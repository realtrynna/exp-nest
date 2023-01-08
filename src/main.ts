import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// import { BaseInterceptor } from './common/interceptors/date.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Global Interceptor
	// app.useGlobalInterceptors(new DateInterCeptor());

	await app.listen(3000);
}
bootstrap();
